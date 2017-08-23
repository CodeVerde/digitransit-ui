import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleBulletinsState } from '../../action/mapSelectionsActions';

const toggleBulletins = executeAction =>
  () => executeAction(ToggleBulletinsState);

const BulletinsToggle = ({ showBulletins }, { executeAction }) => (
  <div className="" id="toggle-bulletins" key="toggle-bulletins">
    <div className={showBulletins ? 'map-utils-button active' : 'map-utils-button'} id="toggle-bulletins-button">
      <Toggle defaultChecked={showBulletins} icons={false} id="BulletinsToggle" onChange={toggleBulletins(executeAction)} />
      <label htmlFor="BulletinsToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_caution" />
        </svg>
        <FormattedMessage id="toggle-bulletins" defaultMessage="Incidents" />
      </label>
    </div>
  </div>
);

BulletinsToggle.displayName = 'BulletinsToggle';

BulletinsToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <BulletinsToggle />
      </div>
    </ComponentUsageExample>
  </div>);

BulletinsToggle.propTypes = {
  showBulletins: PropTypes.bool.isRequired,
};

BulletinsToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(BulletinsToggle, ['MapSelectionsStore'], context => ({
  showBulletins: context.getStore('MapSelectionsStore').getBulletinsState(),
}));

export { connected as default, BulletinsToggle as Component };
