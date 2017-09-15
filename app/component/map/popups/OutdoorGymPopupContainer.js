import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import Icon from '../../Icon';
import Card from '../../Card';
import {
  parseBreaks,
} from '../../../util/ouluUtils';

export default class OutdoorGymPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    loading: PropTypes.func.isRequired,
    content: PropTypes.shape({
      name: PropTypes.string.isRequired,
      infoLink: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }).isRequired,
  }

  renderInfoList() {
    const data = this.props.content;

    return (
      <ul>
        <li>
          <span className="oulu-popup-content route-detail-text no-padding no-margin">
            <a href={data.infoLink} target="_blank" rel="noreferrer noopener">
              {this.context.intl.formatMessage({ id: 'destination-pages', defaultMessage: 'Destination pages' })}
            </a>
          </span>
        </li>
      </ul>
    );
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
                id="event-popup-icon"
                img="icon-outdoor-gym"
                className="icon-green"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'outdoor-gym', defaultMessage: 'Outdoor gym' })}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {data.name}
            </span>
            <div className="card-sub-header">
              {data.startDate} - {data.endDate}
            </div>
          </div>
        </div>
        <div>
          <p className="oulu-popup-content route-detail-text">
            {parseBreaks(data.description)}
          </p>
          <p className="oulu-popup-content route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'extra-info', defaultMessage: 'Extra info' })}:
          </p>
          {this.renderInfoList()}
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
