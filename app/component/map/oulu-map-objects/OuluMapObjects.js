import React from 'react';
import BulletinMarkerContainer from './BulletinMarkerContainer';
import CameraMarkerContainer from './CameraMarkerContainer';
import CarMonitorMarkerContainer from './CarMonitorMarkerContainer';
import CarParkMarkerContainer from './CarParkMarkerContainer';
import IncidentMarkerContainer from './IncidentMarkerContainer';
import MaintenanceContainer from './MaintenanceContainer';
import WalkMonitorMarkerContainer from './WalkMonitorMarkerContainer';
import RoadConditionLineContainer from './RoadConditionLineContainer';
import TrafficFluencyContainer from './TrafficFluencyContainer';
import WeatherStationMarkerContainer from './WeatherStationMarkerContainer';


const OuluMapObjects = [
  <BulletinMarkerContainer
    key="bulletins"
  />,
  <CameraMarkerContainer
    key="cameras"
  />,
  <CarMonitorMarkerContainer
    key="car-monitoring"
  />,
  <CarParkMarkerContainer
    key="car-parking"
  />,
  <IncidentMarkerContainer
    key="incident-marker"
  />,
  <MaintenanceContainer
    key="maintenance"
  />,
  <WalkMonitorMarkerContainer
    key="walk-monitoring"
  />,
  <RoadConditionLineContainer
    key="road-condition"
  />,
  <TrafficFluencyContainer
    key="traffic-fluency"
  />,
  <WeatherStationMarkerContainer
    key="weather-stations"
  />,
];

export default OuluMapObjects;
