import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
import FeatureGroup from 'react-leaflet/lib/FeatureGroup';
import omit from 'lodash/omit';
import MapLayer from 'react-leaflet/lib/MapLayer';
import L from 'leaflet';
import connectToStores from 'fluxible-addons-react/connectToStores';

import BulletinsContainer from './BulletinsContainer';
import CamerasContainer from './CamerasContainer';
import CarMonitorsContainer from './CarMonitorsContainer';
import CarParksContainer from './CarParksContainer';
import IncidentsContainer from './IncidentsContainer';
import WalkMonitorsContainer from './WalkMonitorsContainer';
import WeatherStationsContainer from './WeatherStationsContainer';

const defaultPopupOptions = {
  offset: [110, 16],
  closeButton: false,
  minWidth: 260,
  maxWidth: 260,
  autoPanPaddingTopLeft: [5, 125],
  className: 'popup',
  ref: 'popup',
};

// TODO eslint doesn't know that TileLayerContainer is a react component,
//      because it doesn't inherit it directly. This will force the detection
/** @extends React.Component */
class OuluLayerContainer extends FeatureGroup {
// class OuluLayerContainer extends MapLayer {
  static propTypes = {
    children: PropTypes.array,
    mapSelectionsData: PropTypes.object.isRequired,
  };

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    map: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    // popupContainer: PropTypes.object,
  };

  // static childContextTypes = {
  //   popupContainer: React.PropTypes.object,
  // }

  constructor(props) {
    super(props);
    // this.ouluObjectsArray = [];
    this.state = {
      popups: [],
    };
  }

  componentWillMount() {
    super.componentWillMount();

    // TODO: Convert to use react-leaflet <GridLayer>
    // const Layer = L.GridLayer.extend({ createTile: this.createTile });
    // const Layer = L.FeatureGroup.extend([]);

    console.log('this.leafletElement: ', this.leafletElement);

    // this.leafletElement = new Layer(omit(this.props, 'map'));
    this.context.map.addEventParent(this.leafletElement);

    // this.leafletElement.on('click contextmenu', this.onClick);

    this.ouluObjectsArray = [
      new BulletinsContainer(this.context, this.context.map),
      new CamerasContainer(this.context, this.context.map),
      new CarMonitorsContainer(this.context, this.context.map),
      new CarParksContainer(this.context, this.context.map),
      new IncidentsContainer(this.context, this.context.map),
      // new RoadConditionsContainer(this.context, this.context.map),
      new WalkMonitorsContainer(this.context, this.context.map),
      new WeatherStationsContainer(this.context, this.context.map),
      // new TrafficFluencyContainer(this.context, this.context.map),
    ];
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate: ', this.context.popupContainer);
    // console.log('this.leafletElement.popupContainer: ', this.leafletElement.popupContainer);
    // console.log('getChildContext(): ', this.getChildContext());

    if (this.context.popupContainer != null) {
      this.context.popupContainer.openPopup();
    }
  }

  componentWillUnmount() {
    // this.leafletElement.off('click contextmenu', this.onClick);
  }

  // onEachFeature={(feature, layer) => layer.bindPopup(this.labelPerCountry(feature))
  // onEachFeature(feature) {
  //   console.log('onEachFeature, feature: ', feature);
  // };

  onClick = (e) => {
    // e.stopPropagation();
    console.log('click:', e);
    const hits = [];
    const myPoint = this.context.map.latLngToLayerPoint(e.latlng);
    console.log('OuluLayerContainer, myPoint: ', myPoint);
    const halfBox = L.point([10, 10]);
    const leftTopCorner = myPoint.subtract(halfBox);
    const rightBottomCorner = myPoint.add(halfBox);
    const myBounds = L.bounds(leftTopCorner, rightBottomCorner);
    this.ouluObjectsArray.forEach((layer) => {
      hits.push(...layer.getObjectHits(myBounds, this.props.mapSelectionsData));
    });
    this.setState({ popups: hits.slice() });
  }

  render() {
    if (this.state.popups.length === 1) {
      // const myOptions = Object.assign({}, defaultPopupOptions, this.state.popups[0].options);
      console.log('OuluLayerContainer render, with popup: ', this.state.popups[0].id);
      return (
        <FeatureGroup>
          {this.props.children}
        </FeatureGroup>
      );
    }

    // <Popup
    //   {...myOptions}
    //   key={`oulu-features-popup-with-content-${this.state.popups[0].id}`}
    //   position={{
    //     lat: this.state.popups[0].lat,
    //     lng: this.state.popups[0].lng,
    //   }}
    // >
    //   {this.state.popups[0].content}
    // </Popup>

    // <div>
    //   {false && this.props.children}
    //   {false && <Popup
    //     {...defaultPopupOptions}
    //     key="oulu-features-popup"
    //   />}
    // </div>

    console.log('OuluLayerContainer render');
    return (
      <FeatureGroup>
        {this.props.children}
        {false && <Popup
          {...defaultPopupOptions}
          key="oulu-features-popup"
        />}
      </FeatureGroup>
    );
  }
}

export default connectToStores(OuluLayerContainer, ['MapSelectionsStore'], context => ({
  mapSelectionsData: context.getStore('MapSelectionsStore').getData(),
}));
