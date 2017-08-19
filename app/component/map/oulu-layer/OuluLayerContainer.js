import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'react-leaflet/lib/Popup';
import { intlShape } from 'react-intl';
import FeatureGroup from 'react-leaflet/lib/FeatureGroup';
import L from 'leaflet';
import connectToStores from 'fluxible-addons-react/connectToStores';

import BulletinsContainer from './BulletinsContainer';
import IncidentsContainer from './IncidentsContainer';
import WeatherStationsContainer from './WeatherStationsContainer';


const PopupOptions = {
  offset: [110, 16],
  closeButton: false,
  minWidth: 260,
  maxWidth: 260,
  autoPanPaddingTopLeft: [5, 125],
  className: 'popup',
  ref: 'popup',
};

// TODO eslint doesn't know that TileLayerContainer is a react component,
//      because it doesn't inherit it directly. This will force the detection
/** @extends React.Component */
class OuluLayerContainer extends FeatureGroup {
  static propTypes = {
    children: PropTypes.array,
    weatherStationsData: PropTypes.array.isRequired,
    mapSelectionsData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    map: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.ouluObjectsArray = [];
    this.state = {
      popups: [],
    };
  }


  componentWillMount() {
    super.componentWillMount();
    this.ouluObjectsArray = [
      new BulletinsContainer(this.context, this.context.map),
      new IncidentsContainer(this.context, this.context.map),
      new WeatherStationsContainer(this.context, this.context.map),
      // new TrafficFluencyContainer(this.context, this.context.map),
    ];
  }

  onClick = (e) => {
    const hits = [];
    const myPoint = this.context.map.latLngToLayerPoint(e.latlng);
    const halfBox = L.point([10, 10]);
    const leftTopCorner = myPoint.subtract(halfBox);
    const rightBottomCorner = myPoint.add(halfBox);
    const myBounds = L.bounds(leftTopCorner, rightBottomCorner);
    this.ouluObjectsArray.forEach((layer) => {
      hits.push(...layer.getObjectHits(myBounds, this.props.mapSelectionsData));
    });
    this.setState({ popups: hits.slice() });
  }

  render() {
    if (this.state.popups.length === 1) {
      return (
        <FeatureGroup onClick={this.onClick}>
          {this.props.children}
          <Popup
            {...PopupOptions}
            key="oulu-features-popup"
            position={{
              lat: this.state.popups[0].lat,
              lng: this.state.popups[0].lng,
            }}
          >
            {this.state.popups[0].content}
          </Popup>
        </FeatureGroup>
      );
    }

    return (
      <FeatureGroup onClick={this.onClick}>
        {this.props.children}
        <Popup
          {...PopupOptions}
          key="oulu-features-popup"
        />
      </FeatureGroup>
    );
  }
}

export default connectToStores(OuluLayerContainer, ['MapSelectionsStore'], context => ({
  weatherStationsData: context.getStore('MapSelectionsStore').getWeatherStationsData(),
  mapSelectionsData: context.getStore('MapSelectionsStore').getData(),
}));
