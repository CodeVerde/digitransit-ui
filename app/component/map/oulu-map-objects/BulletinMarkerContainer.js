import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddBulletinsData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseBulletinMessage = (data) => {
  const cleanData = [];

  if (!data || !data.notice) { return cleanData; }

  data.notice.forEach((element) => {
    const cleanElement = {
      id: element.id,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      direction: element.direction,
      incidentIcon: element.incidentIcon,
      incidentMainClass: element.incidentmainclass,
      incidentMainReason: element.incidentmainreason,
      area: element.area,
    };

    if (element.geom2) {
      cleanElement.geometry2 = {
        lat: element.geom2.coordinates[1],
        lon: element.geom2.coordinates[0],
      };
    }

    if (element.encoded_linear_geom) {
      cleanElement.encodedGeometry = element.encoded_linear_geom;
    }

    cleanData.push(cleanElement);
  });

  return cleanData;
};

const getBulletinIcon = (mainClass, iconText) => {
  const iconName = mainClass === 'Tietyö' ? 'icon-icon_roadwork_1' : 'icon-icon_caution';
  return L.divIcon({
    html: iconAsString({ img: iconName, iconText }),
    className: 'white-icon-oulu',
    iconSize: [10, 10],
    iconAnchor: [30, 40],
  });
};

class BulletinContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showBulletins: PropTypes.bool.isRequired,
    bulletinsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      geometry: PropTypes.object,
      incidentIcon: PropTypes.string,
      incidentMainClass: PropTypes.string,
      incidentMainReason: PropTypes.string,
      area: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.bulletinsData.length) {
      this.updateObjects(this.props.bulletinsData);
    } else if (this.props.showBulletins) {
      this.context.executeAction(
        AddBulletinsData,
        parseBulletinMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showBulletins && !this.props.showBulletins) {
      this.context.executeAction(
        AddBulletinsData,
        parseBulletinMessage,
      );
    } else if (this.objs.length !== newProps.bulletinsData.length) {
      this.updateObjects(newProps.bulletinsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          id={`bulletin-marker-${element.id}`}
          key={`bulletin-marker-${element.id}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getBulletinIcon(element.incidentMainClass)}
          title={element.name}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.showBulletins) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(BulletinContainer, ['MapSelectionsStore'], context => ({
  showBulletins: context.getStore('MapSelectionsStore').getBulletinsState(),
  bulletinsData: context.getStore('MapSelectionsStore').getBulletinsData(),
}));
