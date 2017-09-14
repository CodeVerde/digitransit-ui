import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import Icon from '../../Icon';
import Card from '../../Card';

export default class TrafficFluencyPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    loading: PropTypes.func.isRequired,
    content: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      fluencyText: PropTypes.string.isRequired,
    }).isRequired,
  }

  renderObjects() {
    const data = this.props.content;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="traffic-fluency-popup-icon"
                img="icon-icon_congestation_1"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'traffic-fluency', defaultMessage: 'Congestion' })}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {data.name}
            </span>
            <div className="card-sub-header">
              {data.timestamp}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text no-padding no-margin">
            {data.description}
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {data.fluencyText}
          </p>
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
