import React from 'react';
import BulletinContainer from './BulletinContainer';
import RoadWeatherLineContainer from './RoadWeatherLineContainer';
import WeatherStationMarkerContainer from './WeatherStationMarkerContainer';


const OuluMapObjects = [
  <BulletinContainer
    key="bulletins"
  />,
  <WeatherStationMarkerContainer
    key="weather-stations"
  />,
  <RoadWeatherLineContainer
    key="road-weather"
  />,
];

export default OuluMapObjects;
