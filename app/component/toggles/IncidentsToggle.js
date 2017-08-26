import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleIncidentsState } from '../../action/mapSelectionsActions';

const toggleIncidents = executeAction =>
  () => executeAction(ToggleIncidentsState);

const IncidentsToggle = ({ showIncidents }, { executeAction }) => (
  <div className="" id="toggle-incidents" key="toggle-incidents">
    <div className={showIncidents ? 'map-utils-button active' : 'map-utils-button'} id="toggle-incidents-button">
      <Toggle checked={showIncidents} icons={false} id="IncidentsToggle" onChange={toggleIncidents(executeAction)} />
      <label htmlFor="IncidentsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_caution" />
        </svg>
        <FormattedMessage id="toggle-bulletins" defaultMessage="Incidents" />
      </label>
    </div>
  </div>
);

IncidentsToggle.displayName = 'IncidentsToggle';

IncidentsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <IncidentsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

IncidentsToggle.propTypes = {
  showIncidents: PropTypes.bool.isRequired,
};

IncidentsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(IncidentsToggle, ['MapSelectionsStore'], context => ({
  showIncidents: context.getStore('MapSelectionsStore').getIncidentsState(),
}));

export { connected as default, IncidentsToggle as Component };
