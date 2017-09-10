import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { isBrowser } from '../../util/browser';
import { getTextWithHeaders } from '../../util/xhrPromise';
import { mapYrWeatherIcon } from '../../util/weatherIconMapper';

import { ToggleWeatherForecastState } from '../../action/mapSelectionsActions';

import Icon from '../Icon';
import ComponentUsageExample from '../ComponentUsageExample';

const toggleWeatherForecast = executeAction =>
  () => executeAction(ToggleWeatherForecastState);

const parseWeatherXml = (rawData) => {
  const cleanData = [];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rawData, 'text/xml');
  const locationObj = xmlDoc.getElementsByTagName('location');
  const timeObjs = xmlDoc.getElementsByTagName('time');

  Array.from(timeObjs).every((element, index) => {
    if (index < 4) {
      cleanData.push({
        forecastLocation: locationObj[0].childNodes[1].innerHTML,
        forecastTime: moment(element.attributes[0].nodeValue),
        forecastWeatherSymbol: element.childNodes[3].attributes[0].nodeValue,
        forecastTemperature: element.childNodes[13].attributes[1].nodeValue,
      });
      return true;
    }
    return false;
  });

  // console.log('cleanData: ', cleanData);
  return cleanData;
};

class WeatherForecastToggle extends React.Component {
  static propTypes = {
    showWeatherForecast: PropTypes.bool.isRequired,
  }
  static contextTypes = {
    config: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      weatherData: [],
    };
  }

  componentWillMount() {
    const customHeaders = {
      pragma: 'no-cache',
      'cache-control': 'no-cache',
    };

    getTextWithHeaders(this.context.config.weather.xml.url, null, customHeaders)
    .then(rawData => parseWeatherXml(rawData))
    .then(result => this.setState({ weatherData: result }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderWeatherRows() {
    const data = this.state.weatherData;
    const rows = [];
    // rows.push(
    //   <div className="row weather-popup-row" key="oulu-weather-popup-heading">
    //     <div className="small-5 columns">
    //       {this.context.intl.formatMessage({ id: 'road-weather-time', defaultMessage: 'Time' })}
    //     </div>
    //     <div className="small-4 columns">
    //       {this.context.intl.formatMessage({ id: 'weather', defaultMessage: 'Weather' })}
    //     </div>
    //     <div className="small-3 columns">
    //       {this.context.intl.formatMessage({ id: 'weather-temperature', defaultMessage: 'Temperature' })}
    //     </div>
    //   </div>,
    // );

    const today = moment();
    const extraDayText = this.context.intl.formatMessage({ id: 'next-day-text', defaultMessage: 'Time' });

    data.forEach((element) => {
      const extraDay = moment(element.forecastTime).day() !== today.day() ? extraDayText : '';
      rows.push(
        <div className="row weather-popup-row" key={`weather-popup-row-${moment(element.forecastTime).format('HH')}`}>
          <div className="small-5 columns">
            {moment(element.forecastTime).format('HH:mm')}{extraDay}
          </div>
          <div className="small-4 columns">
            <Icon
              id="weather-forecast-icon"
              img={mapYrWeatherIcon(element.forecastWeatherSymbol)}
            />
          </div>
          <div className="small-3 columns">{element.forecastTemperature} °C</div>
        </div>,
      );
    });

    return rows;
  }

  renderObjects() {
    const data = this.state.weatherData;
    if (data.length === 0) {
      return (<div className="padding-small">{}</div>);
    }

    const city = this.state.weatherData[0].forecastLocation;

    return (
      <div style={{ width: '180px' }}>
        <div className="weather-forecast-header">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <FormattedMessage
              id="weather-forecast"
              values={{ city }}
              defaultMessage="Weather Forecast {city}"
            />
            <button
              className="close-button cursor-pointer"
              onClick={toggleWeatherForecast(this.context.executeAction)}
            >
              <Icon
                id="weather-forecast-icon"
                img="icon-icon_close"
              />
            </button>
          </div>
          <div className="weather-forecast-sub-header">
            {moment().format('DD.MM.YYYY')}
          </div>
        </div>
        <div>
          <div className="no-padding no-margin">
            {this.renderWeatherRows()}
          </div>
        </div>
        <div className="weather-forecast-footer">
          <FormattedMessage
            id="weather-forecast-provider"
            values={{ city }}
            defaultMessage="Weather forecast provided by "
          />
          <a href="http://www.yr.no/place/Finland/Oulu/Oulu/">yr.no</a>
        </div>
      </div>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (
      <div className="" id="toggle-weather-forecast-container" key="toggle-weather-forecast-container">
        <div className={this.props.showWeatherForecast ? 'map-utils-button active' : 'map-utils-button'} id="toggle-weather-forecast-button">
          <div className={this.props.showWeatherForecast ? 'weather-forecast-popup active' : 'weather-forecast-popup'}>
            <button onClick={toggleWeatherForecast(this.context.executeAction)}>
              <label htmlFor="weather-forecast-checkbox-toggle">
                <svg className="icon" viewBox="0 0 283.46 283.46">
                  <use xlinkHref="#weather-icon-d000" />
                </svg>
                <FormattedMessage id="toggle-weather-forecast" defaultMessage="Weather forecast" />
              </label>
            </button>
            {this.renderObjects()}
          </div>
        </div>
      </div>
    );
  }
}

WeatherForecastToggle.displayName = 'WeatherForecastToggle';

WeatherForecastToggle.description = () => (
  <div>
    <p>
      Bus lines layer toggling component
    </p>
    <ComponentUsageExample description="">
      <div style={{ width: '200px', background: 'rgb(51, 51, 51)' }}>
        <WeatherForecastToggle />
      </div>
    </ComponentUsageExample>
  </div>);

export default connectToStores(WeatherForecastToggle, ['MapSelectionsStore'], context => ({
  showWeatherForecast: context.getStore('MapSelectionsStore').getWeatherForecastState(),
}));
