import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
import FeatureGroup from 'react-leaflet/lib/FeatureGroup';
import L from 'leaflet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import provideContext from 'fluxible-addons-react/provideContext';

import Loading from '../../Loading';

import WeatherStationPopupContainer from '../popups/WeatherStationPopupContainer';

const WeatherStationPopupContainerWithContext = provideContext(WeatherStationPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const PopupOptions = {
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
  static propTypes = {
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

    // this.leafletElement = new Layer(omit(this.props, 'map'));
    this.context.map.addEventParent(this.leafletElement);

    this.leafletElement.on('click contextmenu', this.onClick);
  }

  componentDidMount() {
    super.componentDidMount();
    console.log('OuluLayerContainer, componentDidMount: ');
    if (this.state.popups.length === 1) {
      console.log('OuluLayerContainer, componentDidMount, opening popup');
      this.leafletElement.openPopup();
    }
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    console.log('OuluLayerContainer, componentDidUpdate: ', this.props.weatherStationsData.length);
    if (this.context.popupContainer != null) {
      console.log('OuluLayerContainer, opening popup');
      this.context.popupContainer.openPopup();
    }
  }

  componentWillUnmount() {
    console.log('OuluLayerContainer, componentWillUnmount: ');
    this.leafletElement.off('click contextmenu', this.onClick);
  }

  onClick = (e) => {
    console.log('OuluLayerContainer, onClick: ', e);

    const hits = [];
    const myPoint = this.context.map.latLngToLayerPoint(e.latlng);
    const halfBox = L.point([10, 10]);
    const smallCorner = myPoint.subtract(halfBox);
    const bigCorner = myPoint.add(halfBox);
    const myBounds = L.bounds(smallCorner, bigCorner);
    this.props.weatherStationsData.forEach((element) => {
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
      }
    });
    console.log('Amount of hits: ', hits.length);
    this.setState({ popups: hits.slice() });
  }

  render() {
    if (this.state.popups.length === 1) {
      console.log('OuluLayerContainer, render, gimme popup: ');
      return (
        <FeatureGroup onClick={this.onClick}>
          {this.props.children}
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
              loading={Loading}
            />
          </Popup>
        </FeatureGroup>
      );
    }
    console.log('OuluLayerContainer, render, no popup: ');
    return (
      <FeatureGroup onClick={this.onClick}>
        {this.props.children}
        <Popup
          {...PopupOptions}
          key="fg-popup-super"
        />
      </FeatureGroup>
    );
  }
}

export default connectToStores(OuluLayerContainer, ['MapSelectionsStore'], context => ({
  weatherStationsData: context.getStore('MapSelectionsStore').getWeatherStationsData(),
}));
