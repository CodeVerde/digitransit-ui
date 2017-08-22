import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddCamerasData } from '../../../action/mapSelectionsActions';


let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseCamerasMessage = (data) => {
  const cleanData = [];

  if (!data || !data.weathercamera) { return cleanData; }

  data.weathercamera.forEach((element) => {
    cleanData.push({
      id: element.id,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
  });

  return cleanData;
};

const getCameraIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_mittauspisteet_radar_1', iconText }),
    className: 'white-icon-oulu',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class CameraMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showCameras: PropTypes.bool.isRequired,
    camerasData: PropTypes.arrayOf(PropTypes.shape({
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
    if (this.objs.length !== this.props.camerasData.length) {
      this.updateObjects(this.props.camerasData);
    } else if (this.props.showCameras) {
      this.context.executeAction(
        AddCamerasData,
        parseCamerasMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showCameras && !this.props.showCameras) {
      this.context.executeAction(
        AddCamerasData,
        parseCamerasMessage,
      );
    } else if (this.objs.length !== newProps.camerasData.length) {
      this.updateObjects(newProps.camerasData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          id={`camera-marker-${element.id}`}
          key={`camera-marker-${element.id}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getCameraIcon()}
          title={element.name}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs === null || !this.props.showCameras) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CameraMarkerContainer, ['SimpleModeStore'], context => ({
  showCameras: context.getStore('MapSelectionsStore').getCamerasState(),
  camerasData: context.getStore('MapSelectionsStore').getCamerasData(),
}));
