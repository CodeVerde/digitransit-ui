import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders, getTextWithHeaders } from '../../../util/xhrPromise';
import {
  cleanJson,
  parseBreaks,
} from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseIncidentDetails = data => ({
  area: data.area,
  detour: data.detour,
  detourGeometry: data.detour_encoded_linear_geom,
  information: parseBreaks(data.information),
  incidentMainClass: data.incidentmainclass,
  incidentMainReason: data.incidentmainreason,
  incidentAdditionalReason1: data.incidentdditionalreason1,
  severity: data.severity,
  speedLimit: data.speedlimit,
  startDate: data.startdate,
  endDate: data.enddate,
  imageLink: data.uploaded_image_http_link,
});

export default class IncidentPopupContainer extends React.Component {
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
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };

    // Complete hack, it seems incidents from livi use big numbers
    // as id consistently (at the moment)
    if (Number(this.props.id) < 1000000) {
      const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incident_details.php?noticeid=${this.props.id}`;
      getJsonWithHeaders(url, null, headers)
      .then(response => cleanJson(response))
      .then(cleanResponse => this.setState({ data: (parseIncidentDetails(cleanResponse)) }))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
    } else {
      const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incident_details.php?noticeid=${this.props.id}`;
      getTextWithHeaders(url, null, headers)
      .then(textResponse => this.setState({ data: textResponse }))
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
    }
  }

  renderObjects() {
    const data = this.state.data;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    if (typeof data === 'string') {
      // The content from LiVi API comes as preformatted html text
      return (
        <Card className="padding-small">
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </Card>
      );
    }
    const endDateString = data.endDate ? `- ${data.endDate}` : this.context.intl.formatMessage({ id: 'for-now', defaultMessage: 'For now' });
    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="bulletin-popup-icon"
                img={data.incidentMainClass === 'Tietyö' ? 'icon-icon_roadwork_1' : 'icon-icon_caution'}
                className="oulu-popup-icon"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {data.incidentMainClass}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {`${data.incidentMainClass}, ${data.area}, ${data.incidentMainReason}`}
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
            {data.incidentAdditionalReason1 && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.incidentAdditionalReason1}</p></li>}
            {data.speedLimit && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'speed-limit', defaultMessage: 'Speed limit' })}: {data.speedLimit}</p></li>}
            <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'severity', defaultMessage: 'Severity' })}: {data.severity}</p></li>
            {data.detour && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{this.context.intl.formatMessage({ id: 'detour', defaultMessage: 'Detour' })}: {this.context.intl.formatMessage({ id: 'yes', defaultMessage: 'Yes' })}</p></li>}
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
