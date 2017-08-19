import React from 'react';
import BulletinMarkerContainer from './BulletinMarkerContainer';
import CameraMarkerContainer from './CameraMarkerContainer';
import CarMonitorMarkerContainer from './CarMonitorMarkerContainer';
import CarParkingContainer from './CarParkingContainer';
import IncidentMarkerContainer from './IncidentMarkerContainer';
import WalkMonitorMarkerContainer from './WalkMonitorMarkerContainer';
import RoadWeatherLineContainer from './RoadWeatherLineContainer';
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
  <CarParkingContainer
    key="car-parking"
  />,
  <IncidentMarkerContainer
    key="incident-marker"
  />,
  <WalkMonitorMarkerContainer
    key="monitoring"
  />,
  <RoadWeatherLineContainer
    key="road-weather"
  />,
  <TrafficFluencyContainer
    key="traffic-fluency"
  />,
  <WeatherStationMarkerContainer
    key="weather-stations"
  />,
];

export default OuluMapObjects;
