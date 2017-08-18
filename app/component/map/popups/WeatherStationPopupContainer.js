import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
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
    stationId: PropTypes.string.isRequired,
    loading: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      popupContent: null,
    };
  }

  componentWillMount() {
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweather_details.php?roadweatherid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateObjects(parseWeatherStationDetails(cleanResponse)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  updateObjects(data) {
    const newObj = (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <span className="header-primary">
              {data.name}
            </span>
            <div className="card-sub-header">
              {data.timestamp}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text no-padding no-margin">Ilman lämpötila: {data.airTemperature} °C</p>
          <p className="departure route-detail-text no-padding no-margin">Tien lämpötila: {data.roadTemperature} °C</p>
          <p className="departure route-detail-text no-padding no-margin">Sade: {data.rainType}</p>
          <p className="departure route-detail-text no-padding no-margin">Keli: {data.roadCondition}</p>
        </div>
      </Card>
    );
    this.setState({ popupContent: newObj });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.state.popupContent === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (<div>{this.state.popupContent}</div>);
  }
}
