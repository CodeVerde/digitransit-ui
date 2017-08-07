import React from 'react';

import BusLinesMapToggle from './BusLinesMapToggle';
import WeatherForecast from './WeatherForecast';
import RainMap from './RainMap';
import RoadWeatherToggle from './RoadWeatherToggle';
import WeatherStationsToggle from './WeatherStationsToggle';

const MapUtils = () => (
  <div className="map-utils-float">
    <div className="MapUtils">
      {/* <button className="map-utils-button">
        <svg
          className="icon"
          viewBox="0 0 283.46 283.46"
        >
          <use xlinkHref="#icon-icon_linjakartta" />
        </svg>
        <span>Linjakartta</span>
      </button> */}

      <BusLinesMapToggle />

      <button className="map-utils-button">
        <svg
          className="icon"
          viewBox="0 0 283.46 283.46"
        >
          <use xlinkHref="#icon-icon_bus_stops" />
        </svg>
        <span>Pysäkit</span>
      </button>

      <button className="map-utils-button">
        <svg
          className="icon"
          viewBox="0 0 283.46 283.46"
        >
          <use xlinkHref="#icon-icon_bus_lines" />
        </svg>
        <span>Bussilinjat</span>
      </button>

      <button className="map-utils-button">
        <svg
          className="icon"
          viewBox="0 0 283.46 283.46"
        >
          <use xlinkHref="#icon-icon_kunnossapito" />
        </svg>
        <span>Kunnossapito</span>
      </button>

      <button className="map-utils-button">
        <svg
          className="icon"
          viewBox="0 0 283.46 283.46"
        >
          <use xlinkHref="#icon-icon_sadealueet" />
        </svg>
        <span>Sadealueet</span>
      </button>

      <RoadWeatherToggle />

      <WeatherStationsToggle />

      <RainMap />

      <WeatherForecast />

    </div>
  </div>
);

MapUtils.displayName = 'MapUtils';

export default MapUtils;
