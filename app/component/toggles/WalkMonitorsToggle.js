import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleWalkMonitorsState } from '../../action/mapSelectionsActions';

const toggleWalkMonitors = executeAction =>
  () => executeAction(ToggleWalkMonitorsState);

const WalkMonitorsToggle = ({ showWalkMonitors }, { executeAction }) => (
  <div className="" id="toggle-walk-monitors" key="toggle-walk-monitors">
    <div className={showWalkMonitors ? 'map-utils-button active' : 'map-utils-button'} id="toggle-walk-monitors-button">
      <Toggle defaultChecked={showWalkMonitors} icons={false} id="WalkMonitorsToggle" onChange={toggleWalkMonitors(executeAction)} />
      <label htmlFor="WalkMonitorsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_measurement_1" />
        </svg>
        <FormattedMessage id="toggle-car-monitors" defaultMessage="Monitoring" />
      </label>
    </div>
  </div>
);

WalkMonitorsToggle.displayName = 'WalkMonitorsToggle';

WalkMonitorsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <WalkMonitorsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

WalkMonitorsToggle.propTypes = {
  showWalkMonitors: PropTypes.bool.isRequired,
};

WalkMonitorsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(WalkMonitorsToggle, ['MapSelectionsStore'], context => ({
  showWalkMonitors: context.getStore('MapSelectionsStore').getWalkMonitorsState(),
}));

export { connected as default, WalkMonitorsToggle as Component };
