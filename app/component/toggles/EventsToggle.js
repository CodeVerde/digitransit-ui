import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleEventsState } from '../../action/mapSelectionsActions';

const toggleEvents = executeAction =>
  () => executeAction(ToggleEventsState);

const EventsToggle = ({ showEvents }, { executeAction }) => (
  <div className="" id="toggle-events" key="toggle-events">
    <div className={showEvents ? 'map-utils-button active' : 'map-utils-button'} id="toggle-events-button">
      <Toggle checked={showEvents} icons={false} id="EventsToggle" onChange={toggleEvents(executeAction)} />
      <label htmlFor="EventsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_boat-withoutBox" />
        </svg>
        <FormattedMessage id="toggle-events" defaultMessage="Events" />
      </label>
    </div>
  </div>
);

EventsToggle.displayName = 'EventsToggle';

EventsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <EventsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

EventsToggle.propTypes = {
  showEvents: PropTypes.bool.isRequired,
};

EventsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(EventsToggle, ['MapSelectionsStore'], context => ({
  showEvents: context.getStore('MapSelectionsStore').getEventsState(),
}));

export { connected as default, EventsToggle as Component };
