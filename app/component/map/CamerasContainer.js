import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { camerasMarkerData, camerasDetailsData } from './CamerasData';


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


const parseCamerasMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `cameras-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
  });

  return cleanData;
};

const getCamerasIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_kunnossapito', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class CamerasContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showCameras: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.objs = [];
  }

  componentWillMount() {
    this.data = parseCamerasMessage(camerasMarkerData);
    this.objs = [];
    this.data.forEach((element) => {
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getCamerasIcon()}
          title={element.name}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <p><strong>{camerasDetailsData.name}</strong><br />
              {camerasDetailsData.timestamp}<br />
              <img
                src={camerasDetailsData.image}
                alt={camerasDetailsData.name}
              />
            </p>
          </Popup>
        </Marker>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showCameras) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CamerasContainer, ['SimpleModeStore'], context => ({
  showCameras: context.getStore('MapSelectionsStore').getCamerasState(),
}));
