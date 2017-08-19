import PropTypes from 'prop-types';
import React from 'react';
// import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
// import FeatureGroup from 'react-leaflet/lib/FeatureGroup';
import L from 'leaflet';
// import connectToStores from 'fluxible-addons-react/connectToStores';
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

export default class WeatherStationsContainer {
  constructor(context, map) {
    this.context = context;
    this.map = map;
    this.getObjectHits = this.getObjectHits.bind(this);
  }

  getObjectHits(myBounds, mapSelectionsData) {
    if (!mapSelectionsData.showWeatherStations) { return []; }

    const hits = [];
    mapSelectionsData.weatherStationsData.forEach((element) => {
      const mousePoint = this.map.latLngToLayerPoint(
        L.latLng([
          element.geometry.lat,
          element.geometry.lon,
        ]));
      if (myBounds.contains(mousePoint)) {
        hits.push({
          id: element.id,
          lat: element.geometry.lat,
          lng: element.geometry.lon,
          content: (
            <WeatherStationPopupContainerWithContext
              stationId={element.id}
              context={this.context}
              loading={Loading}
            />),
        });
      }
    });
    return hits;
  }

  render() {
    return false;
  }
}
