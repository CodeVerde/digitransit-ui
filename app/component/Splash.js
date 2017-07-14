import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import OneTabSearchModal from './OneTabSearchModal';
import Icon from './Icon';
import GeopositionSelector from './GeopositionSelector';
import OriginSelector from './OriginSelector';
import Intro from './Intro';

import { getCustomizedSettings } from '../store/localStorage';
import SimpleModeFilter from './SimpleModeFilter';
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
    transportData: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
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
      return decodeURI(this.context.location.query.modes).split('?')[0].split(',');
    } else if (getCustomizedSettings().modes) {
      return getCustomizedSettings().modes;
    }

    const modes = this.getDefaultModes();
    modes[0] = this.state.selectedMode.toUpperCase();
    return modes;
  }

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
            <SimpleModeFilter
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

const SplashContainer = connectToStores(Splash, ['SimpleModeStore'], context => ({
  transportData: context.getStore('SimpleModeStore').getData(),
}));

export default SplashContainer;
