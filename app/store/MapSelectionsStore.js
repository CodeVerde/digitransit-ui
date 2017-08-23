import Store from 'fluxible/addons/BaseStore';

class MapSelectionsStore extends Store {

  static storeName = 'MapSelectionsStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.config = dispatcher.getContext().config;
    this.data = {
      bulletinsData: [],
      showBulletins: false,
      showBusLines: false,
      camerasData: [],
      showCameras: false,
      carMonitorsData: [],
      showCarMonitors: false,
      carParksData: [],
      showCarParks: false,
      incidentsData: [],
      showIncidents: false,
      walkMonitorsData: [],
      showWalkMonitors: false,
      roadConditionsData: [],
      showRoadConditions: false,
      trafficFluencyData: [],
      showTrafficFluency: false,
      weatherStationsData: [],
      showWeatherStations: false,
    };
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
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
    console.log('prkl');
    this.data.showCarParks = !this.data.showCarParks;
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
    this.data.showRoadConditions = !this.data.showRoadConditions;
    this.emitChange();
  }

  addTrafficFluencyData(data) {
    this.data.trafficFluencyData = data.slice();
    this.emitChange();
  }

  toggleTrafficFluencyState() {
    this.data.showTrafficFluency = !this.data.showTrafficFluency;
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

  getIncidentsData() {
    return this.data.incidentsData;
  }

  getIncidentsState() {
    return this.data.showIncidents;
  }

  getRoadConditionsData() {
    return this.data.roadConditionsData;
  }

  getRoadConditionsState() {
    return this.data.showRoadConditions;
  }

  getTrafficFluencyData() {
    return this.data.trafficFluencyData;
  }

  getTrafficFluencyState() {
    return this.data.showTrafficFluency;
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
    AddBulletinsData: 'addBulletinsData',
    ToggleBulletinsState: 'toggleBulletinsState',
    ToggleBusLinesState: 'toggleBusLinesState',
    AddCamerasData: 'addCamerasData',
    ToggleCamerasState: 'toggleCamerasState',
    AddCarMonitorsData: 'addCarMonitorsData',
    ToggleCarMonitorsState: 'toggleCarMonitorsState',
    AddCarParksData: 'addCarParksData',
    ToggleCarParksState: 'toggleCarParksState',
    AddIncidentsData: 'addIncidentsData',
    ToggleIncidentsState: 'toggleIncidentsState',
    AddRoadConditionsData: 'addRoadConditionsData',
    ToggleRoadConditionsState: 'toggleRoadConditionsState',
    AddTrafficFluencyData: 'addTrafficFluencyData',
    ToggleTrafficFluencyState: 'toggleTrafficFluencyState',
    AddWalkMonitorsData: 'addWalkMonitorsData',
    ToggleWalkMonitorsState: 'toggleWalkMonitorsState',
    AddWeatherStationsData: 'addWeatherStationsData',
    ToggleWeatherStationsState: 'toggleWeatherStationsState',
  };
}

export default MapSelectionsStore;
