import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';
import { isBrowser } from '../../util/browser';
import { getJsonWithHeaders } from '../../util/xhrPromise';
import { cleanJson } from '../../util/ouluJsonUtils';

import { AddWeatherStationsData } from '../../action/mapSelectionsActions';

// import { weatherStationDetailsData } from './WeatherStationMarkerData';
// import WeatherStationPopupContainer from './WeatherStationPopupContainer';

// import WeatherStationMarker from './WeatherStationMarker';
// import Card from '../Card';

// let Popup;
let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  // Popup = require('react-leaflet/lib/Popup').default;
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseWeatherStationMessage = (data) => {
  const cleanData = [];
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
    weatherStationsData: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      objs: [],
    };
  }

  componentWillMount() {
    console.log('WeatherStationMarkerContainer, componentWillMount');
    if (this.props.weatherStationsData.length === 0) {
    // if (newProps.showWeatherStations && !this.props.showWeatherStations) {
      const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweatherstations.php';
      const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
      getJsonWithHeaders(url, null, headers)
      .then(response => cleanJson(response))
      .then(cleanResponse => this.context.executeAction(
        AddWeatherStationsData,
        parseWeatherStationMessage(cleanResponse),
      ))
      .catch(err => console.log(`Requesting road weather stations, error: ${err}`));
    } else {
      this.updateObjects(this.props.weatherStationsData);
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('WeatherStationMarkerContainer, componentWillReceiveProps');
    if (this.state.objs.length !== newProps.weatherStationsData.length) {
      this.updateObjects(newProps.weatherStationsData);
    }
  }

  updateObjects(data) {
    console.log('WeatherStationMarkerContainer, updateObjects');
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
    this.setState({
      objs: newObjs,
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.state.objs.length === 0 /* || !this.props.showWeatherStations*/) { return false; }

    return (<div style={{ display: 'none' }}>{this.state.objs}</div>);
  }
}

export default connectToStores(WeatherStationMarkerContainer, ['SimpleModeStore'], context => ({
  showWeatherStations: context.getStore('MapSelectionsStore').getWeatherStationsState(),
  weatherStationsData: context.getStore('MapSelectionsStore').getWeatherStationsData(),
}));
