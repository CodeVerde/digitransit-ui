import Store from 'fluxible/addons/BaseStore';
// import { setSimpleModeStorage, getSimpleModeStorage } from './localStorage';

class PopupStore extends Store {

  static storeName = 'PopupStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.data = {};
  }

  getData() {
    return this.data;
  }

  addPopupData(data) {
    this.data = data;
    this.emitChange();
  }

  dehydrate = () => this.data;

  rehydrate = (data) => {
    this.data = data;
  }

  static handlers = {
    AddPopupData: 'addPopupData',
  };
}

export default PopupStore;
