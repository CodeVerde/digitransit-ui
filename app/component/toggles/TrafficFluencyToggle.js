import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleTrafficFluencyState } from '../../action/mapSelectionsActions';

const toggleTrafficFluency = executeAction =>
  () => executeAction(ToggleTrafficFluencyState);

const TrafficFluencyToggle = ({ showTrafficFluency }, { executeAction }) => (
  <div className="" id="toggle-traffic-fluency" key="toggle-traffic-fluency">
    <div className={showTrafficFluency ? 'map-utils-button active' : 'map-utils-button'} id="toggle-traffic-fluency-button">
      <Toggle defaultChecked={showTrafficFluency} icons={false} id="TrafficFluencyToggle" onChange={toggleTrafficFluency(executeAction)} />
      <label htmlFor="TrafficFluencyToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_change_direction_1" />
        </svg>
        <FormattedMessage id="toggle-traffic-fluency" defaultMessage="Monitoring" />
      </label>
    </div>
  </div>
);

TrafficFluencyToggle.displayName = 'TrafficFluencyToggle';

TrafficFluencyToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <TrafficFluencyToggle />
      </div>
    </ComponentUsageExample>
  </div>);

TrafficFluencyToggle.propTypes = {
  showTrafficFluency: PropTypes.bool.isRequired,
};

TrafficFluencyToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(TrafficFluencyToggle, ['MapSelectionsStore'], context => ({
  showTrafficFluency: context.getStore('MapSelectionsStore').getTrafficFluencyState(),
}));

export { connected as default, TrafficFluencyToggle as Component };
