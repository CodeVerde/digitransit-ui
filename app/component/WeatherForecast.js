import React from 'react';
import ReactModal from 'react-modal';

class WeatherForecast extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button
          className="map-utils-button"
          onClick={this.handleOpenModal}
        >
          <svg
            className="icon"
            viewBox="0 0 283.46 283.46"
          >
            <use xlinkHref="#icon-icon_weather" />
          </svg>
          <span>Sääennuste</span>
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Weather Forecast"
          style={{
            overlay: {
              zIndex: 10000,
            },
            content: {
              zIndex: 10001,
            },
          }}
        >
          <button onClick={this.handleCloseModal}>Close</button>
          <iframe src="//www.oulunliikenne.fi/php/oulun_saa_simple.php" />
        </ReactModal>
      </div>
    );
  }
}

WeatherForecast.displayName = 'WeatherForecast';

export default WeatherForecast;
