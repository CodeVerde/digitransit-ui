import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddCarParksData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseCarParkMessage = (data) => {
  const cleanData = [];

  if (!data || !data.parkingstation) { return cleanData; }

  data.parkingstation.forEach((element) => {
    cleanData.push({
      id: element.id,
      name: element.name,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      icon: element.icon,
    });
  });

  return cleanData;
};

const getCarParkIcon = (icon, iconText) => {
  if (icon === 'parking-house-green.png') {
    return L.divIcon({
      html: iconAsString({ img: 'icon-icon_parking', iconText }),
      className: 'car-park-available-marker',
      iconSize: [20, 20],
      iconAnchor: [30, 40],
    });
  }

  return L.divIcon({
    html: iconAsString({ img: 'icon-icon_parking', iconText }),
    className: 'white-icon-oulu',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  });
};

class CarParkMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showCarParks: PropTypes.bool.isRequired,
    carParksData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      geometry: PropTypes.object,
      icon: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.carParksData.length) {
      this.updateObjects(this.props.carParksData);
    } else if (this.props.showCarParks) {
      this.context.executeAction(
        AddCarParksData,
        parseCarParkMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showCarParks && !this.props.showCarParks) {
      this.context.executeAction(
        AddCarParksData,
        parseCarParkMessage,
      );
    } else if (this.objs.length !== newProps.carParksData.length) {
      this.updateObjects(newProps.carParksData);
    }
  }

  updateObjects(data) {
    // TODO based on icon ("parking-house-green.png") show different icons
    const newObjs = [];
    // index added as part of the key, since there can be multiple markers with same id
    data.forEach((element, index) => {
      newObjs.push(
        <Marker
          // eslint-disable-next-line react/no-array-index-key
          key={`car-park-marker-${element.id}-${index}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getCarParkIcon(element.icon)}
          title={element.name}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.showCarParks) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(CarParkMarkerContainer, ['SimpleModeStore'], context => ({
  showCarParks: context.getStore('MapSelectionsStore').getCarParksState(),
  carParksData: context.getStore('MapSelectionsStore').getCarParksData(),
}));
