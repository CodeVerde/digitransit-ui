import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import { ToggleRoadWeatherState } from '../action/mapSelectionsActions';

const toggleRoadWeather = executeAction =>
  () => executeAction(ToggleRoadWeatherState);

const RoadWeatherToggle = ({ showRoadWeather }, { executeAction }) => (
  <div key="toggle-road-weather" id="toggle-road-weather" className="">
    <button
      id="toggle-road-weather-button"
      onClick={toggleRoadWeather(executeAction)}
    >
      <FormattedMessage id="toggle-road-weather" defaultMessage="Driving Weather" />
      {showRoadWeather ? ': ON' : ': OFF'}
    </button>
  </div>
);

RoadWeatherToggle.displayName = 'RoadWeatherToggle';

RoadWeatherToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <RoadWeatherToggle />
      </div>
    </ComponentUsageExample>
  </div>);

RoadWeatherToggle.propTypes = {
  showRoadWeather: PropTypes.bool.isRequired,
};

RoadWeatherToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(RoadWeatherToggle, ['MapSelectionsStore'], context => ({
  showRoadWeather: context.getStore('MapSelectionsStore').getRoadWeatherState(),
}));

export { connected as default, RoadWeatherToggle as Component };
