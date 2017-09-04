import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { getCustomizedSettings } from '../store/localStorage';
import SimpleModeFilter from './SimpleModeFilter';
import {
  toggleSimpleModeCarState,
  toggleSimpleModeWalkState,
  toggleSimpleModeBicycleState,
  toggleSimpleModeBusState,
  toggleSimpleModeRailState,
} from '../action/simpleModeSelectedActions';


class SimpleModeFilterContainer extends React.Component {
  static propTypes = {
    buttonClass: PropTypes.string,
    transportData: PropTypes.object.isRequired,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

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

    const newMode = Object.keys(this.props.transportData)
      .filter(mode => this.props.transportData[mode] === true)
      .map(mode => mode.toUpperCase().replace('STATE', ''));

    return newMode[0];
  }

  selectedModes() {
    return Object.keys(this.context.config.simpleTransportModes)
    .filter(mode => this.context.config.simpleTransportModes[mode].availableForSelection)
    .filter(mode => this.getMode(mode))
    .map(mode => mode.toUpperCase());
  }

  toggleTransportMode(mode, action) {
    this.context.executeAction(action);
  }

  actions = {
    toggleCarState: () => this.toggleTransportMode('car', toggleSimpleModeCarState),
    toggleWalkState: () => this.toggleTransportMode('walk', toggleSimpleModeWalkState),
    toggleBicycleState: () => this.toggleTransportMode('bicycle', toggleSimpleModeBicycleState),
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
    />)
}

export default connectToStores(SimpleModeFilterContainer, ['SimpleModeStore'], context => ({
  transportData: context.getStore('SimpleModeStore').getData(),
}));
