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
      showCarMonitors: true,
      showCarParking: false,
      incidentsData: [],
      showIncidents: false,
      showMonitoring: false,
      showRoadWeather: false,
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

  toggleCarParkingState() {
    this.data.showCarParking = !this.data.showCarParking;
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

  toggleMonitoringState() {
    this.data.showMonitoring = !this.data.showMonitoring;
    this.emitChange();
  }

  toggleRoadWeatherState() {
    this.data.showRoadWeather = !this.data.showRoadWeather;
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

  getCarParkingState() {
    return this.data.showCarParking;
  }

  getIncidentsData() {
    return this.data.incidentsData;
  }

  getIncidentsState() {
    return this.data.showIncidents;
  }

  getMonitoringState() {
    return this.data.showMonitoring;
  }

  getRoadWeatherState() {
    return this.data.showRoadWeather;
  }

  getTrafficFluencyData() {
    return this.data.trafficFluencyData;
  }

  getTrafficFluencyState() {
    return this.data.showTrafficFluency;
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
    ToggleCarParkingState: 'toggleCarParkingState',
    AddIncidentsData: 'addIncidentsData',
    ToggleIncidentsState: 'toggleIncidentsState',
    ToggleMonitoringState: 'toggleMonitoringState',
    ToggleRoadWeatherState: 'toggleRoadWeatherState',
    AddTrafficFluencyData: 'addTrafficFluencyData',
    ToggleTrafficFluencyState: 'toggleTrafficFluencyState',
    AddWeatherStationsData: 'addWeatherStationsData',
    ToggleWeatherStationsState: 'toggleWeatherStationsState',
  };
}

export default MapSelectionsStore;
