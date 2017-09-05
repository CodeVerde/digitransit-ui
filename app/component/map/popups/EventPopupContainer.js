import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import Icon from '../../Icon';
import Card from '../../Card';
import {
  parseBreaks,
} from '../../../util/ouluUtils';

export default class EventPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    loading: PropTypes.func.isRequired,
    content: PropTypes.shape({
      venueName: PropTypes.string.isRequired,
      infoLink: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fluencyText: PropTypes.string.isRequired,
      geometry: PropTypes.arrayOf(PropTypes.number).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
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
                id="event-popup-icon"
                img="icon-icon_boat-withoutBox"
                className="oulu-popup-icon"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                Tapahtuma
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {data.name}
            </span>
            <div className="card-sub-header">
              {data.startDate}
              {data.endDate !== data.startDate && ` - ${data.endDate}`}
              {data.startTime && ` ${data.startTime}`}
              {data.endTime && ` - ${data.endTime}`}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text">
            {parseBreaks(data.description)}
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'extra-info', defaultMessage: 'Extra info' })}:
          </p>
          <ul>
            <li>
              <span className="departure route-detail-text no-padding no-margin">
                Paikka: {data.venueName}
              </span>
            </li>
            <li>
              <span className="departure route-detail-text no-padding no-margin">
                <a href={data.infoLink}>Tapahtumasivut</a>
              </span>
            </li>
          </ul>
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
