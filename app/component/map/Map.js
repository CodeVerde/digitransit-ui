import PropTypes from 'prop-types';
import React from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';

import PositionMarker from './PositionMarker';
import PlaceMarker from './PlaceMarker';
import { boundWithMinimumArea } from '../../util/geo-utils';
import LazilyLoad, { importLazy } from '../LazilyLoad';
import { isBrowser, isDebugTiles } from '../../util/browser';
import Icon from '../Icon';

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
let LeafletMap;
let TileLayer;
let BusLinesLayer;
let AttributionControl;
let ScaleControl;
let ZoomControl;
let L;

if (isBrowser) {
  LeafletMap = require('react-leaflet/lib/Map').default;
  TileLayer = require('react-leaflet/lib/TileLayer').default;
  BusLinesLayer = require('react-leaflet/lib/TileLayer').default;
  AttributionControl = require('react-leaflet/lib/AttributionControl').default;
  ScaleControl = require('react-leaflet/lib/ScaleControl').default;
  ZoomControl = require('react-leaflet/lib/ZoomControl').default;
  L = require('leaflet');
  // Webpack handles this by bundling it with the other css files
  require('leaflet/dist/leaflet.css');
}

class Map extends React.Component {
  static propTypes = {
    bounds: PropTypes.array,
    boundsOptions: PropTypes.object,
    center: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    disableMapTracking: PropTypes.func,
    displayOriginPopup: PropTypes.bool,
    fitBounds: PropTypes.bool,
    hideOrigin: PropTypes.bool,
    hilightedStops: PropTypes.array,
    lat: PropTypes.number,
    lon: PropTypes.number,
    leafletEvents: PropTypes.object,
    leafletObjs: PropTypes.array,
    ouluLeafletObjs: PropTypes.array,
    leafletOptions: PropTypes.object,
    padding: PropTypes.array,
    showStops: PropTypes.bool,
    zoom: PropTypes.number,
    showScaleBar: PropTypes.bool,
    showBusLines: PropTypes.bool,
  };

  static defaultProps ={
    showScaleBar: false,
    showBusLines: false,
    ouluLeafletObjs: [],
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    piwik: PropTypes.object,
    config: PropTypes.object.isRequired,
    breakpoint: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    this.erd = elementResizeDetectorMaker({ strategy: 'scroll' });
    /* eslint-disable no-underscore-dangle */
    this.erd.listenTo(this.map.leafletElement._container, this.resizeMap);
  }

  componentWillUnmount = () => {
    this.erd.removeListener(this.map.leafletElement._container, this.resizeMap);
  }

  resizeMap = () => {
    if (this.map) {
      this.map.leafletElement.invalidateSize(false);
      if (this.props.fitBounds) {
        this.map.leafletElement.fitBounds(
          boundWithMinimumArea(this.props.bounds),
          this.props.boundsOptions,
        );
      }
    }
  }

  vectorTileLayerContainerModules = ({ VectorTileLayerContainer:
    () => importLazy(System.import('./tile-layer/VectorTileLayerContainer')),
  })

  stopMarkerContainerModules = { StopMarkerContainer:
    () => importLazy(System.import('./non-tile-layer/StopMarkerContainer')),
  }

  cityBikeMarkerContainerModules = { CityBikeMarkerContainer:
    () => importLazy(System.import('./non-tile-layer/CityBikeMarkerContainer')),
  }

  renderVectorTileLayerContainer = ({ VectorTileLayerContainer }) => (
    <VectorTileLayerContainer
      hilightedStops={this.props.hilightedStops}
      showStops={this.props.showStops}
      disableMapTracking={this.props.disableMapTracking}
    />
  )

  renderStopMarkerContainer = ({ StopMarkerContainer }) => (
    <StopMarkerContainer
      hilightedStops={this.props.hilightedStops}
      disableMapTracking={this.props.disableMapTracking}
      updateWhenIdle={false}
    />
  )

  renderCityBikeMarkerContainer = ({ CityBikeMarkerContainer }) => (<CityBikeMarkerContainer />)

