import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { weatherStationMarkerData, weatherStationDetailsData } from './WeatherStationMarkerData';

import Card from '../Card';
import CardHeader from '../CardHeader';
import MarkerPopupBottom from './MarkerPopupBottom';

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


const parseWeatherStationMessage = (data) => {
  const cleanData = [];
  data.weatherstation.forEach((element) => {
    cleanData.push({
      id: `weather-station-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
    });
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
  };

  static propTypes = {
    showWeatherStations: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.objs = null;
  }

  // <p><strong>{weatherStationDetailsData.name}</strong><br />
  //   {weatherStationDetailsData.timestamp}<br />
  //   {weatherStationDetailsData.airtemperature}<br />
  //   {weatherStationDetailsData.roadtemperature}<br />
  //   {weatherStationDetailsData.raintype}<br />
  //   {weatherStationDetailsData.roadcondition}</p>

  componentWillMount() {
    this.data = parseWeatherStationMessage(weatherStationMarkerData);
    this.objs = [];
    this.data.forEach((element) => {
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getWeatherStationMarkerIcon()}
          title={element.name}
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
                    {weatherStationDetailsData.name}
                  </span>
                  <div className="card-sub-header">
                    {weatherStationDetailsData.timestamp}
                  </div>
                </div>
              </div>
              <div>
                <p className="departure route-detail-text no-padding no-margin">Ilman lämpötila: {weatherStationDetailsData.airtemperature} °C</p>
                <p className="departure route-detail-text no-padding no-margin">Tien lämpötila: {weatherStationDetailsData.roadtemperature} °C</p>
                <p className="departure route-detail-text no-padding no-margin">Sade: {weatherStationDetailsData.raintype}</p>
                <p className="departure route-detail-text no-padding no-margin">Keli: {weatherStationDetailsData.roadcondition}</p>
              </div>
            </Card>
          </Popup>
        </Marker>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showWeatherStations) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(WeatherStationMarkerContainer, ['SimpleModeStore'], context => ({
  showWeatherStations: context.getStore('MapSelectionsStore').getWeatherStationsState(),
}));
