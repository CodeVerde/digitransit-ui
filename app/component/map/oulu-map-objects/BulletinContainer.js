import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../IconWithTail';

import { isBrowser } from '../../../util/browser';
import { bulletinMarkerData, bulletinDetailsData } from './BulletinData';

import Card from '../../Card';

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


const parseBulletinMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `bulletin-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      mainClass: element.incidentmainclass,
      reason: element.incidentmainreason,
      area: element.area,
    });
  });

  return cleanData;
};

const getBulletinIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_tiesaa_marker', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class BulletinContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showBulletins: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    // Fetch data if the related setting is setting
    this.data = parseBulletinMessage(bulletinMarkerData);
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showBulletins) { return false; }

    const objs = [];

    this.data.forEach((element) => {
      const titleString = `${bulletinDetailsData.incidentmainclass}
        , ${bulletinDetailsData.area}
        , ${bulletinDetailsData.incidentmainreason}`;
      objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getBulletinIcon()}
          title={titleString}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <Card className="padding-small">
              <div className="card-header">
                <div className="card-header-wrapper">
                  <span className="header-primary">
                    {titleString}
                  </span>
                  <div className="card-sub-header">
                    Kesto: {bulletinDetailsData.startdate}
                  </div>
                </div>
              </div>
              <div>
                <p className="departure route-detail-text no-padding no-margin">{bulletinDetailsData.information}</p>
                <p className="departure route-detail-text no-padding no-margin">Lisätiedot:</p>
                <ul>
                  <li><p className="departure route-detail-text no-padding no-margin">{bulletinDetailsData.incidentadditionalreason1}</p></li>
                  <li><p className="departure route-detail-text no-padding no-margin">{bulletinDetailsData.severity}</p></li>
                </ul>
              </div>
            </Card>
          </Popup>
        </Marker>,
      );
    });

    return (<div style={{ display: 'none' }}>{objs}</div>);
  }
}

export default connectToStores(BulletinContainer, ['SimpleModeStore'], context => ({
  showBulletins: context.getStore('MapSelectionsStore').getBulletinsState(),
}));
