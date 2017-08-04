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
        <button onClick={this.handleOpenModal}>Rain Map</button>
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
          <iframe src="//http.foreca.com/xfer/infotripla/fin/fca_fin-precip-inline-fi.html" />
        </ReactModal>
      </div>
    );
  }
}

RainMap.displayName = 'RainMap';

export default RainMap;
