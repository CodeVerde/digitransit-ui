import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleRoadConditionsState } from '../../action/mapSelectionsActions';

const toggleRoadConditions = executeAction =>
  () => executeAction(ToggleRoadConditionsState);

const RoadConditionsToggle = ({ showRoadConditions }, { executeAction }) => (
  <div className="" id="toggle-road-conditions" key="toggle-road-conditions">
    <div className={showRoadConditions ? 'map-utils-button active' : 'map-utils-button'} id="toggle-road-conditions-button">
      <Toggle defaultChecked={showRoadConditions} icons={false} id="RoadConditionsToggle" onChange={toggleRoadConditions(executeAction)} />
      <label htmlFor="RoadConditionsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_ajokeli" />
        </svg>
        <FormattedMessage id="toggle-road-conditions" defaultMessage="Road conditions" />
      </label>
    </div>
  </div>
);

RoadConditionsToggle.displayName = 'RoadConditionsToggle';

RoadConditionsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <RoadConditionsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

RoadConditionsToggle.propTypes = {
  showRoadConditions: PropTypes.bool.isRequired,
};

RoadConditionsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(RoadConditionsToggle, ['MapSelectionsStore'], context => ({
  showRoadConditions: context.getStore('MapSelectionsStore').getRoadConditionsState(),
}));

export { connected as default, RoadConditionsToggle as Component };
