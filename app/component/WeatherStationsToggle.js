import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import { ToggleWeatherStationsState } from '../action/mapSelectionsActions';

const toggleWeatherStations = executeAction =>
  () => executeAction(ToggleWeatherStationsState);

const WeatherStationsToggle = ({ showWeatherStations }, { executeAction }) => (
  <div key="toggle-weather-stations" id="toggle-weather-stations" className="">
    <button
      className={showWeatherStations ? 'map-utils-button active' : 'map-utils-button'}
      id="toggle-weather-stations-button"
      onClick={toggleWeatherStations(executeAction)}
    >
      <svg
        className="icon"
        viewBox="0 0 283.46 283.46"
      >
        <use xlinkHref="#icon-icon_tiesaa_marker" />
      </svg>
      <span><FormattedMessage id="toggle-weather-stations" defaultMessage="Road Weather" /></span>
    </button>
  </div>
);

WeatherStationsToggle.displayName = 'WeatherStationsToggle';

WeatherStationsToggle.description = () => (
  <div>
    <p>
      Weather stations object toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <WeatherStationsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

WeatherStationsToggle.propTypes = {
  showWeatherStations: PropTypes.bool.isRequired,
};

WeatherStationsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(WeatherStationsToggle, ['MapSelectionsStore'], context => ({
  showWeatherStations: context.getStore('MapSelectionsStore').getWeatherStationsState(),
}));

export { connected as default, WeatherStationsToggle as Component };
