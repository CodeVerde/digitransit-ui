import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson, parseBreaks } from '../../../util/ouluUtils';

import Card from '../../Card';

const parseIncidentDetails = data => ({
  area: data.area,
  detour: data.detour,
  detourGeometry: data.detour_encoded_linear_geom,
  information: parseBreaks(data.information),
  // information: data.information,
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
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incident_details.php?noticeid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateObjects(parseIncidentDetails(cleanResponse)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  updateObjects(data) {
    const newObj = (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <span className="header-primary">
              {`${data.incidentMainClass}, ${data.area}, ${data.incidentMainReason}`}
            </span>
            <div className="card-sub-header">
              Kesto: {data.startDate} - {data.endDate}
            </div>
          </div>
        </div>
        <div>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.information}</p>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Lisätiedot:</p>
          <ul>
            {data.incidentAdditionalReason1 && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.incidentAdditionalReason1}</p></li>}
            {data.speedLimit && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Nopeusrajoitus: {data.speedLimit}</p></li>}
            <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Haitta-aste: {data.severity}</p></li>
            {data.detour && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Kiertotie: Kyllä</p></li>}
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
