import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { carParkingMarkerData, carParkingDetailsData } from './CarParkingData';


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


const parseCarParkingMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `carParking-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
  });

  return cleanData;
};

const getCarParkingIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_ajokeli', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class CarParkingContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showCarParking: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      objs: null,
    };
  }

  componentWillMount() {
    this.data = parseCarParkingMessage(carParkingMarkerData);
    this.objs = [];
    this.data.forEach((element) => {
      const freeSpaceString = `Vapaita paikkoja: ${carParkingDetailsData.freespace} / ${carParkingDetailsData.totalspace}`;
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getCarParkingIcon()}
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
              <small>{carParkingDetailsData.timestamp}</small><br />
              {freeSpaceString}<br />
              {carParkingDetailsData.address}
            </p>
          </Popup>
        </Marker>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showCarParking) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CarParkingContainer, ['SimpleModeStore'], context => ({
  showCarParking: context.getStore('MapSelectionsStore').getCarParkingState(),
}));
