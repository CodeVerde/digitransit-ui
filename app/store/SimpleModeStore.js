import Store from 'fluxible/addons/BaseStore';
import { setSimpleModeStorage, getSimpleModeStorage } from './localStorage';

class SimpleModeStore extends Store {

  static storeName = 'SimpleModeStore';

  constructor(dispatcher) {
    super(dispatcher);
    const localData = getSimpleModeStorage();
    this.config = dispatcher.getContext().config;
    if (localData && localData.busState !== undefined) {
      this.data = localData;
    } else {
      this.data = this.resetAll();
    }
    this.generateMode();
  }

  resetAll = () => ({
    kaaraState: this.config.simpleTransportModes.kaara.defaultValue,
    kavelyState: this.config.simpleTransportModes.kavely.defaultValue,
    polkupyoraState: this.config.simpleTransportModes.polkupyora.defaultValue,
    busState: this.config.simpleTransportModes.bus.defaultValue,
    railState: this.config.simpleTransportModes.rail.defaultValue,
    selected: 'busState',
  });

  getData() {
    return this.data;
  }

  // Store the same array/string to enable change detection with shallow comparison
  generateMode = () => {
    const mode = [];

    if (this.getKaaraState()) {
      mode.push('KAARA');
    }

    if (this.getKavelyState()) {
      mode.push('KAVELY');
    }

    if (this.getPolkupyoraState()) {
      mode.push('POLKUPYORA');
    }

    if (this.getBusState()) {
      mode.push('BUS');
    }

    if (this.getRailState()) {
      mode.push('RAIL');
    }

    this.mode = mode;
    this.modeString = mode.join(',');
  }

  getMode = () => this.mode

  getModeString = () => this.modeString

  getKaaraState() {
    return this.data.kaaraState;
  }

  getKavelyState() {
    return this.data.kavelyState;
  }

  getPolkupyoraState() {
    return this.data.polkupyoraState;
  }

  getBusState() {
    return this.data.busState;
  }

  getRailState() {
    return this.data.railState;
  }

  clearState = () => {
    this.data.kaaraState = false;
    this.data.kavelyState = false;
    this.data.polkupyoraState = false;
    this.data.railState = false;
    this.data.busState = false;
  }

  doToggle = (name) => {
    if (this.data.selected !== name) {
      this.clearState();
      this.data[name] = true;
      this.data.selected = name;
      this.storeMode();
      this.generateMode();
      this.emitChange();
    }
  }

  toggleKaaraState() {
    this.doToggle('kaaraState');
  }

  toggleKavelyState() {
    this.doToggle('kavelyState');
  }

  togglePolkupyoraState() {
    this.doToggle('polkupyoraState');
  }

  toggleBusState() {
    this.doToggle('busState');
  }

  toggleRailState() {
    this.doToggle('railState');
  }

  storeMode = () => {
    setSimpleModeStorage(this.data);
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
  }

  static handlers = {
    ToggleSimpleModeKaaraState: 'toggleKaaraState',
    ToggleSimpleModeKavelyState: 'toggleKavelyState',
    ToggleSimpleModePolkupyoraState: 'togglePolkupyoraState',
    ToggleSimpleModeBusState: 'toggleBusState',
    ToggleSimpleModeRailState: 'toggleRailState',
  };
}

export default SimpleModeStore;