  render = () => {
    let map;
    let zoom;
    let origin;
    let leafletObjs;
    let ouluLeafletObjs;

    const config = this.context.config;

    if (isBrowser) {
      leafletObjs = this.props.leafletObjs.slice() || [];
      ouluLeafletObjs = this.props.ouluLeafletObjs.slice();

      if (config.map.useVectorTiles) {
        leafletObjs.push(
          <LazilyLoad key="vector-tiles" modules={this.vectorTileLayerContainerModules}>
            {this.renderVectorTileLayerContainer}
          </LazilyLoad>,
        );
      } else if (this.props.showStops) {
        leafletObjs.push(
          <LazilyLoad key="stop-layer" modules={this.stopMarkerContainerModules}>
            {this.renderStopMarkerContainer}
          </LazilyLoad>,
          );

        if (config.cityBike.showCityBikes) {
          leafletObjs.push(
            <LazilyLoad key="citybikes" modules={this.cityBikeMarkerContainerModules}>
              {this.renderCityBikeMarkerContainer}
            </LazilyLoad>);
        }
      }

      origin = this.context.getStore('EndpointStore').getOrigin();

      if (origin && origin.lat && !this.props.hideOrigin) {
        leafletObjs.push(
          <PlaceMarker
            position={origin}
            key="from"
            displayOriginPopup={this.props.displayOriginPopup}
          />);
      }

      leafletObjs.push(
        <PositionMarker key="position" displayOriginPopup={this.props.displayOriginPopup} />);

      const center = (!this.props.fitBounds && this.props.lat && this.props.lon &&
        [this.props.lat, this.props.lon]) || null;

      const getBusLinesUrl = (param) => {
        const westSouthPoint = param.map.unproject(
          L.point(param.x * param.tileSize, (param.y + 1) * param.tileSize),
          param.z - param.zoomOffset);
        const eastNortnPoint = param.map.unproject(
          L.point((param.x + 1) * param.tileSize, param.y * param.tileSize),
          param.z - param.zoomOffset);

        return `https://e-kartta.ouka.fi/TeklaOGCWebOpen/WMS.ashx?&service=WMS&version=1.1.1&request=GetMap&layers=Bussireitit&styles=&format=image/png&transparent=true&srs=EPSG:4326&bbox=${westSouthPoint.lng},${westSouthPoint.lat},${eastNortnPoint.lng},${eastNortnPoint.lat}&width=${param.tileSize}&height=${param.tileSize}`;
      };

      ({ zoom } = this.props);

      const boundsOptions = this.props.boundsOptions;

      if (this.props.padding) {
        boundsOptions.paddingTopLeft = this.props.padding;
      }

      let mapUrl = (isDebugTiles && `${config.URL.OTP}inspector/tile/traversal/`) || config.URL.MAP;
      if (mapUrl !== null && typeof mapUrl === 'object') {
        mapUrl = mapUrl[this.context.getStore('PreferencesStore').getLanguage()] || config.URL.MAP.default;
      }

      map = (
        <LeafletMap
          keyboard={false}
          ref={(el) => { this.map = el; }}
          center={center}
          zoom={zoom}
          minZoom={this.context.config.map.minZoom}
          maxZoom={this.context.config.map.maxZoom}
          zoomControl={false}
          attributionControl={false}
          bounds={(this.props.fitBounds && boundWithMinimumArea(this.props.bounds)) || undefined}
          animate
          {...this.props.leafletOptions}
          boundsOptions={boundsOptions}
          {...this.props.leafletEvents}
        >
          <TileLayer
            url={`${mapUrl}{z}/{x}/{y}{size}.png`}
            tileSize={config.map.tileSize || 256}
            zoomOffset={config.map.zoomOffset || 0}
            updateWhenIdle={false}
            size={(config.map.useRetinaTiles && L.Browser.retina && !isDebugTiles) ? '@2x' : ''}
            minZoom={this.context.config.map.minZoom}
            maxZoom={this.context.config.map.maxZoom}
          />
          {ouluLeafletObjs}
          {this.props.showBusLines && (
            <BusLinesLayer
              url={'{busLinesUrl}'}
              busLinesUrl={getBusLinesUrl}
              tileSize={config.map.tileSize || 256}
              zoomOffset={config.map.zoomOffset || 0}
              updateWhenIdle={false}
              size={(config.map.useRetinaTiles && L.Browser.retina && !isDebugTiles) ? '@2x' : ''}
              minZoom={this.context.config.map.minZoom}
              maxZoom={this.context.config.map.maxZoom}
            />
          )}
          <AttributionControl
            position="bottomleft"
            prefix='&copy; <a tabindex="-1" href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          {this.props.showScaleBar &&
            <ScaleControl imperial={false} position={config.map.controls.scale.position} />
          }
          {this.context.breakpoint === 'large' && (
            <ZoomControl
              position={config.map.controls.zoom.position}
              zoomInText={Icon.asString('icon-icon_plus')}
              zoomOutText={Icon.asString('icon-icon_minus')}
            />
          )}
          {leafletObjs}
        </LeafletMap>
      );
    }
    return (
      <div className={`map ${this.props.className ? this.props.className : ''}`}>
        {map}
        <div className="background-gradient" />
        {this.props.children}
      </div>);
  }
}

export default Map;
