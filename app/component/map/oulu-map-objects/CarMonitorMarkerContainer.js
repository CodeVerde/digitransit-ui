import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddCarMonitorsData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseCarMonitorMessage = (data) => {
  const cleanData = [];

  if (!data || !data.lamstation) { return cleanData; }

  data.lamstation.forEach((element) => {
    cleanData.push({
      id: element.id,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
  });

  return cleanData;
};

const getCarMonitorIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_mittauspisteet_radar_1', iconText }),
    className: 'white-icon-oulu',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class CarMonitorMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showCarMonitors: PropTypes.bool.isRequired,
    carMonitorsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      geometry: PropTypes.object,
      name: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.carMonitorsData.length) {
      this.updateObjects(this.props.carMonitorsData);
    } else if (this.props.showCarMonitors) {
      this.context.executeAction(
        AddCarMonitorsData,
        parseCarMonitorMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showCarMonitors && !this.props.showCarMonitors) {
      this.context.executeAction(
        AddCarMonitorsData,
        parseCarMonitorMessage,
      );
    } else if (this.objs.length !== newProps.carMonitorsData.length) {
      this.updateObjects(newProps.carMonitorsData);
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
          icon={getCarMonitorIcon()}
          title={element.name}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showCarMonitors) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CarMonitorMarkerContainer, ['SimpleModeStore'], context => ({
  showCarMonitors: context.getStore('MapSelectionsStore').getCarMonitorsState(),
  carMonitorsData: context.getStore('MapSelectionsStore').getCarMonitorsData(),
}));
