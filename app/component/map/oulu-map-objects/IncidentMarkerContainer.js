import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';
import { AddIncidentsData } from '../../../action/mapSelectionsActions';

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

  if (!data || !data.notice) { return cleanData; }

  if (Array.isArray(data.notice)) {
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
  } else {
    const element = data.notice;
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
  }

  return cleanData;
};

const getIncidentsIcon = (mainClass, iconText) => {
  const iconName = mainClass === 'Tietyö' ? 'icon-icon_roadwork_1' : 'icon-icon_caution';
  return L.divIcon({
    html: iconAsString({ img: iconName, iconText }),
    className: 'orange-icon-oulu',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

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
      this.context.executeAction(
        AddIncidentsData,
        parseIncidentsMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showIncidents && !this.props.showIncidents) {
      this.context.executeAction(
        AddIncidentsData,
        parseIncidentsMessage,
      );
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
          icon={getIncidentsIcon(element.incidentMainClass)}
          title={titleString}
          interactive={false}
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
            icon={getIncidentsIcon(element.incidentMainClass)}
            title={titleString}
            interactive={false}
          />,
        );
      }
      if (element.encodedGeometry) {
        newObjs.push(
          <Polyline
            id={`incident-marker-${element.id}-poly`}
            key={`incident-marker-${element.id}-poly`}
            positions={polyline.decode(element.encodedGeometry)}
            interactive={false}
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

export default connectToStores(IncidentMarkerContainer, ['MapSelectionsStore'], context => ({
  showIncidents: context.getStore('MapSelectionsStore').getIncidentsState(),
  incidentsData: context.getStore('MapSelectionsStore').getIncidentsData(),
}));
