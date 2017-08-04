import React from 'react';
import WeatherForecast from './WeatherForecast';
import RainMap from './RainMap';

const MapUtils = () => (
  <div className="map-utils-float">
    <div className="MapUtils">
      <WeatherForecast />
      <RainMap />
    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
