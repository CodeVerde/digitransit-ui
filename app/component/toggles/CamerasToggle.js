import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';

import ComponentUsageExample from '../ComponentUsageExample';
import { ToggleCamerasState } from '../../action/mapSelectionsActions';

const toggleCameras = executeAction =>
  () => executeAction(ToggleCamerasState);

const CamerasToggle = ({ showCameras }, { executeAction }) => (
  <div className="" id="toggle-cameras" key="toggle-cameras">
    <div className={showCameras ? 'map-utils-button active' : 'map-utils-button'} id="toggle-cameras-button">
      <Toggle defaultChecked={showCameras} icons={false} id="CamerasToggle" onChange={toggleCameras(executeAction)} />
      <label htmlFor="CamerasToggle">
        <svg className="icon" viewBox="0 0 283.46 283.46">
          <use xlinkHref="#icon-icon_traffic_cam_1" />
        </svg>
        <FormattedMessage id="toggle-cameras" defaultMessage="Incidents" />
      </label>
    </div>
  </div>
);

CamerasToggle.displayName = 'CamerasToggle';

CamerasToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <CamerasToggle />
      </div>
    </ComponentUsageExample>
  </div>);

CamerasToggle.propTypes = {
  showCameras: PropTypes.bool.isRequired,
};

CamerasToggle.contextTypes = {
  executeAction: PropTypes.func.isRequired,
};

const connected = connectToStores(CamerasToggle, ['MapSelectionsStore'], context => ({
  showCameras: context.getStore('MapSelectionsStore').getCamerasState(),
}));

export { connected as default, CamerasToggle as Component };
