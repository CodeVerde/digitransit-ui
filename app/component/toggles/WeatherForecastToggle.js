import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';

import { isBrowser } from '../../util/browser';
import { getTextWithHeaders } from '../../util/xhrPromise';

// import Icon from '../Icon';
import ComponentUsageExample from '../ComponentUsageExample';

const parseWeatherXml = (rawData) => {
  const cleanData = [];
  const today = moment();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rawData, 'text/xml');
  const locationObj = xmlDoc.getElementsByTagName('location');
  const timeObjs = xmlDoc.getElementsByTagName('time');

  Array.from(timeObjs).every((element) => {
    if (moment(element.attributes[0].nodeValue).day() === today.day()) {
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

  console.log('cleanData: ', cleanData);
  return cleanData;
};

class WeatherForecastToggle extends React.Component {
  static contextTypes = {
    config: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showModal: true,
      weatherData: [],
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    getTextWithHeaders(this.context.config.weather.xml.url, null, {})
    .then(rawData => parseWeatherXml(rawData))
    .then(result => this.setState({ weatherData: result }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderWeatherRows() {
    const data = this.state.weatherData;
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
          {this.context.intl.formatMessage({ id: 'road-weather-air', defaultMessage: 'Air' })}
        </div>
      </div>,
    );

    data.forEach(element => (
      rows.push(
        <div className="row weather-popup-row" key={`weather-popup-row-${moment(element.forecastTime).format('HH')}`}>
          <div className="small-2 columns">
            {moment(element.forecastTime).format('HH:mm')}
          </div>
          <div className="small-2 columns">{element.forecastWeatherSymbol}</div>
          <div className="small-2 columns">{element.forecastTemperature} °C</div>
        </div>,
      )
    ));

    return rows;
  }

  renderObjects() {
    const data = this.state.weatherData;
    if (data.length === 0) {
      return (<div className="padding-small">{}</div>);
    }

    return (
      <div>
        <div className="weather-forecast-header">
          <div>
            <h2>
              <FormattedMessage id="weather-forecast" defaultMessage="Weather Forecast" /> {this.state.weatherData[0].forecastLocation}
            </h2>
          </div>
          <div className="weather-forecast-sub-header">
            {moment().format('D.M.YYYY')}
          </div>
        </div>
        <div>
          <div className="no-padding no-margin">
            {this.renderWeatherRows()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (
      <div className="" id="toggle-weather-forecast" key="toggle-weather-forecast">
        <div className={this.state.showModal ? 'map-utils-button active' : 'map-utils-button'} id="toggle-weather-forecast-button">
          <div className="weather-forecast-popup">
            <input type="checkbox" id="weather-forecast-checkbox-toggle" />
            <label htmlFor="weather-forecast-checkbox-toggle">
              <svg className="icon" viewBox="0 0 283.46 283.46">
                <use xlinkHref="#icon-icon_weather" />
              </svg>
              <FormattedMessage id="toggle-weather-forecast" defaultMessage="Sääennuste" />
            </label>
            {this.renderObjects()}
          </div>
        </div>
      </div>
    );
  }
}

// const toggleWeatherForecast = executeAction =>
//   () => executeAction(ToggleWeatherForecastState);
//
// const setWeatherForecast = (executeAction, state) => (
//   () => {
//     document.getElementById('weather-forecast-checkbox-toggle').checked = false;
//     executeAction(SetWeatherForecastState, state);
//   }
// );

// const modes = [
//   'weather-forecast-now',
//   'weather-forecast-30',
// ];

// const renderList = (trafficFluencyState, executeAction) => {
//   const items = [];
//   modes.forEach((element, index) => {
//     const iconClass = trafficFluencyState === index + 1 ? 'icon' : 'icon icon-not-selected';
//     items.push(
//       <li key={`weather-forecast-list-${element}`}>
//         <div role="button" htmlFor="SetWeatherForecast"
// onClick={setWeatherForecast(executeAction, index + 1)}>
//           <svg className={iconClass} viewBox="0 0 283.46 283.46">
//             <use xlinkHref="#icon-icon_check_1" />
//           </svg>
//           <FormattedMessage id={element} defaultMessage={`Fluency option ${index}`} />
//         </div>
//       </li>,
//     );
//   });
//
//   return (
//     <ul className="submenu">
//       {items}
//     </ul>
//   );
// };

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

// WeatherForecastToggle.propTypes = {
//   trafficFluencyState: PropTypes.number.isRequired,
// };
//
// WeatherForecastToggle.contextTypes = {
//   executeAction: PropTypes.func.isRequired,
// };

export default WeatherForecastToggle;
