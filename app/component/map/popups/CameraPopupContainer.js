import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';

import Card from '../../Card';

const parseCameraDetails = (data) => {
  const cleanData = [];

  if (!data || !data.weathercameraimage) { return cleanData; }

  data.weathercameraimage.forEach((element) => {
    cleanData.push({
      name: element.name,
      timestamp: element.timestamp,
      image: element.image,
    });
  });

  return cleanData;
};

export default class CameraPopupContainer extends React.Component {
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
    const url = `https://it101.infotripla.fi/city_app_traffic_data_rest_api/weathercamera/weathercamera_details.php?weathercameraid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateObjects(parseCameraDetails(cleanResponse)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Card className="padding-small">
          <div className="card-header">
            <div className="card-header-wrapper">
              <span className="header-primary">
                {element.name}
              </span>
              <div className="card-sub-header">
                {element.timestamp}
              </div>
            </div>
          </div>
          <div>
            <img
              src={element.image}
              alt={element.name}
            />
          </div>
        </Card>,
      );
    });
    this.setState({ popupContent: newObjs });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.state.popupContent === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (<div>{this.state.popupContent[0]}</div>);
  }
}
