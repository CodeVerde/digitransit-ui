import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { monitoringMarkerData, monitoringDetailsData } from './MonitoringData';


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


const parseMonitoringMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `monitoring-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
      directionName: element.direction_name,
      type: element.type,
    });
  });

  console.log('parseMonitoringMessage: ', cleanData);
  return cleanData;
};

const getMonitoringIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_tiesaa_marker', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class MonitoringContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showMonitoring: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    // Fetch data if the related setting is setting
    this.data = parseMonitoringMessage(monitoringMarkerData);
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showMonitoring) { return false; }

    const objs = [];
    this.data.forEach((element) => {
      const contentString = `${monitoringDetailsData[0].weekday} ${monitoringDetailsData[0].date}
      : ${monitoringDetailsData[0].value}`;
      objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getMonitoringIcon()}
          title={element.name}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <p><strong>{element.name}</strong><br />
              {contentString}
            </p>
          </Popup>
        </Marker>,
      );
    });

    return (<div style={{ display: 'none' }}>{objs}</div>);
  }
}

export default connectToStores(MonitoringContainer, ['SimpleModeStore'], context => ({
  showMonitoring: context.getStore('MapSelectionsStore').getMonitoringState(),
}));
