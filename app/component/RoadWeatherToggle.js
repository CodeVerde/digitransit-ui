import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import { ToggleWeatherStationsState } from '../action/mapSelectionsActions';

const toggleRoadWeather = executeAction =>
  () => executeAction(ToggleWeatherStationsState);

const RoadWeatherToggle = ({ showRoadWeather }, { executeAction }) => (
  <div key="toggle-road-conditions" id="toggle-road-conditions" className="">
    <button
      className={showRoadWeather ? 'map-utils-button active' : 'map-utils-button'}
      id="toggle-road-conditions-button"
      onClick={toggleRoadWeather(executeAction)}
    >
      <svg
        className="icon"
        viewBox="0 0 283.46 283.46"
      >
        <use xlinkHref="#icon-icon_ajokeli" />
      </svg>
      <span><FormattedMessage id="toggle-road-conditions" defaultMessage="Driving Weather" /></span>
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
  showRoadWeather: context.getStore('MapSelectionsStore').getRoadConditionsState(),
}));

export { connected as default, RoadWeatherToggle as Component };
