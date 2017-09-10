import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { isBrowser } from '../../../util/browser';
import RoadConditionLine from './RoadConditionLine';
// import roadConditionData from './RoadConditionData';
import { AddRoadConditionsData } from '../../../action/mapSelectionsActions';

const parseRoadConditionMessage = (data) => {
  const cleanData = [];

  if (!data || !data.roadcondition) { return cleanData; }

  data.roadcondition.forEach((element) => {
    const roadGeom = [];
    element.road_geom.coordinates.forEach((coordSet) => {
      coordSet.forEach((coord) => {
        roadGeom.push({ lat: coord[1], lon: coord[0] });
      });
    });

    cleanData.push({
      id: element.road_id,
      geometry: roadGeom,
      forecasts: [
        {
          forecastColor: element.currentObservation.currentColor,
          forecastOpacity: element.currentObservation.currentOpacity,
          forecastWidth: element.currentObservation.currentWidth,
        },
        element.forecast2h,
        element.forecast4h,
        element.forecast6h,
        element.forecast12h,
      ],
    });
  });

  return cleanData;
};

class RoadConditionLineContainer extends React.Component {
  static contextTypes = {
    config: PropTypes.object.isRequired,
    getStore: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    roadConditionsState: PropTypes.number.isRequired,
    roadConditionsData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      geometry: PropTypes.arrayOf(PropTypes.object),
      forecasts: PropTypes.arrayOf(PropTypes.object),
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.roadConditionsData.length) {
      this.updateObjects(this.props.roadConditionsData);
    } else if (this.props.roadConditionsState) {
      this.context.executeAction(
        AddRoadConditionsData,
        parseRoadConditionMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.roadConditionsState && !this.props.roadConditionsState) {
      this.context.executeAction(
        AddRoadConditionsData,
        parseRoadConditionMessage,
      );
    } else if (this.objs.length !== newProps.roadConditionsData.length) {
      this.updateObjects(newProps.roadConditionsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    const forecastIndex = Math.max(0, this.props.roadConditionsState - 1);
    data.forEach((element) => {
      newObjs.push(
        <RoadConditionLine
          key={element.id}
          lineKey={element.id}
          geometry={element.geometry}
          color={element.forecasts[forecastIndex].forecastColor}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.roadConditionsState) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(RoadConditionLineContainer, ['MapSelectionsStore'], context => ({
  roadConditionsState: context.getStore('MapSelectionsStore').getRoadConditionsState(),
  roadConditionsData: context.getStore('MapSelectionsStore').getRoadConditionsData(),
}));
