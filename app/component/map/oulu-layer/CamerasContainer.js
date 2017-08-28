import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import L from 'leaflet';
import provideContext from 'fluxible-addons-react/provideContext';

import Loading from '../../Loading';
import CameraPopupContainer from '../popups/CameraPopupContainer';

const CameraPopupContainerWithContext = provideContext(CameraPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const popupOptions = {
  className: 'oulu-popup-large',
};

export default class CamerasContainer {
  constructor(context, map) {
    this.context = context;
    this.map = map;
    this.getObjectHits = this.getObjectHits.bind(this);
  }

  getObjectHits(myBounds, mapSelectionsData) {
    if (!mapSelectionsData.showCameras) { return []; }

    console.log('CamerasContainer, getObjectHits');

    const hits = [];
    mapSelectionsData.camerasData.forEach((element) => {
      const mousePoint = this.map.latLngToLayerPoint(
        L.latLng([
          element.geometry.lat,
          element.geometry.lon,
        ]));
      console.log('CamerasContainer, mousePoint: ', mousePoint);
      if (myBounds.contains(mousePoint)) {
        hits.push({
          id: element.id,
          lat: element.geometry.lat,
          lng: element.geometry.lon,
          options: popupOptions,
          layer: 'oulu',
          content: (
            <CameraPopupContainerWithContext
              stationId={element.id}
              context={this.context}
              loading={Loading}
            />),
        });
      }
    });
    return hits;
  }
}
