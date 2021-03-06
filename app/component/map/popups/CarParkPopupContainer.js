import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseCarParkDetails = data => ({
  name: data.name,
  timestamp: data.timestamp,
  address: data.address,
  freeSpace: data.freespace,
  totalSpace: data.totalspace,
});

export default class CarParkPopupContainer extends React.Component {
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
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/parking/parking_details.php?parkingid=${this.props.id}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.setState({ data: (parseCarParkDetails(cleanResponse)) }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderObjects() {
    const data = this.state.data;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    let parkingIconClass = 'icon-blue';
    if (data.freeSpace && data.totalSpace) {
      if (Number(data.freeSpace) > 10) {
        parkingIconClass = 'icon-green';
      } else if (Number(data.freeSpace) === 0) {
        parkingIconClass = 'icon-red';
      } else {
        parkingIconClass = '';
      }
    }

    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="car-park-popup-icon"
                img="icon-icon_parking"
                className={parkingIconClass}
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'parking', defaultMessage: 'Parking' })}
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
          {data.freeSpace && data.totalSpace && <p className="departure route-detail-text no-padding no-margin">
            {this.context.intl.formatMessage({ id: 'parking-space', defaultMessage: 'Free parking space' })}: {data.freeSpace}/{data.totalSpace}
          </p>}
          <p className="departure route-detail-text no-padding no-margin">{data.address}</p>
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
