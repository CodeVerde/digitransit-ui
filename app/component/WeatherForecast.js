import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';
import ComponentUsageExample from './ComponentUsageExample';

class WeatherForecast extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Weather Forecast</button>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Weather Forecast"
           style={{
             overlay: {
               zIndex: 10000
             },
             content: {
               zIndex: 10001
             }
           }}
        >
          <button onClick={this.handleCloseModal}>Close</button>
          <iframe src="//www.oulunliikenne.fi/php/oulun_saa_simple.php"></iframe>
        </ReactModal>
      </div>
    );
  }
}

WeatherForecast.displayName = 'WeatherForecast';

export default WeatherForecast;
