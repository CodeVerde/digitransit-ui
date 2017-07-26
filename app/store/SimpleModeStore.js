import Store from 'fluxible/addons/BaseStore';
import { setSimpleModeStorage, getSimpleModeStorage } from './localStorage';

class SimpleModeStore extends Store {

  static storeName = 'SimpleModeStore';

  constructor(dispatcher) {
    super(dispatcher);
    const localData = getSimpleModeStorage();
    this.config = dispatcher.getContext().config;
    this.data = localData.busState !== undefined ? localData : this.enableAll();
    this.clearState();
    this.data.busState = true;
    this.generateMode();
  }

  enableAll = () => ({
    kaaraState: this.config.simpleTransportModes.kaara.availableForSelection,
    kavelyState: this.config.simpleTransportModes.kavely.availableForSelection,
    polkupyoraState: this.config.simpleTransportModes.polkupyora.availableForSelection,
    busState: this.config.simpleTransportModes.bus.availableForSelection,
    railState: this.config.simpleTransportModes.rail.availableForSelection,
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
    } else {
      this.data = this.enableAll();
      this.data.selected = undefined;
    }
    this.storeMode();
    this.generateMode();
    this.emitChange();
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
