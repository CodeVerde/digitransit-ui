import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseCameraDetails = (data) => {
  const cleanData = [];

  if (!data || !data.weathercameraimage) { return cleanData; }

  if (Array.isArray(data.weathercameraimage)) {
    data.weathercameraimage.forEach((element) => {
      cleanData.push({
        name: element.name,
        timestamp: element.timestamp,
        image: element.image,
      });
    });
  } else {
    cleanData.push({
      name: data.weathercameraimage.name,
      timestamp: data.weathercameraimage.timestamp,
      image: data.weathercameraimage.image,
    });
  }

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

    this.data = [];
    this.slideIndex = 0;

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.currentSlide = this.currentSlide.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateObjects = this.updateObjects.bind(this);
  }

  componentWillMount() {
    const url = `https://it101.infotripla.fi/city_app_traffic_data_rest_api/weathercamera/weathercamera_details.php?weathercameraid=${this.props.stationId}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.updateData(parseCameraDetails(cleanResponse)))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  prevSlide() {
    this.slideIndex -= 1;
    this.updateObjects();
  }

  nextSlide() {
    this.slideIndex += 1;
    this.updateObjects();
  }

  currentSlide(newIndex) {
    this.slideIndex = newIndex;
    this.updateObjects();
  }

  updateData(newData) {
    if (newData.length === 0) { return; }

    this.data = newData;
    this.updateObjects();
  }

  updateObjects() {
    let newObjs = {};

    if (this.data.length === 0) { return; }

    this.slideIndex = this.slideIndex % this.data.length;
    if (this.slideIndex < 0) { this.slideIndex = this.data.length - 1; }

    const imageItems = [];
    const dotItems = [];
    this.data.forEach((element, index) => {
      const displayMode = index === this.slideIndex ? 'block' : 'none';
      const dotClass = index === this.slideIndex ? 'slideshow-dot slideshow-active' : 'slideshow-dot';
      const indexNum = index + 1;
      imageItems.push(
        <div className="slideshow-mySlides slideshow-fade" key={`traffic-camera-image-${indexNum}`} style={{ display: displayMode }} >
          <div className="slideshow-numbertext">{indexNum} / {this.data.length}</div>
          <img src={element.image} alt={element.name} width="100%" />
        </div>);

      dotItems.push(
        <span className={dotClass} onClick={() => this.currentSlide(index)} key={`traffic-camera-dots-${indexNum}`} />,
      );
    });

    newObjs = (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="traffic-camera-popup-icon"
                img="icon-icon_mittauspisteet_radar_1"
                className="oulu-popup-icon"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'traffic-camera', defaultMessage: 'Traffic camera' })}
              </span>
            </div>
            <span className="header-primary">
              {this.data[this.slideIndex].name}
            </span>
            <div className="card-sub-header">
              {this.data[this.slideIndex].timestamp}
            </div>
          </div>
        </div>
        <div>
          <div className="slideshow-container">
            {imageItems}
            {this.data.length > 1 && <a role="link" className="slideshow-prev" onClick={this.prevSlide}>&#10094;</a>}
            {this.data.length > 1 && <a role="link" className="slideshow-next" onClick={this.nextSlide}>&#10095;</a>}
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            {this.data.length > 1 && dotItems}
          </div>
        </div>
      </Card>
    );
    this.setState({ popupContent: newObjs });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.state.popupContent === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (<div>{this.state.popupContent}</div>);
  }
}
