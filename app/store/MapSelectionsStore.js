import Store from 'fluxible/addons/BaseStore';

class MapSelectionsStore extends Store {

  static storeName = 'MapSelectionsStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.config = dispatcher.getContext().config;
    this.data = {
      showBusLines: false,
      showRoadWeather: false,
    };
  }

  getData() {
    return this.data;
  }

  toggleBusLinesState() {
    this.data.showBusLines = !this.data.showBusLines;
    this.emitChange();
  }

  toggleRoadWeatherState() {
    this.data.showRoadWeather = !this.data.showRoadWeather;
    this.emitChange();
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
  }

  static handlers = {
    ToggleBusLinesState: 'toggleBusLinesState',
    ToggleRoadWeatherState: 'toggleRoadWeatherState',
  };
}

export default MapSelectionsStore;
