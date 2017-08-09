import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { carMonitoringMarkerData, carMonitoringDetailsData } from './CarMonitoringData';


let Popup;
let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/lib/Popup').default;
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseCarMonitoringMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `carMonitoring-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
  });

  return cleanData;
};

const getCarMonitoringIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_ajokeli', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class CarMonitoringContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showCarMonitoring: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      objs: null,
    };
  }

  componentWillMount() {
    this.data = parseCarMonitoringMessage(carMonitoringMarkerData);
    this.objs = [];
    this.data.forEach((element) => {
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getCarMonitoringIcon()}
          title={element.name}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <p><strong>{carMonitoringDetailsData.name}</strong><br />
              <small>{carMonitoringDetailsData.timestamp}</small><br />
              Keskinopeudet:<br />
              Pohjoiseen: {carMonitoringDetailsData.averagespeed1}<br />
              Etelään: {carMonitoringDetailsData.averagespeed2}<br />
              Liikennemäärät (ajon/h):<br />
              Pohjoiseen: {carMonitoringDetailsData.trafficamount1}<br />
              Etelään: {carMonitoringDetailsData.trafficamount2}<br />
            </p>
          </Popup>
        </Marker>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showCarMonitoring) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CarMonitoringContainer, ['SimpleModeStore'], context => ({
  showCarMonitoring: context.getStore('MapSelectionsStore').getCarMonitoringState(),
}));
