import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleMaintenanceState } from '../../action/mapSelectionsActions';

const toggleMaintenance = executeAction =>
  () => executeAction(ToggleMaintenanceState);

const MaintenanceToggle = ({ showMaintenance }, { executeAction }) => (
  <div className="" id="toggle-maintenance" key="toggle-maintenance">
    <div className={showMaintenance ? 'map-utils-button active' : 'map-utils-button'} id="toggle-maintenance-button">
      <Toggle checked={showMaintenance} icons={false} id="MaintenanceToggle" onChange={toggleMaintenance(executeAction)} />
      <label htmlFor="MaintenanceToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_kunnossapito" />
        </svg>
        <FormattedMessage id="toggle-maintenance" defaultMessage="Incidents" />
      </label>
    </div>
  </div>
);

MaintenanceToggle.displayName = 'MaintenanceToggle';

MaintenanceToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <MaintenanceToggle />
      </div>
    </ComponentUsageExample>
  </div>);

MaintenanceToggle.propTypes = {
  showMaintenance: PropTypes.bool.isRequired,
};

MaintenanceToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(MaintenanceToggle, ['MapSelectionsStore'], context => ({
  showMaintenance: context.getStore('MapSelectionsStore').getMaintenanceState(),
}));

export { connected as default, MaintenanceToggle as Component };
