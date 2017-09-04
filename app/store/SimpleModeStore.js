import Store from 'fluxible/addons/BaseStore';
import { setSimpleModeStorage, getSimpleModeStorage } from './localStorage';

class SimpleModeStore extends Store {

  static storeName = 'SimpleModeStore';

  constructor(dispatcher) {
    super(dispatcher);
    const localData = getSimpleModeStorage();
    this.config = dispatcher.getContext().config;
    if (localData && localData.bicycleState !== undefined) {
      this.data = localData;
    } else {
      this.data = this.resetAll();
    }
    this.generateMode();
  }

  resetAll = () => ({
    carState: this.config.simpleTransportModes.car.defaultValue,
    walkState: this.config.simpleTransportModes.walk.defaultValue,
    bicycleState: this.config.simpleTransportModes.bicycle.defaultValue,
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

    if (this.getCarState()) {
      mode.push('CAR');
    }

    if (this.getWalkState()) {
      mode.push('WALK');
    }

    if (this.getBicycleState()) {
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

  getCarState() {
    return this.data.carState;
  }

  getWalkState() {
    return this.data.walkState;
  }

  getBicycleState() {
    return this.data.bicycleState;
  }

  getBusState() {
    return this.data.busState;
  }

  getRailState() {
    return this.data.railState;
  }

  clearState = () => {
    this.data.carState = false;
    this.data.walkState = false;
    this.data.bicycleState = false;
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

  toggleCarState() {
    this.doToggle('carState');
  }

  toggleWalkState() {
    this.doToggle('walkState');
  }

  toggleBicycleState() {
    this.doToggle('bicycleState');
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
    ToggleSimpleModeCarState: 'toggleCarState',
    ToggleSimpleModeWalkState: 'toggleWalkState',
    ToggleSimpleModeBicycleState: 'toggleBicycleState',
    ToggleSimpleModeBusState: 'toggleBusState',
    ToggleSimpleModeRailState: 'toggleRailState',
  };
}

export default SimpleModeStore;
