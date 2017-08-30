import PropTypes from 'prop-types';
import React from 'react';
import provideContext from 'fluxible-addons-react/provideContext';
import { intlShape } from 'react-intl';
import L from 'leaflet';

import Loading from '../../Loading';

import BicycleMonitorPopupContainer from '../popups/BicycleMonitorPopupContainer';
import BulletinPopupContainer from '../popups/BulletinPopupContainer';
import CameraPopupContainer from '../popups/CameraPopupContainer';
import CarMonitorPopupContainer from '../popups/CarMonitorPopupContainer';
import CarParkPopupContainer from '../popups/CarParkPopupContainer';
import IncidentPopupContainer from '../popups/IncidentPopupContainer';
import RoadConditionPopupContainer from '../popups/RoadConditionPopupContainer';
import TrafficFluencyPopupContainer from '../popups/TrafficFluencyPopupContainer';
import WalkMonitorPopupContainer from '../popups/WalkMonitorPopupContainer';
import WeatherStationPopupContainer from '../popups/WeatherStationPopupContainer';

import getBicycleMonitorObjectHits from './getBicycleMonitorObjectHits';
import getBulletinObjectHits from './getBulletinObjectHits';
import getCameraObjectHits from './getCameraObjectHits';
import getCarMonitorObjectHits from './getCarMonitorObjectHits';
import getCarParkObjectHits from './getCarParkObjectHits';
import getIncidentObjectHits from './getIncidentObjectHits';
import getRoadConditionObjectHits from './getRoadConditionObjectHits';
import getTrafficFluencyObjectHits from './getTrafficFluencyObjectHits';
import getWalkMonitorObjectHits from './getWalkMonitorObjectHits';
import getWeatherStationObjectHits from './getWeatherStationObjectHits';

const BicycleMonitorPopupContainerWithContext = provideContext(BicycleMonitorPopupContainer, {
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
});

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

const RoadConditionPopupContainerWithContext = provideContext(RoadConditionPopupContainer, {
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

const TrafficFluencyPopupContainerWithContext = provideContext(TrafficFluencyPopupContainer, {
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
    ...getBicycleMonitorObjectHits(hitBounds, mapSelectionsData, context),
    ...getBulletinObjectHits(hitBounds, mapSelectionsData, context),
    ...getCameraObjectHits(hitBounds, mapSelectionsData, context),
    ...getCarMonitorObjectHits(hitBounds, mapSelectionsData, context),
    ...getCarParkObjectHits(hitBounds, mapSelectionsData, context),
    ...getIncidentObjectHits(hitBounds, mapSelectionsData, context),
    ...getWalkMonitorObjectHits(hitBounds, mapSelectionsData, context),
    ...getWeatherStationObjectHits(hitBounds, mapSelectionsData, context),
    // Road objects are checked last
    ...getRoadConditionObjectHits(hitBounds, mapSelectionsData, context, e.latlng),
    ...getTrafficFluencyObjectHits(hitBounds, mapSelectionsData, context, e.latlng),
  ];
};

export const getOuluPopup = (layer, id, context, content) => {
  let popup;

  switch (layer) {
    case 'oulu-bicycle-monitor':
      popup = (
        <BicycleMonitorPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
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
    case 'oulu-road-condition':
      popup = (
        <RoadConditionPopupContainerWithContext
          id={id}
          context={context}
          loading={Loading}
        />);
      break;
    case 'oulu-traffic-fluency':
      popup = (
        <TrafficFluencyPopupContainerWithContext
          context={context}
          loading={Loading}
          content={content}
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
    case 'oulu-bicycle-monitor':
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
