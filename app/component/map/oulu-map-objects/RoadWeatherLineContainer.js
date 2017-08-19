import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */

import React from 'react';

import connectToStores from 'fluxible-addons-react/connectToStores';

import RoadWeatherLine from './RoadWeatherLine';
import { isBrowser } from '../../../util/browser';
import roadWeatherData from './RoadWeatherData';

const parseRoadWeatherMessage = (data) => {
  const cleanData = [];
  data.roadcondition.forEach((element) => {
    const roadGeom = [];
    element.road_geom.coordinates[0].forEach((coord) => {
      roadGeom.push({ lat: coord[1], lon: coord[0] });
    });

    cleanData.push({
      roadId: element.road_id,
      geometry: roadGeom,
      forecast0h: element.currentObservation,
      forecast2h: element.forecast2h,
      forecast4h: element.forecast4h,
      forecast6h: element.forecast6h,
      forecast12h: element.forecast12h,
    });
  });

  return cleanData;
};

class RoadWeatherLineContainer extends React.Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      roadData: null,
    };
  }

  componentWillMount() {
    this.roadData = parseRoadWeatherMessage(roadWeatherData);
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.roadData === null || !this.props.showRoadWeather) { return false; }

    const objs = [];

    this.roadData.forEach((element) => {
      objs.push(
        <RoadWeatherLine
          key={element.roadId}
          geometry={element.geometry}
          color={element.forecast0h.currentColor}
        />);
    });

    return (<div style={{ display: 'none' }}>{objs}</div>);
  }
}

RoadWeatherLineContainer.propTypes = {
  showRoadWeather: PropTypes.bool.isRequired,
};

RoadWeatherLineContainer.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default connectToStores(RoadWeatherLineContainer, ['SimpleModeStore'], context => ({
  showRoadWeather: context.getStore('MapSelectionsStore').getRoadWeatherState(),
}));
