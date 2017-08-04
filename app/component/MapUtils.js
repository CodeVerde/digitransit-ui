import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';
import WeatherForecast from './WeatherForecast';
import RainMap from './RainMap';

const props = {};

const MapUtils = () => (
  <div className="map-utils-float">
    <div class="MapUtils">
      <WeatherForecast />
      <RainMap />
    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
