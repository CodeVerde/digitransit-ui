import React from 'react';
import WeatherForecast from './WeatherForecast';
import RainMap from './RainMap';
import RoadWeatherToggle from './RoadWeatherToggle';

const MapUtils = () => (
  <div className="map-utils-float">
    <div className="MapUtils">
      <WeatherForecast />
      <RainMap />
      <RoadWeatherToggle />
    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
