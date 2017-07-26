import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import { toggleBusLinesState } from '../action/mapSelectionsActions';

const toggleBusLines = executeAction =>
  () => executeAction(toggleBusLinesState);

const BusLinesToggle = ({ showBusLines }, { executeAction }) => (
  <div key="toggle-bus-lines" id="toggle-bus-lines" className="small-4 columns">
    <button
      id="toggle-bus-lines-button"
      onClick={toggleBusLines(executeAction)}
    >
      <FormattedMessage id="toggle-bus-lines" defaultMessage="Bus lines" />
    </button>
  </div>
);

BusLinesToggle.displayName = 'BusLinesToggle';

BusLinesToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <BusLinesToggle />
      </div>
    </ComponentUsageExample>
  </div>);

BusLinesToggle.propTypes = {
  showBusLines: PropTypes.bool.isRequired,
};

BusLinesToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

const connected = connectToStores(BusLinesToggle, ['MapSelectionsStore'], context => ({
  showBusLines: context.getStore('MapSelectionsStore').getData().showBusLines,
}));

export { connected as default, BusLinesToggle as Component };
