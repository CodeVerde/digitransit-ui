import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import L from 'leaflet';
import provideContext from 'fluxible-addons-react/provideContext';

import Loading from '../../Loading';
import WalkMonitorPopupContainer from '../popups/WalkMonitorPopupContainer';

const WalkMonitorPopupContainerWithContext = provideContext(WalkMonitorPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

export default class WalkMonitorsContainer {
  constructor(context, map) {
    this.context = context;
    this.map = map;
    this.getObjectHits = this.getObjectHits.bind(this);
  }

  getObjectHits(myBounds, mapSelectionsData) {
    if (!mapSelectionsData.showWalkMonitors) { return []; }

    const hits = [];
    mapSelectionsData.walkMonitorsData.forEach((element) => {
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
            <WalkMonitorPopupContainerWithContext
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
