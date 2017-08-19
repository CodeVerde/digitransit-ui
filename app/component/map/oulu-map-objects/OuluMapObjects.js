import React from 'react';
import BulletinMarkerContainer from './BulletinMarkerContainer';
import CameraMarkerContainer from './CameraMarkerContainer';
import CarMonitoringContainer from './CarMonitoringContainer';
import CarParkingContainer from './CarParkingContainer';
import IncidentMarkerContainer from './IncidentMarkerContainer';
import MonitoringContainer from './MonitoringContainer';
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
  <CarMonitoringContainer
    key="car-monitoring"
  />,
  <CarParkingContainer
    key="car-parking"
  />,
  <IncidentMarkerContainer
    key="incident-marker"
  />,
  <MonitoringContainer
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
