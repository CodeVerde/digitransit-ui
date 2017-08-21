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
    .then(cleanResponse => this.updateObjects(parseBulletinDetails(cleanResponse)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  updateObjects(data) {
    const headerString = `${data.bulletinMainClass}, ${data.area}, ${data.bulletinMainReason}`;
    const endDateString = data.endDate ? `- ${data.endDate}` : 'toistaiseksi';
    const newObj = (
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
            <span className="header-primary">
              {headerString}
            </span>
            <div className="card-sub-header">
              Kesto: {data.startDate} {endDateString}
            </div>
          </div>
        </div>
        <div>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.information}</p>
          <p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Lisätiedot:</p>
          <ul>
            {data.bulletinAdditionalReason1 && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">{data.bulletinAdditionalReason1}</p></li>}
            {data.speedLimit && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Nopeusrajoitus: {data.speedLimit}</p></li>}
            {data.severity && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Haitta-aste: {data.severity}</p></li>}
            {data.detour && <li><p className="oulu-card-content oulu-card-detail-text no-padding no-margin">Kiertotie: Kyllä</p></li>}
          </ul>
          {data.imageLink && <img src={data.imageLink} alt={headerString} width="100%" />}
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
