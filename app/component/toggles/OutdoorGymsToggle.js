import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleOutdoorGymsState } from '../../action/mapSelectionsActions';

const toggleOutdoorGyms = executeAction =>
  () => executeAction(ToggleOutdoorGymsState);

const OutdoorGymsToggle = ({ showOutdoorGyms }, { executeAction }) => (
  <div className="" id="toggle-outdoor-gyms" key="toggle-outdoor-gyms">
    <div className={showOutdoorGyms ? 'map-utils-button active' : 'map-utils-button'} id="toggle-outdoor-gyms-button">
      <Toggle checked={showOutdoorGyms} icons={false} id="OutdoorGymsToggle" onChange={toggleOutdoorGyms(executeAction)} />
      <label htmlFor="OutdoorGymsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_traffic_cam_1" />
        </svg>
        <FormattedMessage id="toggle-outdoor-gyms" defaultMessage="Outdoor gyms" />
      </label>
    </div>
  </div>
);

OutdoorGymsToggle.displayName = 'OutdoorGymsToggle';

OutdoorGymsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <OutdoorGymsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

OutdoorGymsToggle.propTypes = {
  showOutdoorGyms: PropTypes.bool.isRequired,
};

OutdoorGymsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(OutdoorGymsToggle, ['MapSelectionsStore'], context => ({
  showOutdoorGyms: context.getStore('MapSelectionsStore').getOutdoorGymsState(),
}));

export { connected as default, OutdoorGymsToggle as Component };
