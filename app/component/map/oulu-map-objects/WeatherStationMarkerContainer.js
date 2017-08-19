import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../IconWithTail';
import { isBrowser } from '../../../util/browser';
import { AddWeatherStationsData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseWeatherStationMessage = (data) => {
  const cleanData = [];

  if (!data || !data.weatherstation) { return cleanData; }

  data.weatherstation.forEach((element) => {
    let exist = false;
    cleanData.forEach((cleanElement) => {
      if (element.geom.coordinates[1] === cleanElement.geometry.lat &&
        element.geom.coordinates[0] === cleanElement.geometry.lon) {
        exist = true;
      }
    });
    if (!exist) {
      cleanData.push({
        id: element.id,
        geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
        name: element.name,
      });
    }
  });
  return cleanData;
};

const getWeatherStationMarkerIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_tiesaa_marker', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class WeatherStationMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showWeatherStations: PropTypes.bool.isRequired,
    weatherStationsData: PropTypes.arrayOf(PropTypes.shape({
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
    if (this.objs.length !== this.props.weatherStationsData.length) {
      this.updateObjects(this.props.weatherStationsData);
    } else if (this.props.showWeatherStations) {
      this.context.executeAction(
        AddWeatherStationsData,
        parseWeatherStationMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showWeatherStations && !this.props.showWeatherStations) {
      this.context.executeAction(
        AddWeatherStationsData,
        parseWeatherStationMessage,
      );
    } else if (this.objs.length !== newProps.weatherStationsData.length) {
      this.updateObjects(newProps.weatherStationsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          id={`weather-station-marker-${element.id}`}
          key={`weather-station-marker-${element.id}`}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getWeatherStationMarkerIcon()}
          title={element.name}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.showWeatherStations) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(WeatherStationMarkerContainer, ['SimpleModeStore'], context => ({
  showWeatherStations: context.getStore('MapSelectionsStore').getWeatherStationsState(),
  weatherStationsData: context.getStore('MapSelectionsStore').getWeatherStationsData(),
}));
