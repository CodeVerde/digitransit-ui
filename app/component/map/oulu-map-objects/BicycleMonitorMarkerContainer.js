import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddBicycleMonitorsData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseBicycleMonitorMessage = (data) => {
  const cleanData = [];

  if (!data || !data.ecostation) { return cleanData; }

  data.ecostation.forEach((element) => {
    cleanData.push({
      id: element.id,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
      directionName: element.direction_name,
      type: element.type,
    });
  });

  return cleanData;
};

const getBicycleMonitorIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_measurement_1', iconText }),
    className: 'green-icon-oulu',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
);

class BicycleMonitorMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showBicycleMonitors: PropTypes.bool.isRequired,
    walkMonitorsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      geometry: PropTypes.object,
      name: PropTypes.string,
      directionName: PropTypes.string,
      type: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.walkMonitorsData.length) {
      this.updateObjects(this.props.walkMonitorsData);
    } else if (this.props.showBicycleMonitors) {
      this.context.executeAction(
        AddBicycleMonitorsData,
        parseBicycleMonitorMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showBicycleMonitors && !this.props.showBicycleMonitors) {
      this.context.executeAction(
        AddBicycleMonitorsData,
        parseBicycleMonitorMessage,
      );
    } else if (this.objs.length !== newProps.walkMonitorsData.length) {
      this.updateObjects(newProps.walkMonitorsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          id={`car-monitor-marker-${element.id}`}
          key={`car-monitor-marker-${element.id}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getBicycleMonitorIcon()}
          title={element.name}
          interactive={false}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs === null || !this.props.showBicycleMonitors) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(BicycleMonitorMarkerContainer, ['MapSelectionsStore'], context => ({
  showBicycleMonitors: context.getStore('MapSelectionsStore').getBicycleMonitorsState(),
  walkMonitorsData: context.getStore('MapSelectionsStore').getBicycleMonitorsData(),
}));
