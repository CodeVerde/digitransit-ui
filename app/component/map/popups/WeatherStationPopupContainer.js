import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseWeatherStationDetails = data => ({
  timestamp: data.timestamp,
  name: data.name,
  airTemperature: data.airtemperature,
  roadTemperature: data.roadtemperature,
  rainType: data.raintype,
  roadCondition: data.roadcondition,
});

export default class WeatherStationPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    loading: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweather_details.php?roadweatherid=${this.props.id}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.setState({ data: (parseWeatherStationDetails(cleanResponse)) }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderObjects() {
    const data = this.state.data;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="car-monitor-popup-icon"
                img="icon-icon_tiesaa_marker"
                className="icon-blue"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'road-weather', defaultMessage: 'Road weather' })}
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
            {this.context.intl.formatMessage({ id: 'temperature-air', defaultMessage: 'Air temperature' })}: {data.airTemperature} °C
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'temperature-road', defaultMessage: 'Road temperature' })}: {data.roadTemperature} °C
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'weather-air', defaultMessage: 'Rain' })}: {data.rainType}
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'weather-road', defaultMessage: 'Weather' })}: {data.roadCondition}
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
