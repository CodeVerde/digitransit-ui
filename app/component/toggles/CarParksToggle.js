import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleCarParksState } from '../../action/mapSelectionsActions';

const toggleCarParks = executeAction =>
  () => executeAction(ToggleCarParksState);

const CarParksToggle = ({ showCarParks }, { executeAction }) => (
  <div className="" id="toggle-car-parks" key="toggle-car-parks">
    <div className={showCarParks ? 'map-utils-button active' : 'map-utils-button'} id="toggle-car-parks-button">
      <Toggle checked={showCarParks} icons={false} id="CarParksToggle" onChange={toggleCarParks(executeAction)} />
      <label htmlFor="CarParksToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_parking" />
        </svg>
        <FormattedMessage id="toggle-car-parks" defaultMessage="Parking" />
      </label>
    </div>
  </div>
);

CarParksToggle.displayName = 'CarParksToggle';

CarParksToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <CarParksToggle />
      </div>
    </ComponentUsageExample>
  </div>);

CarParksToggle.propTypes = {
  showCarParks: PropTypes.bool.isRequired,
};

CarParksToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(CarParksToggle, ['MapSelectionsStore'], context => ({
  showCarParks: context.getStore('MapSelectionsStore').getCarParksState(),
}));

export { connected as default, CarParksToggle as Component };
