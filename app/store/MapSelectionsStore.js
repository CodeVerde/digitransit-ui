import Store from 'fluxible/addons/BaseStore';

class MapSelectionsStore extends Store {

  static storeName = 'MapSelectionsStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.config = dispatcher.getContext().config;
    this.data = {
      showBulletins: false,
      showBusLines: false,
      showCameras: false,
      showCarMonitoring: false,
      showCarParking: false,
      showIncidents: false,
      showMonitoring: false,
      showRoadWeather: false,
      showTrafficFluency: false,
      weatherStationsData: [],
      showWeatherStations: false,
    };
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
  }

  toggleBulletinsState() {
    this.data.showBulletins = !this.data.showBulletins;
    this.emitChange();
  }

  toggleBusLinesState() {
    this.data.showBusLines = !this.data.showBusLines;
    this.emitChange();
  }

  toggleCamerasState() {
    this.data.showCameras = !this.data.showCameras;
    this.emitChange();
  }

  toggleCarMonitoringState() {
    this.data.showCarMonitoring = !this.data.showCarMonitoring;
    this.emitChange();
  }

  toggleCarParkingState() {
    this.data.showCarParking = !this.data.showCarParking;
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

  toggleTrafficFluencyState() {
    this.data.showTrafficFluency = !this.data.showTrafficFluency;
    this.emitChange();
  }

  addWeatherStationsData(data) {
    // console.log('Adding data: ', data);
    this.data.weatherStationsData = data.slice();
    this.emitChange();
  }

  toggleWeatherStationsState() {
    this.data.showWeatherStations = !this.data.showWeatherStations;
    this.emitChange();
  }

  getBulletinsState() {
    return this.data.showBulletins;
  }

  getBusLinesState() {
    return this.data.showBusLines;
  }

  getCamerasState() {
    return this.data.showCameras;
  }

  getCarMonitoringState() {
    return this.data.showCarMonitoring;
  }

  getCarParkingState() {
    return this.data.showCarParking;
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
    ToggleBulletinsState: 'toggleBulletinsState',
    ToggleBusLinesState: 'toggleBusLinesState',
    ToggleCamerasState: 'toggleCamerasState',
    ToggleCarMonitoringState: 'toggleCarMonitoringState',
    ToggleCarParkingState: 'toggleCarParkingState',
    ToggleIncidentsState: 'toggleIncidentsState',
    ToggleMonitoringState: 'toggleMonitoringState',
    ToggleRoadWeatherState: 'toggleRoadWeatherState',
    ToggleTrafficFluencyState: 'toggleTrafficFluencyState',
    AddWeatherStationsData: 'addWeatherStationsData',
    ToggleWeatherStationsState: 'toggleWeatherStationsState',
  };
}

export default MapSelectionsStore;
