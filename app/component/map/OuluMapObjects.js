import React from 'react';
import BulletinContainer from './BulletinContainer';
import IncidentsContainer from './IncidentsContainer';
import MonitoringContainer from './MonitoringContainer';
import RoadWeatherLineContainer from './RoadWeatherLineContainer';
import WeatherStationMarkerContainer from './WeatherStationMarkerContainer';


const OuluMapObjects = [
  <BulletinContainer
    key="bulletins"
  />,
  <IncidentsContainer
    key="incidents"
  />,
  <MonitoringContainer
    key="monitoring"
  />,
  <WeatherStationMarkerContainer
    key="weather-stations"
  />,
  <RoadWeatherLineContainer
    key="road-weather"
  />,
];

export default OuluMapObjects;
