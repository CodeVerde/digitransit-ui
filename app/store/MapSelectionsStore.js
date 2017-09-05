import Store from 'fluxible/addons/BaseStore';
import { setMapSelectionsStorage, getMapSelectionsStorage } from './localStorage';
import OutdoorGymsData from './OutdoorGymsData';

class MapSelectionsStore extends Store {

  static storeName = 'MapSelectionsStore';

  constructor(dispatcher) {
    super(dispatcher);
    const localData = getMapSelectionsStorage();
    this.config = dispatcher.getContext().config;
    if (localData && localData.showEvents !== undefined) {
      this.data = localData;
    } else {
      this.data = this.resetAll();
    }
  }

  // Reset to bus/public transport
  resetAll = () => ({
    bicycleMonitorsData: [],
    showBicycleMonitors: false,
    bulletinsData: [],
    showBulletins: false,
    showBusLines: false,
    camerasData: [],
    showCameras: false,
    carMonitorsData: [],
    showCarMonitors: false,
    carParksData: [],
    showCarParks: false,
    eventsData: [],
    showEvents: false,
    incidentsData: [],
    showIncidents: false,
    outdoorGymsData: OutdoorGymsData,
    showOutdoorGyms: false,
    walkMonitorsData: [],
    showWalkMonitors: false,
    roadConditionsData: [],
    roadConditionsState: 0,
    trafficFluencyData: [],
    trafficFluencyState: 0,
    weatherStationsData: [],
    showWeatherStations: false,
  });

  setDefaults(mode) {
    this.data.showBicycleMonitors = false;
    this.data.showBulletins = false;
    this.data.showBusLines = false;
    this.data.showCameras = false;
    this.data.showCarMonitors = false;
    this.data.showCarParks = false;
    this.data.showEvents = false;
    this.data.showIncidents = false;
    this.data.showOutdoorGyms = false;
    this.data.showWalkMonitors = false;
    this.data.roadConditionsState = 0;
    this.data.trafficFluencyState = 0;
    this.data.showWeatherStations = false;

    switch (mode) {
      case 'Bus':
        // Nothing on purpose
        break;
      case 'Walk':
        this.data.showBulletins = true;
        this.data.showWalkMonitors = true;
        break;
      case 'Bicycle':
        this.data.showBulletins = true;
        this.data.showBicycleMonitors = true;
        break;
      case 'Car':
        this.data.showIncidents = true;
        this.data.trafficFluencyState = 1;
        this.data.showCameras = true;
        break;
      default:
        break;
    }
  }

  storeMapSelections = () => {
    // Let's not store the actual data
    const storedData = {};
    Object.keys(this.data).forEach((element) => {
      if (Array.isArray(this.data[element])) {
        storedData[element] = [];
      } else {
        storedData[element] = this.data[element];
      }
    });
    setMapSelectionsStorage(storedData);
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
  }

  setMapSelectionsDefaults(mode) {
    this.setDefaults(mode);
    this.storeMapSelections();
    this.emitChange();
  }

  addBicycleMonitorsData(data) {
    this.data.bicycleMonitorsData = data.slice();
    this.emitChange();
  }

  toggleBicycleMonitorsState() {
    this.data.showBicycleMonitors = !this.data.showBicycleMonitors;
    this.emitChange();
  }

  addBulletinsData(data) {
    this.data.bulletinsData = data.slice();
    this.emitChange();
  }

  toggleBulletinsState() {
    this.data.showBulletins = !this.data.showBulletins;
    this.emitChange();
  }

  toggleBusLinesState() {
    this.data.showBusLines = !this.data.showBusLines;
    this.emitChange();
  }

  addCamerasData(data) {
    this.data.camerasData = data.slice();
    this.emitChange();
  }

  toggleCamerasState() {
    this.data.showCameras = !this.data.showCameras;
    this.emitChange();
  }

  addCarMonitorsData(data) {
    this.data.carMonitorsData = data.slice();
    this.emitChange();
  }

  toggleCarMonitorsState() {
    this.data.showCarMonitors = !this.data.showCarMonitors;
    this.emitChange();
  }

  addCarParksData(data) {
    this.data.carParksData = data.slice();
    this.emitChange();
  }

  toggleCarParksState() {
    this.data.showCarParks = !this.data.showCarParks;
    this.emitChange();
  }

  addEventsData(data) {
    this.data.eventsData = data.slice();
    this.emitChange();
  }

  toggleEventsState() {
    this.data.showEvents = !this.data.showEvents;
    this.emitChange();
  }

  addIncidentsData(data) {
    this.data.incidentsData = data.slice();
    this.emitChange();
  }

  toggleIncidentsState() {
    this.data.showIncidents = !this.data.showIncidents;
    this.emitChange();
  }

  toggleOutdoorGymsState() {
    this.data.showOutdoorGyms = !this.data.showOutdoorGyms;
    this.emitChange();
  }

  addWalkMonitorsData(data) {
    this.data.walkMonitorsData = data.slice();
    this.emitChange();
  }

