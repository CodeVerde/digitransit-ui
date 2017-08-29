import PropTypes from 'prop-types';
import React from 'react';
import provideContext from 'fluxible-addons-react/provideContext';
import { intlShape } from 'react-intl';
import L from 'leaflet';

import Loading from '../../Loading';

import BulletinPopupContainer from '../popups/BulletinPopupContainer';
import CameraPopupContainer from '../popups/CameraPopupContainer';
import CarMonitorPopupContainer from '../popups/CarMonitorPopupContainer';
import CarParkPopupContainer from '../popups/CarParkPopupContainer';
import IncidentPopupContainer from '../popups/IncidentPopupContainer';
import WalkMonitorPopupContainer from '../popups/WalkMonitorPopupContainer';
import WeatherStationPopupContainer from '../popups/WeatherStationPopupContainer';

import getBulletinObjectHits from './getBulletinObjectHits';
import getCameraObjectHits from './getCameraObjectHits';
import getCarMonitorObjectHits from './getCarMonitorObjectHits';
import getCarParkObjectHits from './getCarParkObjectHits';
import getIncidentObjectHits from './getIncidentObjectHits';
import getWalkMonitorObjectHits from './getWalkMonitorObjectHits';
import getWeatherStationObjectHits from './getWeatherStationObjectHits';

const BulletinPopupContainerWithContext = provideContext(BulletinPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const CameraPopupContainerWithContext = provideContext(CameraPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const CarMonitorPopupContainerWithContext = provideContext(CarMonitorPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const CarParkPopupContainerWithContext = provideContext(CarParkPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const IncidentPopupContainerWithContext = provideContext(IncidentPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const WalkMonitorPopupContainerWithContext = provideContext(WalkMonitorPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

const WeatherStationPopupContainerWithContext = provideContext(WeatherStationPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

export const getOuluObjectHits = (e, mapSelectionsData, context) => {
  const clickPoint = context.map.latLngToLayerPoint(e.latlng);
  const leftTopCorner = clickPoint.subtract(L.point([16, 0]));
  const rightBottomCorner = clickPoint.add(L.point([16, 32]));
  const hitBounds = L.bounds(leftTopCorner, rightBottomCorner);
  return [
    ...getBulletinObjectHits(hitBounds, mapSelectionsData, context),
    ...getCameraObjectHits(hitBounds, mapSelectionsData, context),
    ...getCarMonitorObjectHits(hitBounds, mapSelectionsData, context),
    ...getCarParkObjectHits(hitBounds, mapSelectionsData, context),
    ...getIncidentObjectHits(hitBounds, mapSelectionsData, context),
    ...getWalkMonitorObjectHits(hitBounds, mapSelectionsData, context),
    ...getWeatherStationObjectHits(hitBounds, mapSelectionsData, context),
  ];
};

export const getOuluPopup = (layer, id, context) => {
  let popup;

  switch (layer) {
    case 'oulu-bulletin':
      popup = (
        <BulletinPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-camera':
      popup = (
        <CameraPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-car-monitor':
      popup = (
        <CarMonitorPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-car-park':
      popup = (
        <CarParkPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-incident':
      popup = (
        <IncidentPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-walk-monitor':
      popup = (
        <WalkMonitorPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-weather-station':
      popup = (
        <WeatherStationPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    default:
      popup = null;
      break;
  }
  return popup;
};

export const getOuluPopupOptions = (layer) => {
  let options;

  switch (layer) {
    case 'oulu-camera':
    case 'oulu-bulletin':
    case 'oulu-incident':
      options = {
        className: 'oulu-popup-large',
      };
      break;
    case 'oulu-walk-monitor':
      options = {
        className: 'oulu-popup-xlarge',
      };
      break;
    default:
      options = {};
      break;
  }
  return options;
};
