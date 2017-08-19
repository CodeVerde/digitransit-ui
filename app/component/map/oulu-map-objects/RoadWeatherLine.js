import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { isBrowser } from '../../../util/browser';

let Polyline;

/* eslint-disable global-require */
if (isBrowser) {
  Polyline = require('react-leaflet/lib/Polyline').default;
}
/* eslint-enable global-require */

export default class Line extends React.Component {
  static propTypes = {
    geometry: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
  }

  static contextTypes = {
    config: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    this.line.leafletElement.bringToFront();
  }

  render() {
    const className = cx(['car']);

    let filteredPoints;
    if (this.props.geometry) {
      filteredPoints =
        this.props.geometry.filter(point => point.lat !== null && point.lon !== null);
    }

    const lineConfig = this.context.config.map.line;
    const legWeight = lineConfig.leg.weight;

    return (
      <div style={{ display: 'none' }}>
        <Polyline
          key="line"
          ref={(el) => { this.line = el; }}
          positions={filteredPoints}
          className={`leg ${className}`}
          color={this.props.color}
          weight={legWeight}
          interactive={false}
        />
      </div>
    );
  }
}
