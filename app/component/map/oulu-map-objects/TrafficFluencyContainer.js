import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

import { isBrowser } from '../../../util/browser';
import { AddTrafficFluencyData } from '../../../action/mapSelectionsActions';


let Polyline;

if (isBrowser) {
  /* eslint-disable global-require */
  Polyline = require('react-leaflet/lib/Polyline').default;
  /* eslint-enable global-require */
}


const parseTrafficFluencyMessage = (data) => {
  const cleanData = [];

  if (!data || !data.fluencyline) { return cleanData; }

  data.fluencyline.forEach((element) => {
    cleanData.push({
      id: `traffic-fluency-marker-${element.id}`,
      encodedGeometry: element.encoded_geom,
      color: element.color,
      opacity: element.opacity,
      name: element.name,
      description: element.description,
      timestamp: element.timestamp,
      fluencyText: element.fluency_text,
    });
  });

  return cleanData;
};

class TrafficFluencyContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    trafficFluencyState: PropTypes.number.isRequired,
    trafficFluencyData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      encodedGeometry: PropTypes.string,
      color: PropTypes.string,
      opacity: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      timestamp: PropTypes.string,
      fluencyText: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    if (this.objs.length !== this.props.trafficFluencyData.length) {
      this.updateObjects(this.props.trafficFluencyData);
    } else if (this.props.trafficFluencyState) {
      this.context.executeAction(
        AddTrafficFluencyData,
        parseTrafficFluencyMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trafficFluencyState && !this.props.trafficFluencyState) {
      this.context.executeAction(
        AddTrafficFluencyData,
        parseTrafficFluencyMessage,
      );
    } else if (this.objs.length !== newProps.trafficFluencyData.length) {
      this.updateObjects(newProps.trafficFluencyData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Polyline
          key={`${element.id}-poly`}
          positions={polyline.decode(element.encodedGeometry)}
          color={element.color}
          interactive={false}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.trafficFluencyState) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(TrafficFluencyContainer, ['MapSelectionsStore'], context => ({
  trafficFluencyState: context.getStore('MapSelectionsStore').getTrafficFluencyState(),
  trafficFluencyData: context.getStore('MapSelectionsStore').getTrafficFluencyData(),
}));
