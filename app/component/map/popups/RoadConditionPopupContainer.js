import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
import { mapForecaWeatherIcon } from '../../../util/weatherIconMapper';
import Icon from '../../Icon';
import Card from '../../Card';

const parseRoadConditionDetails = data => ({
  name: data.road_name,
  number: data.road_number,
  timestamp: data.currentObservation.timestamp,
  forecasts: [
    {
      forecastAirTemp: data.currentObservation.observationAirTemp,
      forecastColor: data.currentObservation.observationColor,
      forecastConditionSymbol: data.currentObservation.observationConditionSymbol,
      forecastOpacity: data.currentObservation.observationOpacity,
      forecastRoadTemp: data.currentObservation.observationRoadTemp,
      forecastWeatherSymbol: data.currentObservation.observationWeatherSymbol,
      forecastWidth: data.currentObservation.observationWidth,
      forecastWindDirectionSymbol: data.currentObservation.observationWindDirectionSymbol,
      forecastWindSpeed: data.currentObservation.observationWindSpeed,
    },
    data.forecast2h,
    data.forecast4h,
    data.forecast6h,
    data.forecast12h,
  ],
});

const forecastTexts = [
  'road-conditions-now',
  'road-conditions-2hour',
  'road-conditions-4hour',
  'road-conditions-6hour',
  'road-conditions-12hour',
];

export default class RoadConditionPopupContainer extends React.Component {
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
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadcondition/roadcondition_details.php?roadid=${this.props.id}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.setState({ data: (parseRoadConditionDetails(cleanResponse)) }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderWeatherRows() {
    const data = this.state.data;
    const rows = [];
    rows.push(
      <div className="row weather-popup-row" key="oulu-weather-popup-heading">
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-time', defaultMessage: 'Time' })}
        </div>
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-weather', defaultMessage: 'Weather' })}
        </div>
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-wind', defaultMessage: 'Wind' })}
        </div>
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-air', defaultMessage: 'Air' })}
        </div>
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-road', defaultMessage: 'Road' })}
        </div>
        <div className="small-2 columns">
          {this.context.intl.formatMessage({ id: 'road-weather-condition', defaultMessage: 'Condition' })}
        </div>
      </div>,
    );

    data.forecasts.forEach((element, index) => {
      let conditionClass;
      let conditionText;

      switch (element.forecastConditionSymbol) {
        case 'keli_green.png':
          conditionClass = 'condition-green';
          conditionText = 'Hyvä';
          break;
        case 'keli_red.png':
          conditionClass = 'condition-red';
          conditionText = 'Huono';
          break;
        case 'keli_yellow.png':
          conditionClass = 'condition-yellow';
          conditionText = 'Välttävä';
          break;
        default:
          conditionClass = 'condition-yellow';
          conditionText = 'Epävarma';
          break;
      }

      const windDirection = Number(element.forecastWindDirectionSymbol.split('.')[0]);
      const windInDegrees = (windDirection * 45) - 90;

      rows.push(
        <div className="row weather-popup-row" key={forecastTexts[index]}>
          <div className="small-2 columns">
            {this.context.intl.formatMessage({ id: forecastTexts[index], defaultMessage: 'Now' })}
          </div>
          <div className="small-2 columns">
            <Icon
              id="road-condition-popup-icon"
              img={mapForecaWeatherIcon(element.forecastWeatherSymbol)}
            />
          </div>
          <div className="small-2 columns">
            <div>{element.forecastWindSpeed} m/s</div>
            <div>
              <svg
                id="road-condition-wind-icon"
                viewBox="0 0 283.46 283.46"
                className="wind-direction-icon"
              >
                <use
                  xlinkHref="#wind-direction-arrow-1"
                  transform={`rotate(${windInDegrees} ${283.46 / 2} ${283.46 / 2})`}
                />
              </svg>
            </div>
          </div>
          <div className="small-2 columns">{element.forecastAirTemp} °C</div>
          <div className="small-2 columns">{element.forecastRoadTemp} °C</div>
          <div className={`small-2 columns ${conditionClass}`}>{conditionText}</div>
        </div>,
      );
    });
    return rows;
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
                id="road-condition-popup-icon"
                img="icon-icon_tiesaa_marker"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'road-weather', defaultMessage: 'Road weather' })}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {this.context.intl.formatMessage({ id: 'road', defaultMessage: 'Road' }, data)}
            </span>
            <div className="card-sub-header">
              {data.timestamp}
            </div>
          </div>
        </div>
        <div>
          <div className="no-padding no-margin">
            {this.renderWeatherRows()}
          </div>
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
