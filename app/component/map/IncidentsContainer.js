import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { incidentsMarkerData, incidentsDetailsData } from './IncidentsData';


let Popup;
let Marker;
let Polyline;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/lib/Popup').default;
  Marker = require('react-leaflet/lib/Marker').default;
  Polyline = require('react-leaflet/lib/Polyline').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseIncidentsMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    const cleanElement = {
      id: `incidents-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      direction: element.direction,
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

const getIncidentsIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_sadealueet', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class IncidentsContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showIncidents: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      objs: null,
    };
  }

  componentWillMount() {
    this.data = parseIncidentsMessage(incidentsMarkerData);
    this.objs = [];
    this.data.forEach((element) => {
      const titleString = `${element.incidentMainClass}
        , ${element.area}
        , ${element.incidentMainReason}`;
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getIncidentsIcon()}
          title={titleString}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <p><strong>{incidentsDetailsData.incidentMainClass},
              {incidentsDetailsData.area}. {incidentsDetailsData.incidentMainReason}
            </strong><br />
              Kesto: {incidentsDetailsData.startDate} - {incidentsDetailsData.endDate}
              {incidentsDetailsData.information}<br />
              Lisätiedot:
              {incidentsDetailsData.incidentadditionalreason1}<br />
              {incidentsDetailsData.severity}
            </p>
          </Popup>
        </Marker>,
      );
      if (element.geometry2) {
        this.objs.push(
          <Marker
            key={`${element.id}-2`}
            position={{
              lat: element.geometry2.lat,
              lng: element.geometry2.lon,
            }}
            icon={getIncidentsIcon()}
            title={titleString}
          >
            <Popup
              offset={[106, 16]}
              closeButton={false}
              maxWidth={250}
              minWidth={250}
              className="popup"
            >
              <p><strong>{incidentsDetailsData.incidentMainClass},
                {incidentsDetailsData.area}. {incidentsDetailsData.incidentMainReason}
              </strong><br />
                Kesto: {incidentsDetailsData.startDate} - {incidentsDetailsData.endDate}
                {incidentsDetailsData.information}<br />
                Lisätiedot:
                {incidentsDetailsData.incidentadditionalreason1}<br />
                {incidentsDetailsData.severity}
              </p>
            </Popup>
          </Marker>,
        );
      }
      if (element.encodedGeometry) {
        this.objs.push(
          <Polyline
            key={`${element.id}-poly`}
            positions={polyline.decode(element.encodedGeometry)}
          />,
        );
      }
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showIncidents) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(IncidentsContainer, ['SimpleModeStore'], context => ({
  showIncidents: context.getStore('MapSelectionsStore').getIncidentsState(),
}));
