import PropTypes from 'prop-types';
import React from 'react';
// import Relay from 'react-relay';
import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
import MapLayer from 'react-leaflet/lib/MapLayer';
import FeatureGroup from 'react-leaflet/lib/FeatureGroup';
import L from 'leaflet';
import omit from 'lodash/omit';
import connectToStores from 'fluxible-addons-react/connectToStores';
import provideContext from 'fluxible-addons-react/provideContext';
// import { isBrowser } from '../../../util/browser';

// import SphericalMercator from '@mapbox/sphericalmercator';
// import lodashFilter from 'lodash/filter';


// import StopRoute from '../../../route/StopRoute';
// import TerminalRoute from '../../../route/TerminalRoute';
// import CityBikeRoute from '../../../route/CityBikeRoute';
// import StopMarkerPopup from '../popups/StopMarkerPopup';
// import MarkerSelectPopup from './MarkerSelectPopup';
// import CityBikePopup from '../popups/CityBikePopup';
// import ParkAndRideHubPopup from '../popups/ParkAndRideHubPopup';
// import ParkAndRideFacilityPopup from '../popups/ParkAndRideFacilityPopup';
// import ParkAndRideHubRoute from '../../../route/ParkAndRideHubRoute';
// import ParkAndRideFacilityRoute from '../../../route/ParkAndRideFacilityRoute';
// import TicketSalesPopup from '../popups/TicketSalesPopup';
// import LocationPopup from '../popups/LocationPopup';
// import TileContainer from './TileContainer';
// import Loading from '../../Loading';

import WeatherStationPopupContainer from '../WeatherStationPopupContainer';

// let Marker;
//
// if (isBrowser) {
//   /* eslint-disable global-require */
//   Marker = require('react-leaflet/lib/Marker').default;
//   /* eslint-enable global-require */
// }

