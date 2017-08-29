import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson, parseBreaks } from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseBulletinDetails = data => ({
  area: data.area,
  detour: data.detour,
  detourGeometry: data.detour_encoded_linear_geom,
  information: parseBreaks(data.information),
  bulletinMainClass: data.incidentmainclass,
  bulletinMainReason: data.incidentmainreason,
  bulletinAdditionalReason1: data.incidentadditionalreason1,
  severity: data.severity,
  speedLimit: data.speedlimit,
  startDate: data.startdate,
  endDate: data.enddate,
  imageLink: data.uploaded_image_http_link,
});

export default class BulletinPopupContainer extends React.Component {
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
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incident_details.php?noticeid=${this.props.id}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then((cleanResponse) => {
      this.setState({ data: (parseBulletinDetails(cleanResponse)) });
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderObjects() {
    const data = this.state.data;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    const headerString = `${data.bulletinMainClass}, ${data.area}, ${data.bulletinMainReason}`;
    const endDateString = data.endDate ? `- ${data.endDate}` : this.context.intl.formatMessage({ id: 'for-now', defaultMessage: 'For now' });
    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="bulletin-popup-icon"
                img={data.bulletinMainClass === 'Tietyö' ? 'icon-icon_roadwork_1' : 'icon-icon_caution'}
                className="oulu-popup-icon"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {data.bulletinMainClass}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {headerString}
            </span>
            <div className="card-sub-header">
              {this.context.intl.formatMessage({ id: 'duration', defaultMessage: 'Duration' })}: {data.startDate} {endDateString}
            </div>
          </div>
        </div>
        <div>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.information}</p>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'extra-info', defaultMessage: 'Extra info' })}:</p>
          <ul>
            {data.bulletinAdditionalReason1 && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.bulletinAdditionalReason1}</p></li>}
            {data.speedLimit && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'speed-limit', defaultMessage: 'Speed limit' })}: {data.speedLimit}</p></li>}
            {data.severity && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'severity', defaultMessage: 'Severity' })}: {data.severity}</p></li>}
            {data.detour && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'detour', defaultMessage: 'Detour' })}: {this.context.intl.formatMessage({ id: 'yes', defaultMessage: 'Yes' })}</p></li>}
          </ul>
          {data.imageLink && <img src={data.imageLink} alt={headerString} width="100%" />}
        </div>
      </Card>
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
