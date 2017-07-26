import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { getCustomizedSettings } from '../store/localStorage';
import SimpleModeFilter from './SimpleModeFilter';
import {
  toggleSimpleModeKaaraState,
  toggleSimpleModeKavelyState,
  toggleSimpleModePolkupyoraState,
  toggleSimpleModeBusState,
  toggleSimpleModeRailState,
} from '../action/simpleModeSelectedActions';


class SimpleModeFilterContainer extends React.Component {
  static propTypes = {
    buttonClass: PropTypes.string,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

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

  selectedModes() {
    return Object.keys(this.context.config.simpleTransportModes)
    .filter(mode => this.context.config.simpleTransportModes[mode].availableForSelection)
    .filter(mode => this.getMode(mode))
    .map(mode => mode.toUpperCase());
  }

  toggleTransportMode(mode, action) {
    this.context.executeAction(action);
    this.setState({ selectedMode: mode });
  }

  actions = {
    toggleKaaraState: () => this.toggleTransportMode('kaara', toggleSimpleModeKaaraState),
    toggleKavelyState: () => this.toggleTransportMode('kavely', toggleSimpleModeKavelyState),
    togglePolkupyoraState: () => this.toggleTransportMode('polkupyora', toggleSimpleModePolkupyoraState),
    toggleBusState: () => this.toggleTransportMode('bus', toggleSimpleModeBusState),
    toggleRailState: () => this.toggleTransportMode('rail', toggleSimpleModeRailState),
  }

  availableModes() {
    return Object.keys(this.context.config.simpleTransportModes)
    .filter(mode =>
      (this.context.config.simpleTransportModes[mode].availableForSelection));
  }

  render = () => (
    <SimpleModeFilter
      action={this.actions}
      buttonClass={this.props.buttonClass}
      availableModes={this.availableModes()}
      selectedModes={this.selectedModes()}
    />);
}

const SimpleModeFilterContainer2 = connectToStores(SimpleModeFilterContainer, ['SimpleModeStore'], context => ({
  transportData: context.getStore('SimpleModeStore').getData(),
}));

export default SimpleModeFilterContainer2;