const WeatherStationPopupContainerWithContext = provideContext(WeatherStationPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

// const StopMarkerPopupWithContext = provideContext(StopMarkerPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const MarkerSelectPopupWithContext = provideContext(MarkerSelectPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const CityBikePopupWithContext = provideContext(CityBikePopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   getStore: PropTypes.func.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const ParkAndRideHubPopupWithContext = provideContext(ParkAndRideHubPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   getStore: PropTypes.func.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const ParkAndRideFacilityPopupWithContext = provideContext(ParkAndRideFacilityPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   getStore: PropTypes.func.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const TicketSalesPopupWithContext = provideContext(TicketSalesPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
//   getStore: PropTypes.func.isRequired,
//   config: PropTypes.object.isRequired,
// });
//
// const LocationPopupWithContext = provideContext(LocationPopup, {
//   intl: intlShape.isRequired,
//   router: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   config: PropTypes.object.isRequired,
// });

const PopupOptions = {
  offset: [110, 16],
  closeButton: false,
  minWidth: 260,
  maxWidth: 260,
  autoPanPaddingTopLeft: [5, 125],
  className: 'popup',
  ref: 'popup',
};

// FeatureGroup
// TODO eslint doesn't know that TileLayerContainer is a react component,
//      because it doesn't inherit it directly. This will force the detection
/** @extends React.Component */
class OuluLayerContainer extends FeatureGroup {
// class OuluLayerContainer extends MapLayer {
  static propTypes = {
    // tileSize: PropTypes.number,
    // zoomOffset: PropTypes.number,
    // disableMapTracking: PropTypes.func,
    children: PropTypes.array,
    weatherStationsData: PropTypes.array.isRequired,
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    map: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      popups: [],
    };
  }

  componentWillMount() {
    super.componentWillMount();
    console.log('OuluLayerContainer, componentWillMount: ');
    // this.context.getStore('TimeStore').addChangeListener(this.onTimeChange);

    // TODO: Convert to use react-leaflet <GridLayer>
    // const Layer = L.GridLayer.extend({ createTile: this.createTile });

    // this.leafletElement = new Layer(omit(this.props, 'map'));
    // this.context.map.addEventParent(this.leafletElement);

    // this.leafletElement.on('click contextmenu', this.onClick);
  }

  componentDidUpdate() {
    console.log('OuluLayerContainer, componentDidUpdate: ', this.props.weatherStationsData.length);
    if (this.context.popupContainer != null) {
      console.log('OuluLayerContainer, opening popup');
      this.context.popupContainer.openPopup();
    }
  }

  componentWillUnmount() {
    // this.context.getStore('TimeStore').removeChangeListener(this.onTimeChange);
    // this.leafletElement.off('click contextmenu', this.onClick);
  }

  // onTimeChange = (e) => {
  //   let activeTiles;
  //
  //   if (e.currentTime) {
  //     /* eslint-disable no-underscore-dangle */
  //     activeTiles = lodashFilter(this.leafletElement._tiles, tile => tile.active);
  //     /* eslint-enable no-underscore-dangle */
  //     activeTiles.forEach(tile =>
  //       tile.el.layers && tile.el.layers.forEach((layer) => {
  //         if (layer.onTimeChange) {
  //           layer.onTimeChange();
  //         }
  //       }),
  //     );
  //   }
  // }

  onClick = (e) => {
    console.log('OuluLayerContainer, onClick: ', e);
    /* eslint-disable no-underscore-dangle */
    // Object.keys(this.leafletElement._tiles)
    //   .filter(key => this.leafletElement._tiles[key].active)
    //   .filter(key => this.leafletElement._keyToBounds(key).contains(e.latlng))
    //   .forEach(key => this.leafletElement._tiles[key].el.onMapClick(
    //     e,
    //     this.merc.px([e.latlng.lng, e.latlng.lat],
    //     Number(key.split(':')[2]) + this.props.zoomOffset),
    //   ),
    // );
    /* eslint-enable no-underscore-dangle */

    const hits = [];
    const myPoint = this.context.map.latLngToLayerPoint(e.latlng);
    const halfBox = L.point([10, 10]);
    const smallCorner = myPoint.subtract(halfBox);
    const bigCorner = myPoint.add(halfBox);
    const myBounds = L.bounds(smallCorner, bigCorner);
    // if (this.props.weatherStationsData.length) {
    this.props.weatherStationsData.forEach((element) => {
      // console.log('this.props.weatherStationsData[0]: ', this.props.weatherStationsData[0]);
      const mousePoint = this.context.map.latLngToLayerPoint(
        L.latLng([
          element.geometry.lat,
          element.geometry.lon,
        ]));
      if (myBounds.contains(mousePoint)) {
        console.log('Bounds hit: ', element.geometry.lat, ', ', element.geometry.lon);
        console.log('Bounds id: ', element.id);
        hits.push({
          id: element.id,
          lat: element.geometry.lat,
          lng: element.geometry.lon,
        });
      } else {
        // console.log('Bounds miss!');
      }
      // this.props.weatherStationsData.forEach((element) => {
      //
      // })
    });
    console.log('Amount of hits: ', hits.length);
    this.setState({ popups: hits.slice() });
  }

  // merc = new SphericalMercator({
  //   size: this.props.tileSize || 256,
  // });

  // createTile = (tileCoords, done) => {
  //   const tile = new TileContainer(tileCoords, done, this.props, this.context.config);
  //
  //   tile.onSelectableTargetClicked = (selectableTargets, coords) => {
  //     if (selectableTargets && this.props.disableMapTracking) {
  //       this.props.disableMapTracking(); // disable now that popup opens
  //     }
  //
  //     this.setState({
  //       selectableTargets,
  //       coords,
  //     });
  //   };
  //
  //   return tile.el;
  // }

  selectRow = option => this.setState({ selectableTargets: [option] })

  render() {
    // let popup = null;
    // let contents;

    // position={[this.state.popups.lat, this.state.popups.lng]}
    // position={[65.010596, 25.488292]}

    console.log('OuluLayerContainer, render: ');
    if (this.state.popups.length === 1) {
      console.log('OuluLayerContainer, gimme popup: ');
      return (
        <FeatureGroup onClick={this.onClick}>
          <Popup
            {...PopupOptions}
            key="fg-popup-super"
            position={{
              lat: this.state.popups[0].lat,
              lng: this.state.popups[0].lng,
            }}
          >
            <WeatherStationPopupContainerWithContext
              stationId={this.state.popups[0].id}
              context={this.context}
            />
          </Popup>
          {this.props.children}
        </FeatureGroup>
      );
    }
    console.log('OuluLayerContainer, no popup: ');
    return (
      <FeatureGroup onClick={this.onClick}>
        {this.props.children}
      </FeatureGroup>
    );

    // return false;

    // const loadingPopup = () =>
    //   <div className="card" style={{ height: '12rem' }}>
    //     <Loading />
    //   </div>;

    // if (typeof this.state.selectableTargets !== 'undefined') {
    //   if (this.state.selectableTargets.length === 1) {
    //     let id;
    //     if (this.state.selectableTargets[0].layer === 'weather') {
    //       console.log('TileLayerContainer, this.state.selectableTargets[0].layer === weather');
    //       id = this.state.selectableTargets[0].feature.properties.gtfsId;
    //       contents = (
    //         <WeatherStationPopupContainer
    //           stationId={id}
    //         />
    //       );
    //     }
    //     popup = (
    //       <Popup
    //         {...PopupOptions}
    //         key={id}
    //         position={this.state.coords}
    //       >
    //         {contents}
    //       </Popup>
    //       );
    //   } else {
    //     console.log('Too many or none targets closeby');
    //   }
    // }
    // return popup;
  }
}

// export default OuluLayerContainer;

export default connectToStores(OuluLayerContainer, ['MapSelectionsStore'], context => ({
  weatherStationsData: context.getStore('MapSelectionsStore').getWeatherStationsData(),
}));
