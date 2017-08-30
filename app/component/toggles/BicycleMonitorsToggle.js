import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleBicycleMonitorsState } from '../../action/mapSelectionsActions';

const toggleBicycleMonitors = executeAction =>
  () => executeAction(ToggleBicycleMonitorsState);

const BicycleMonitorsToggle = ({ showBicycleMonitors }, { executeAction }) => (
  <div className="" id="toggle-bicycle-monitors" key="toggle-bicycle-monitors">
    <div className={showBicycleMonitors ? 'map-utils-button active' : 'map-utils-button'} id="toggle-bicycle-monitors-button">
      <Toggle checked={showBicycleMonitors} icons={false} id="BicycleMonitorsToggle" onChange={toggleBicycleMonitors(executeAction)} />
      <label htmlFor="BicycleMonitorsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_measurement_1" />
        </svg>
        <FormattedMessage id="toggle-car-monitors" defaultMessage="Monitoring" />
      </label>
    </div>
  </div>
);

BicycleMonitorsToggle.displayName = 'BicycleMonitorsToggle';

BicycleMonitorsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <BicycleMonitorsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

BicycleMonitorsToggle.propTypes = {
  showBicycleMonitors: PropTypes.bool.isRequired,
};

BicycleMonitorsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(BicycleMonitorsToggle, ['MapSelectionsStore'], context => ({
  showBicycleMonitors: context.getStore('MapSelectionsStore').getBicycleMonitorsState(),
}));

export { connected as default, BicycleMonitorsToggle as Component };
