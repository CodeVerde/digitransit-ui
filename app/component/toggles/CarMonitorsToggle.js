import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleCarMonitorsState } from '../../action/mapSelectionsActions';

const toggleCarMonitors = executeAction =>
  () => executeAction(ToggleCarMonitorsState);

const CarMonitorsToggle = ({ showCarMonitors }, { executeAction }) => (
  <div className="" id="toggle-car-monitors" key="toggle-car-monitors">
    <div className={showCarMonitors ? 'map-utils-button active' : 'map-utils-button'} id="toggle-car-monitors-button">
      <Toggle defaultChecked={showCarMonitors} icons={false} id="CarMonitorsToggle" onChange={toggleCarMonitors(executeAction)} />
      <label htmlFor="CarMonitorsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_mittauspisteet_radar_1" />
        </svg>
        <FormattedMessage id="toggle-car-monitors" defaultMessage="Incidents" />
      </label>
    </div>
  </div>
);

CarMonitorsToggle.displayName = 'CarMonitorsToggle';

CarMonitorsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <CarMonitorsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

CarMonitorsToggle.propTypes = {
  showCarMonitors: PropTypes.bool.isRequired,
};

CarMonitorsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(CarMonitorsToggle, ['MapSelectionsStore'], context => ({
  showCarMonitors: context.getStore('MapSelectionsStore').getCarMonitorsState(),
}));

export { connected as default, CarMonitorsToggle as Component };
