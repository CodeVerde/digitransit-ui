import Store from 'fluxible/addons/BaseStore';
import { setSimpleModeStorage, getSimpleModeStorage } from './localStorage';

class SimpleModeStore extends Store {

  static storeName = 'SimpleModeStore';

  constructor(dispatcher) {
    super(dispatcher);
    const localData = getSimpleModeStorage();
    this.config = dispatcher.getContext().config;
    this.data = localData.busState !== undefined ? localData : this.enableAll();
    this.generateMode();
  }

  enableAll = () => ({
    kaaraState: this.config.simpleTransportModes.kaara.availableForSelection,
    kavelyState: this.config.simpleTransportModes.kavely.availableForSelection,
    polkupyoraState: this.config.simpleTransportModes.polkupyora.availableForSelection,
    busState: this.config.simpleTransportModes.bus.availableForSelection,
    tramState: this.config.simpleTransportModes.tram.availableForSelection,
    railState: this.config.simpleTransportModes.rail.availableForSelection,
    subwayState: this.config.simpleTransportModes.subway.availableForSelection,
    ferryState: this.config.simpleTransportModes.ferry.availableForSelection,
    airplaneState: this.config.simpleTransportModes.airplane.availableForSelection,
    citybikeState: this.config.simpleTransportModes.citybike.availableForSelection,
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

    if (this.getTramState()) {
      mode.push('TRAM');
    }

    if (this.getRailState()) {
      mode.push('RAIL');
    }

    if (this.getSubwayState()) {
      mode.push('SUBWAY');
    }

    if (this.getFerryState()) {
      mode.push('FERRY');
    }

    if (this.getAirplaneState()) {
      mode.push('AIRPLANE');
    }

    if (this.getCitybikeState()) {
      mode.push('BICYCLE_RENT');
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

  getTramState() {
    return this.data.tramState;
  }

  getRailState() {
    return this.data.railState;
  }

  getSubwayState() {
    return this.data.subwayState;
  }

  getFerryState() {
    return this.data.ferryState;
  }

  getAirplaneState() {
    return this.data.airplaneState;
  }

  getCitybikeState() {
    return this.data.citybikeState;
  }

  clearState = () => {
    this.data.kaaraState = false;
    this.data.kavelyState = false;
    this.data.polkupyoraState = false;
    this.data.subwayState = false;
    this.data.ferryState = false;
    this.data.airplaneState = false;
    this.data.citybikeState = false;
    this.data.railState = false;
    this.data.tramState = false;
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
    console.log('Toggling in toggleKaaraState');
    this.doToggle('kaaraState');
  }

  toggleKavelyState() {
    console.log('Toggling in toggleKavelyState');
    this.doToggle('kavelyState');
  }

  togglePolkupyoraState() {
    console.log('Toggling in togglePolkupyoraState');
    this.doToggle('polkupyoraState');
  }

  toggleBusState() {
    this.doToggle('busState');
  }

  toggleTramState() {
    this.doToggle('tramState');
  }

  toggleRailState() {
    this.doToggle('railState');
  }

  toggleSubwayState() {
    this.doToggle('subwayState');
  }

  toggleFerryState = () => {
    this.doToggle('ferryState');
  }

  toggleAirplaneState = () => {
    this.doToggle('airplaneState');
  }

  toggleCitybikeState() {
    this.doToggle('citybikeState');
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
    ToggleSimpleModeTramState: 'toggleTramState',
    ToggleSimpleModeRailState: 'toggleRailState',
    ToggleSimpleModeSubwayState: 'toggleSubwayState',
    ToggleSimpleModeFerryState: 'toggleFerryState',
    ToggleSimpleModeCitybikeState: 'toggleCitybikeState',
    ToggleSimpleModeAirplaneState: 'toggleAirplaneState',
  };
}

export default SimpleModeStore;
