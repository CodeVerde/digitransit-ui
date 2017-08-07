// import PropTypes from 'prop-types';
import React from 'react';
// import connectToStores from 'fluxible-addons-react/connectToStores';
// import withReducer from 'recompose/withReducer';
// import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

// import ComponentUsageExample from '../ComponentUsageExample';
// import Map from './Map';
// import ToggleMapTracking from '../ToggleMapTracking';
// import VehicleMarkerContainer from './VehicleMarkerContainer';
import RoadWeatherLineContainer from './RoadWeatherLineContainer';
import WeatherStationMarkerContainer from './WeatherStationMarkerContainer';


const OuluMapObjects = [
  <WeatherStationMarkerContainer
    key="weather-stations"
  />,
  <RoadWeatherLineContainer
    key="road-weather"
  />,
];

export default OuluMapObjects;
