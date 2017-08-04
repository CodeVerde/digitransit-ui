import React from 'react';
import WeatherForecast from './WeatherForecast';
import RainMap from './RainMap';
import RoadWeatherToggle from './RoadWeatherToggle';
import WeatherStationsToggle from './WeatherStationsToggle';

const MapUtils = () => (
  <div className="map-utils-float">
    <div className="MapUtils">
      <WeatherForecast />
      <RainMap />
      <RoadWeatherToggle />
      <WeatherStationsToggle />
    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
