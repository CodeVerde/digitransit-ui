import React from 'react';

import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import BusLinesMapToggle from './BusLinesMapToggle';
import RainMap from './RainMap';
import BulletinsToggle from './toggles/BulletinsToggle';
import CamerasToggle from './toggles/CamerasToggle';
import RoadWeatherToggle from './toggles/RoadWeatherToggle';
import WeatherStationsToggle from './toggles/WeatherStationsToggle';
import WeatherForecast from './WeatherForecast';

const MapUtils = () => (
  <div className="map-utils-float">
    <div className="MapUtils">

      <BusLinesMapToggle />

      <div className="" id="toggle-bus-stops" key="toggle-bus-stops">
        <div className="map-utils-button active" id="toggle-bus-stops-button">
          <Toggle icons={false} id="BusStopsToggle" />
          <label htmlFor="BusStopsToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_bus_stops" />
            </svg>
            <FormattedMessage id="stops" defaultMessage="Stops" />
          </label>
        </div>
      </div>

      <div className="" id="toggle-bus-lines-tool" key="toggle-bus-lines-tool">
        <div className="map-utils-button" id="toggle-bus-lines-tool-button">
          <Toggle icons={false} id="BusLinesToggle" />
          <label htmlFor="BusLinesToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_bus_lines" />
            </svg>
            <FormattedMessage id="routes" defaultMessage="Routes" />
          </label>
        </div>
      </div>

      <div className="" id="toggle-maintenance" key="toggle-maintenance">
        <div className="map-utils-button" id="toggle-maintenance-button">
          <Toggle icons={false} id="MaintenanceToggle" />
          <label htmlFor="MaintenanceToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_kunnossapito" />
            </svg>
            <FormattedMessage id="maintenance" defaultMessage="Maintenance" />
          </label>
        </div>
      </div>

      <div className="" id="toggle-rain-areas" key="toggle-rain-areas">
        <div className="map-utils-button" id="toggle-rain-areas-button">
          <Toggle icons={false} id="RainAreasToggle" />
          <label htmlFor="RainAreasToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_sadealueet" />
            </svg>
            <FormattedMessage id="rain-areas" defaultMessage="Rain Areas" />
          </label>
        </div>
      </div>

      <BulletinsToggle />
      <CamerasToggle />
      <RoadWeatherToggle />
      <WeatherStationsToggle />
      <RainMap />
      <WeatherForecast />

    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
