import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';
import { isBrowser } from '../../util/browser';
import { getJsonWithHeaders } from '../../util/xhrPromise';
import { cleanJson } from '../../util/ouluUtils';
import { AddWeatherStationsData } from '../../action/mapSelectionsActions';

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
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.weatherStationsData.length) {
      this.updateObjects(this.props.weatherStationsData);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showWeatherStations && !this.props.showWeatherStations) {
      const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweatherstations.php';
      const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
      getJsonWithHeaders(url, null, headers)
      .then(response => cleanJson(response))
      .then(cleanResponse => this.context.executeAction(
        AddWeatherStationsData,
        parseWeatherStationMessage(cleanResponse),
      ))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
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
