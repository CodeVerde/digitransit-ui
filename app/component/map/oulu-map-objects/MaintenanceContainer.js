import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

import { isBrowser } from '../../../util/browser';
import { AddMaintenanceData } from '../../../action/mapSelectionsActions';

let Polyline;

if (isBrowser) {
  /* eslint-disable global-require */
  Polyline = require('react-leaflet/lib/Polyline').default;
  /* eslint-enable global-require */
}


const parseMaintenanceMessage = (data) => {
  const cleanData = [];

  if (!data || !data.fluencyline) { return cleanData; }

  data.fluencyline.forEach((element) => {
    cleanData.push({
      id: `maintenance-poly-${element.id}`,
      encodedGeometry: element.encoded_geom,
      color: element.color,
      opacity: element.opacity,
      name: element.name,
      description: element.description,
      timestamp: element.timestamp,
      fluencyText: element.fluency_text,
    });
  });

  return cleanData;
};

class MaintenanceContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showMaintenance: PropTypes.bool.isRequired,
    maintenanceData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      encodedGeometry: PropTypes.string,
      color: PropTypes.string,
      opacity: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      timestamp: PropTypes.string,
      fluencyText: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.maintenanceData.length) {
      this.updateObjects(this.props.maintenanceData);
    } else if (this.props.showMaintenance) {
      this.context.executeAction(
        AddMaintenanceData,
        parseMaintenanceMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showMaintenance && !this.props.showMaintenance) {
      this.context.executeAction(
        AddMaintenanceData,
        parseMaintenanceMessage,
      );
    } else if (this.objs.length !== newProps.maintenanceData.length) {
      this.updateObjects(newProps.maintenanceData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Polyline
          key={`${element.id}-poly`}
          positions={polyline.decode(element.encodedGeometry)}
          color={element.color}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showMaintenance) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(MaintenanceContainer, ['MapSelectionsStore'], context => ({
  showMaintenance: context.getStore('MapSelectionsStore').getMaintenanceState(),
  maintenanceData: context.getStore('MapSelectionsStore').getMaintenanceData(),
}));
