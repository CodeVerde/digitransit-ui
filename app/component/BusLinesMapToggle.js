import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from './ComponentUsageExample';
import { ToggleBusLinesState } from '../action/mapSelectionsActions';

const toggleBusLinesMap = executeAction =>
  () => executeAction(ToggleBusLinesState);

const BusLinesMapToggle = ({ showBusLinesMap }, { executeAction }) => (
  <div className="" id="toggle-bus-lines-map" key="toggle-bus-lines-map">
    <div className={showBusLinesMap ? 'map-utils-button active' : 'map-utils-button'} id="toggle-bus-lines-map-button">
      <Toggle defaultChecked={showBusLinesMap} icons={false} id="BusLinesMapToggle" onChange={toggleBusLinesMap(executeAction)} />
      <label htmlFor="BusLinesMapToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_linjakartta" />
        </svg>
        <FormattedMessage id="toggle-bus-lines-map" defaultMessage="Bus Lines Map" />
      </label>
    </div>
  </div>
);

BusLinesMapToggle.displayName = 'BusLinesMapToggle';

BusLinesMapToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <BusLinesMapToggle />
      </div>
    </ComponentUsageExample>
  </div>);

BusLinesMapToggle.propTypes = {
  showBusLinesMap: PropTypes.bool.isRequired,
};

BusLinesMapToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(BusLinesMapToggle, ['MapSelectionsStore'], context => ({
  showBusLinesMap: context.getStore('MapSelectionsStore').getBusLinesState(),
}));

export { connected as default, BusLinesMapToggle as Component };
