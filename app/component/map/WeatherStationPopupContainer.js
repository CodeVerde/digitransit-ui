import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';
import { isBrowser } from '../../util/browser';
import { getJsonWithHeaders } from '../../util/xhrPromise';
import { cleanJson } from '../../util/ouluJsonUtils';

import { weatherStationDetailsData } from './WeatherStationMarkerData';

import Card from '../Card';

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

//
// const getWeatherStationMarkerIcon = iconText => (
//   L.divIcon({
//     html: iconAsString({ img: 'icon-icon_tiesaa_marker', iconText }),
//     className: 'weather-station-marker',
//     iconSize: [20, 20],
//     iconAnchor: [30, 40],
//   })
// );

const parseWeatherStationDetails = (data) => {
  console.log('parseWeatherStationDetails: ', data);
  return {
    timestamp: data.timestamp,
    name: data.name,
    airTemperature: data.airtemperature,
    roadTemperature: data.roadtemperature,
    rainType: data.raintype,
    roadCondition: data.roadcondition,
  };
};

export default class WeatherStationPopupContainer extends React.PureComponent {
  static contextTypes = {
    map: PropTypes.object.isRequired,
  };

  static propTypes = {
    stationId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    console.log('WeatherStationPopupContainer, constructor: ', this.props.stationId);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    console.log('WeatherStationPopupContainer, componentWillMount: ', this.props.stationId);
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweather_details.php?roadweatherid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateObjects(parseWeatherStationDetails(cleanResponse)))
    .catch(err => console.log(`Requesting road weather stations, error: ${err}`));
  }

  componentWillReceiveProps() {
    console.log('WeatherStationPopupContainer, componentWillReceiveProps: ', this.props.stationId);
  }

  shouldComponentUpdate() {
    console.log('WeatherStationPopupContainer, shouldComponentUpdate: ', this.props.stationId);
    return true;
  }

  updateObjects(data) {
    const newObj = [];

    newObj.push(
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <span className="header-primary">
              {data.name}
            </span>
            <div className="card-sub-header">
              {data.timestamp}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text no-padding no-margin">Ilman lämpötila: {data.airTemperature} °C</p>
          <p className="departure route-detail-text no-padding no-margin">Tien lämpötila: {data.roadTemperature} °C</p>
          <p className="departure route-detail-text no-padding no-margin">Sade: {data.rainType}</p>
          <p className="departure route-detail-text no-padding no-margin">Keli: {data.roadCondition}</p>
        </div>
      </Card>,
    );
    this.setState({ data: newObj });
  }

  render() {
    console.log('WeatherStationPopupContainer, render: ', this.props.stationId);
    if (!isBrowser) { return false; }

    if (this.state.data === null) {
      return (
        <p>Loading....</p>
      );
    }

    return (
      <div>{this.state.data}</div>
    );
  }
}
