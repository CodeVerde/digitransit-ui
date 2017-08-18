import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { AddIncidentsData } from '../../action/mapSelectionsActions';
import { getJsonWithHeaders } from '../../util/xhrPromise';
import { cleanJson } from '../../util/ouluUtils';

let Marker;
let Polyline;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  Polyline = require('react-leaflet/lib/Polyline').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseIncidentsMessage = (data) => {
  const cleanData = [];
  data.notice.forEach((element) => {
    const cleanElement = {
      id: element.id,
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

class IncidentMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showIncidents: PropTypes.bool.isRequired,
    incidentsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      geometry: PropTypes.object,
      direction: PropTypes.string,
      incidentMainClass: PropTypes.string,
      incidentMainReason: PropTypes.string,
      area: PropTypes.string,
      geometry2: PropTypes.object,
      encodedGeometry: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.incidentsData.length) {
      this.updateObjects(this.props.incidentsData);
    } else if (this.props.showIncidents) {
      const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php';
      // const url2 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?type=future';
      // const url3 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php';
      // const url4 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?type=future';
      const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
      // TODO refactor into actions
      getJsonWithHeaders(url, null, headers)
      .then(response => cleanJson(response))
      .then(cleanResponse => this.context.executeAction(
        AddIncidentsData,
        parseIncidentsMessage(cleanResponse),
      ))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showIncidents && !this.props.showIncidents) {
      // TODO refactor into actions
      const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php';
      // const url2 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?type=future';
      // const url3 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php';
      // const url4 = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?type=future';
      const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
      getJsonWithHeaders(url, null, headers)
      .then(response => cleanJson(response))
      .then(cleanResponse => this.context.executeAction(
        AddIncidentsData,
        parseIncidentsMessage(cleanResponse),
      ))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
    } else if (this.objs.length !== newProps.incidentsData.length) {
      this.updateObjects(newProps.incidentsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      const titleString = `${element.incidentMainClass}, ${element.area}, ${element.incidentMainReason}`;
      newObjs.push(
        <Marker
          id={`incident-marker-${element.id}`}
          key={`incident-marker-${element.id}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getIncidentsIcon()}
          title={titleString}
        />,
      );
      if (element.geometry2) {
        newObjs.push(
          <Marker
            id={`incident-marker-${element.id}-2`}
            key={`incident-marker-${element.id}-2`}
            position={{
              lat: element.geometry2.lat,
              lng: element.geometry2.lon,
            }}
            icon={getIncidentsIcon()}
            title={titleString}
          />,
        );
      }
      if (element.encodedGeometry) {
        newObjs.push(
          <Polyline
            id={`incident-marker-${element.id}-poly`}
            key={`incident-marker-${element.id}-poly`}
            positions={polyline.decode(element.encodedGeometry)}
          />,
        );
      }
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.showIncidents) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(IncidentMarkerContainer, ['SimpleModeStore'], context => ({
  showIncidents: context.getStore('MapSelectionsStore').getIncidentsState(),
  incidentsData: context.getStore('MapSelectionsStore').getIncidentsData(),
}));
