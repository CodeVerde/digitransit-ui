import React from 'react';
import ReactModal from 'react-modal';

class RainMap extends React.Component {
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
            <use xlinkHref="#icon-icon_sadekartta" />
          </svg>
          <span>Sadekartta</span>
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Rain Map"
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
          <iframe
            frameBorder="0"
            height="670"
            src="//http.foreca.com/xfer/infotripla/fin/fca_fin-precip-inline-fi.html"
            width="580"
          />
        </ReactModal>
      </div>
    );
  }
}

RainMap.displayName = 'RainMap';

export default RainMap;