  toggleWalkMonitorsState() {
    this.data.showWalkMonitors = !this.data.showWalkMonitors;
    this.emitChange();
  }

  addRoadConditionsData(data) {
    this.data.roadConditionsData = data.slice();
    this.emitChange();
  }

  toggleRoadConditionsState() {
    this.data.roadConditionsState = this.data.roadConditionsState === 0 ? 1 : 0;
    this.emitChange();
  }

  setRoadConditionsState(newState) {
    this.data.roadConditionsState = this.data.roadConditionsState === newState ? 0 : newState;
    this.emitChange();
  }

  addTrafficFluencyData(data) {
    this.data.trafficFluencyData = data.slice();
    this.emitChange();
  }

  toggleTrafficFluencyState() {
    this.data.trafficFluencyState = this.data.trafficFluencyState === 0 ? 1 : 0;
    this.emitChange();
  }

  setTrafficFluencyState(newState) {
    this.data.trafficFluencyState = this.data.trafficFluencyState === newState ? 0 : newState;
    this.emitChange();
  }

  addWeatherStationsData(data) {
    this.data.weatherStationsData = data.slice();
    this.emitChange();
  }

  toggleWeatherStationsState() {
    this.data.showWeatherStations = !this.data.showWeatherStations;
    this.emitChange();
  }

  getData() {
    return this.data;
  }

  getBicycleMonitorsData() {
    return this.data.bicycleMonitorsData;
  }

  getBicycleMonitorsState() {
    return this.data.showBicycleMonitors;
  }

  getBulletinsData() {
    return this.data.bulletinsData;
  }

  getBulletinsState() {
    return this.data.showBulletins;
  }

  getBusLinesState() {
    return this.data.showBusLines;
  }

  getCamerasData() {
    return this.data.camerasData;
  }

  getCamerasState() {
    return this.data.showCameras;
  }

  getCarMonitorsData() {
    return this.data.carMonitorsData;
  }

  getCarMonitorsState() {
    return this.data.showCarMonitors;
  }

  getCarParksData() {
    return this.data.carParksData;
  }

  getCarParksState() {
    return this.data.showCarParks;
  }

  getEventsData() {
    return this.data.eventsData;
  }

  getEventsState() {
    return this.data.showEvents;
  }

  getIncidentsData() {
    return this.data.incidentsData;
  }

  getIncidentsState() {
    return this.data.showIncidents;
  }

  getOutdoorGymsData() {
    return this.data.outdoorGymsData;
  }

  getOutdoorGymsState() {
    return this.data.showOutdoorGyms;
  }

  getRoadConditionsData() {
    return this.data.roadConditionsData;
  }

  getRoadConditionsState() {
    return this.data.roadConditionsState;
  }

  getTrafficFluencyData() {
    return this.data.trafficFluencyData;
  }

  getTrafficFluencyState() {
    return this.data.trafficFluencyState;
  }

  getWalkMonitorsData() {
    return this.data.walkMonitorsData;
  }

  getWalkMonitorsState() {
    return this.data.showWalkMonitors;
  }

  getWeatherStationsData() {
    return this.data.weatherStationsData;
  }

  getWeatherStationsState() {
    return this.data.showWeatherStations;
  }

  static handlers = {
    SetMapSelectionsDefaults: 'setMapSelectionsDefaults',
    AddBicycleMonitorsData: 'addBicycleMonitorsData',
    ToggleBicycleMonitorsState: 'toggleBicycleMonitorsState',
    AddBulletinsData: 'addBulletinsData',
    ToggleBulletinsState: 'toggleBulletinsState',
    ToggleBusLinesState: 'toggleBusLinesState',
    AddCamerasData: 'addCamerasData',
    ToggleCamerasState: 'toggleCamerasState',
    AddCarMonitorsData: 'addCarMonitorsData',
    ToggleCarMonitorsState: 'toggleCarMonitorsState',
    AddCarParksData: 'addCarParksData',
    ToggleCarParksState: 'toggleCarParksState',
    AddEventsData: 'addEventsData',
    ToggleEventsState: 'toggleEventsState',
    AddIncidentsData: 'addIncidentsData',
    ToggleIncidentsState: 'toggleIncidentsState',
    ToggleOutdoorGymsState: 'toggleOutdoorGymsState',
    AddRoadConditionsData: 'addRoadConditionsData',
    ToggleRoadConditionsState: 'toggleRoadConditionsState',
    SetRoadConditionsState: 'setRoadConditionsState',
    AddTrafficFluencyData: 'addTrafficFluencyData',
    ToggleTrafficFluencyState: 'toggleTrafficFluencyState',
    SetTrafficFluencyState: 'setTrafficFluencyState',
    AddWalkMonitorsData: 'addWalkMonitorsData',
    ToggleWalkMonitorsState: 'toggleWalkMonitorsState',
    AddWeatherStationsData: 'addWeatherStationsData',
    ToggleWeatherStationsState: 'toggleWeatherStationsState',
  };
}

export default MapSelectionsStore;
