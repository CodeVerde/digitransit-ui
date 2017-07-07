import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
// import connectToStores from 'fluxible-addons-react/connectToStores';
// import cx from 'classnames';
// import xor from 'lodash/xor';
// import ModeStore from '../store/ModeStore';
import OneTabSearchModal from './OneTabSearchModal';
import Icon from './Icon';
import GeopositionSelector from './GeopositionSelector';
import OriginSelector from './OriginSelector';
import Intro from './Intro';
// import ToggleButton from './ToggleButton';
import { getCustomizedSettings } from '../store/localStorage';
import ModeFilterSimple from './ModeFilterSimple';
import { toggleSimpleModeKaaraState, toggleSimpleModeKavelyState, toggleSimpleModePolkupyoraState, toggleSimpleModeBusState, toggleSimpleModeRailState } from '../action/simpleModeSelectedActions';


class Splash extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
    executeAction: PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  };

  static propTypes = {
    shouldShowIntro: PropTypes.bool.isRequired,
    setIntroShown: PropTypes.func.isRequired,
    // simpleTransportModeData: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      // transportModes: this.getStoreState(),
      selectedMode: 'bus',
    };
  }

  getDefaultModes = () =>
    [
      ...Object.keys(this.context.config.simpleTransportModes)
        .filter(mode => this.context.config.simpleTransportModes[mode].defaultValue)
        .map(mode => mode.toUpperCase()),
      ...Object.keys(this.context.config.streetModes)
        .filter(mode => this.context.config.streetModes[mode].defaultValue)
        .map(mode => mode.toUpperCase()),
    ]

  getMode(mode) {
    return this.getModes().includes(mode.toUpperCase());
  }

  getModes() {
    if (this.context.location.query.modes) {
      // console.log('getModes from location.query.modes');
      return decodeURI(this.context.location.query.modes).split('?')[0].split(',');
    } else if (getCustomizedSettings().modes) {
      // console.log('getModes from getCustomizedSettings');
      return getCustomizedSettings().modes;
    }

    // console.log('getModes from getDefaultModes: ', this.getDefaultModes());
    const modes = this.getDefaultModes();
    modes[0] = this.state.selectedMode.toUpperCase();
    // console.log('getModes modes: ', modes);
    return modes;
  }

  // getStoreState() {
  //   const storeState = this.props.simpleTransportModeData;
  //   console.log('Splash store state: ', storeState);
  //   return storeState;
  // }

  openModal = () => {
    this.context.router.push({
      ...this.context.location,
      state: {
        ...this.context.location.state,
        oneTabSearchModalOpen: true,
      },
    });
  };

  toggleTransportMode(mode, action) {
    console.log('toggleTransportMode called with param: ', mode);
    this.context.executeAction(action);
    this.setState({ selectedMode: mode });
  }

  actions = {
    toggleKaaraState: () => this.toggleTransportMode('kaara', toggleSimpleModeKaaraState),
    toggleKavelyState: () => this.toggleTransportMode('kavely', toggleSimpleModeKavelyState),
    togglePolkupyoraState: () => this.toggleTransportMode('polkupyora', toggleSimpleModePolkupyoraState),
    toggleBusState: () => this.toggleTransportMode('bus', toggleSimpleModeBusState),
    toggleTramState: () => {},
    toggleRailState: () => this.toggleTransportMode('rail', toggleSimpleModeRailState),
    toggleSubwayState: () => {},
    toggleFerryState: () => {},
    toggleCitybikeState: () => {},
    toggleAirplaneState: () => {},
  }

  renderContents() {
    // this.getModes();
    console.log('Rendering Splash! Store state: ', this.state.simpleTransportModes);
    // console.log('Rendering Splash! selection: ', this.state.selectedMode);
    const config = this.context.config;
    const modalOpen =
      Boolean(this.context.location.state && this.context.location.state.oneTabSearchModalOpen);
    return (
      <div key="contents" className="flex-vertical">
        <h3>
          <FormattedMessage
            id="splash-welcome"
            defaultMessage="How do you wish to start?"
          />
        </h3>
        <div className="splash-separator">
          <FormattedMessage id="splash-select-mode-of-transport" defaultMessage="Select mode of transport" />
        </div>
        <div id="splash-select-mode-of-transport" className="flex-vertical">
          <div className="row btn-bar">
            <ModeFilterSimple
              action={this.actions}
              buttonClass="mode-icon"
              selectedModes={
              Object.keys(config.simpleTransportModes)
                .filter(mode => config.simpleTransportModes[mode].availableForSelection)
                .filter(mode => this.getMode(mode))
                .map(mode => mode.toUpperCase())
            }
            />
          </div>
        </div>
        <div className="splash-separator">
          <FormattedMessage id="splash-and-select-start-location" defaultMessage="and select start location" />
        </div>
        <GeopositionSelector searchModalIsOpen={modalOpen} />
        <div className="splash-separator">
          <FormattedMessage id="splash-you-can-also" defaultMessage="or" />
        </div>
        <div id="splash-search-field-container" className="flex-vertical">
          <span id="splash-searchfield" >
            <button className="noborder" onClick={this.openModal} style={{ display: 'block' }}>
              <FormattedMessage id="give-origin" defaultMessage="Enter your origin" />
              <Icon className="icon-edit" img="icon-icon_edit" />
            </button>
          </span>
        </div>
        <div className="splash-separator">
          <FormattedMessage id="splash-or-choose" defaultMessage="or select your origin" />
        </div>
        <OriginSelector />
      </div>
    );
  }

  render() {
    return (
      <div className="fullscreen">
        <OneTabSearchModal target="origin" />
        <div className="front-page fullscreen">
          <div id="splash-map" className="fullscreen">
            <div className="map fullscreen">
              <div className="background-gradient" />
            </div>
          </div>
        </div>
        <div id="splash-wrapper">
          <div id="splash">
            {this.props.shouldShowIntro ?
              <Intro
                onIntroFinished={this.props.setIntroShown}
                finalSlide={this.renderContents()}
              /> :
              this.renderContents()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;

// const SplashContainer = connectToStores(Splash, ['ModeStore'], context => ({
//   simpleTransportModeData: context.getStore('ModeStore').getData(),
// }));

// export default SplashContainer;
