import Store from 'fluxible/addons/BaseStore';

class MapSelectionsStore extends Store {

  static storeName = 'MapSelectionsStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.config = dispatcher.getContext().config;
    this.data = {
      showBulletins: false,
      showBusLines: false,
      showIncidents: false,
      showMonitoring: false,
      showRoadWeather: false,
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

  getIncidentsState() {
    return this.data.showIncidents;
  }

  getMonitoringState() {
    return this.data.showMonitoring;
  }

  getRoadWeatherState() {
    return this.data.showRoadWeather;
  }

  getWeatherStationsState() {
    return this.data.showWeatherStations;
  }

  static handlers = {
    ToggleBulletinsState: 'toggleBulletinsState',
    ToggleBusLinesState: 'toggleBusLinesState',
    TogglIncidentsState: 'toggleIncidentsState',
    ToggleMonitoringState: 'toggleMonitoringState',
    ToggleRoadWeatherState: 'toggleRoadWeatherState',
    ToggleWeatherStationsState: 'toggleWeatherStationsState',
  };
}

export default MapSelectionsStore;
