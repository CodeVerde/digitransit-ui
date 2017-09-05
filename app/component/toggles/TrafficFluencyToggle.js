import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import Icon from '../Icon';
import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleTrafficFluencyState, SetTrafficFluencyState } from '../../action/mapSelectionsActions';

const toggleTrafficFluency = executeAction =>
  () => executeAction(ToggleTrafficFluencyState);

const setTrafficFluency = (executeAction, state) => (
  () => {
    document.getElementById('traffic-fluency-checkbox-toggle').checked = false;
    executeAction(SetTrafficFluencyState, state);
  }
);

const modes = [
  'traffic-fluency-now',
  'traffic-fluency-30',
];

const renderList = (trafficFluencyState, executeAction) => {
  const items = [];
  modes.forEach((element, index) => {
    const iconClass = trafficFluencyState === index + 1 ? 'icon' : 'icon icon-not-selected';
    items.push(
      <li key={`traffic-fluency-list-${element}`}>
        <div role="button" htmlFor="SetTrafficFluency" onClick={setTrafficFluency(executeAction, index + 1)}>
          <svg className={iconClass} viewBox="0 0 283.46 283.46">
            <use xlinkHref="#icon-icon_check_1" />
          </svg>
          <FormattedMessage id={element} defaultMessage={`Fluency option ${index}`} />
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

const TrafficFluencyToggle = ({ trafficFluencyState }, { executeAction }) => (
  <div className="" id="toggle-traffic-fluency" key="toggle-traffic-fluency">
    <div className={trafficFluencyState > 0 ? 'map-utils-button active' : 'map-utils-button'} id="toggle-traffic-fluency-button">
      <Toggle
        checked={!!trafficFluencyState}
        icons={false}
        id="TrafficFluencyToggle"
        onChange={toggleTrafficFluency(executeAction)}
      />
      <div className="react-toggle-menu">
        <input type="checkbox" id="traffic-fluency-checkbox-toggle" />
        <label htmlFor="traffic-fluency-checkbox-toggle">
          <svg className="icon" viewBox="0 0 283.46 283.46">
            <use xlinkHref="#icon-icon_change_direction_1" />
          </svg>
          <FormattedMessage id="toggle-traffic-fluency" defaultMessage="Monitoring" />
          <Icon className="fake-select-arrow" img="icon-icon_arrow-dropdown" />
        </label>
        {renderList(trafficFluencyState, executeAction)}
      </div>
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
  trafficFluencyState: PropTypes.number.isRequired,
};

TrafficFluencyToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(TrafficFluencyToggle, ['MapSelectionsStore'], context => ({
  trafficFluencyState: context.getStore('MapSelectionsStore').getTrafficFluencyState(),
}));

export { connected as default, TrafficFluencyToggle as Component };
