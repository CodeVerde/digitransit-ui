import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import Icon from '../../Icon';
import Card from '../../Card';
import {
  parseBreaks,
  getEventIconName,
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
      extraInfo: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }

  renderInfoList() {
    const data = this.props.content;
    const extraInfo = [];

    if (data.extraInfo) {
      data.extraInfo.forEach((element) => {
        extraInfo.push(
          <li key={`event-popup-extra-info-${element.linkText}`}>
            <span className="oulu-popup-content route-detail-text no-padding no-margin">
              <a href={element.url}>{element.linkText}</a>
            </span>
          </li>,
        );
      });
    }

    return (
      <ul>
        <li>
          <span className="oulu-popup-content route-detail-text no-padding no-margin">
            <a href={data.infoLink}>Tapahtumasivut</a>
          </span>
        </li>
        { extraInfo }
        <li>
          <span className="oulu-popup-content route-detail-text no-padding no-margin">
            Paikka: {data.venueName}
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
              {}
              <Icon
                id="event-popup-icon"
                img={getEventIconName(data.tags)}
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
