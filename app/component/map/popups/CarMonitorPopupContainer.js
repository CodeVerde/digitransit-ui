import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';

import Card from '../../Card';

const parseCarMonitorDetails = data => ({
  name: data.name,
  timestamp: data.timestamp,
  averageSpeed1: data.averagespeed1,
  averageSpeed2: data.averagespeed2,
  trafficAmount1: data.trafficamount1,
  trafficAmount2: data.trafficamount2,
});

export default class CarMonitorPopupContainer extends React.Component {
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
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/lam/lam_details.php?lamid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateObjects(parseCarMonitorDetails(cleanResponse)))
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
          <p className="departure route-detail-text no-padding no-margin">Keskinopeudet:</p>
          <ul>
            <li><p className="departure route-detail-text no-padding no-margin">Pohjoiseen: {data.averageSpeed1}</p></li>
            <li><p className="departure route-detail-text no-padding no-margin">Etelään: {data.averageSpeed2}</p></li>
          </ul>
          <p className="departure route-detail-text no-padding no-margin">Liikennemäärät:</p>
          <ul>
            <li><p className="departure route-detail-text no-padding no-margin">Pohjoiseen: {data.trafficAmount1}</p></li>
            <li><p className="departure route-detail-text no-padding no-margin">Etelään: {data.trafficAmount2}</p></li>
          </ul>
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
