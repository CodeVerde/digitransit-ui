import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleRoadConditionsState, SetRoadConditionsState } from '../../action/mapSelectionsActions';

const toggleRoadConditions = executeAction =>
  () => executeAction(ToggleRoadConditionsState);

const setRoadConditions = (executeAction, state) =>
  () => {
    document.getElementById('road-conditions-checkbox-toggle').checked = false;
    executeAction(SetRoadConditionsState, state);
  };

const modes = [
  'road-conditions-now',
  'road-conditions-2hour',
  'road-conditions-4hour',
  'road-conditions-6hour',
  'road-conditions-12hour',
];

const renderList = (roadConditionsState, executeAction) => {
  const items = [];
  modes.forEach((element, index) => {
    const iconClass = roadConditionsState === index + 1 ? 'icon' : 'icon icon-not-selected';
    items.push(
      <li key={`road-conditions-list-${element}`}>
        <div role="button" htmlFor="setRoadConditions" onClick={setRoadConditions(executeAction, index + 1)}>
          <svg className={iconClass} viewBox="0 0 283.46 283.46">
            <use xlinkHref="#icon-icon_check_1" />
          </svg>
          <FormattedMessage id={element} defaultMessage={`Option ${index}`} />
        </div>
      </li>,
    );
  });

  return (
    <ul className="submenu">
      {items}
    </ul>
  );
};

const RoadConditionsToggle = ({ roadConditionsState }, { executeAction }) => (
  <div className="" id="toggle-road-conditions" key="toggle-road-conditions">
    <div className={roadConditionsState ? 'map-utils-button active' : 'map-utils-button'} id="toggle-road-conditions-button">
      <Toggle
        checked={!!roadConditionsState}
        icons={false}
        id="RoadConditionsToggle"
        onChange={toggleRoadConditions(executeAction)}
      />
      <div className="react-toggle-menu">
        <input type="checkbox" id="road-conditions-checkbox-toggle" />
        <label htmlFor="road-conditions-checkbox-toggle">
          <svg className="icon" viewBox="0 0 283.46 283.46">
            <use xlinkHref="#icon-icon_ajokeli" />
          </svg>
          <FormattedMessage id="toggle-road-conditions" defaultMessage="Road conditions" />
        </label>
        {renderList(roadConditionsState, executeAction)}
      </div>
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
  roadConditionsState: PropTypes.number.isRequired,
};

RoadConditionsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(RoadConditionsToggle, ['MapSelectionsStore'], context => ({
  roadConditionsState: context.getStore('MapSelectionsStore').getRoadConditionsState(),
}));

export { connected as default, RoadConditionsToggle as Component };
