import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import polyline from 'polyline-encoded';

// import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { TrafficFluencyData } from './TrafficFluencyData';


let Popup;
// let Marker;
let Polyline;
// let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/lib/Popup').default;
  // Marker = require('react-leaflet/lib/Marker').default;
  Polyline = require('react-leaflet/lib/Polyline').default;
  // L = require('leaflet');
  /* eslint-enable global-require */
}


const parseTrafficFluencyMessage = (data) => {
  const cleanData = [];
  data.fluencyline.forEach((element) => {
    cleanData.push({
      id: `traffic-fluency-marker-${element.id}`,
      encodedGeometry: element.encoded_geom,
      color: element.color,
      opacity: element.opacity,
      name: element.name,
      description: element.description,
      timestamp: element.timestamp,
      fluencyText: element.fluency_text,
    });
  });

  return cleanData;
};

// const getTrafficFluencyIcon = iconText => (
//   L.divIcon({
//     html: iconAsString({ img: 'icon-icon_sadealueet', iconText }),
//     className: 'weather-station-marker',
//     iconSize: [20, 20],
//     iconAnchor: [30, 40],
//   })
// );

class TrafficFluencyContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showTrafficFluency: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      objs: null,
    };
  }

  componentWillMount() {
    this.data = parseTrafficFluencyMessage(TrafficFluencyData);
    this.objs = [];
    this.data.forEach((element) => {
      this.objs.push(
        <Polyline
          key={`${element.id}-poly`}
          positions={polyline.decode(element.encodedGeometry)}
          color={element.color}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth={250}
            minWidth={250}
            className="popup"
          >
            <p><strong>{element.name}</strong><br />
              Kesto: {element.timestamp} toistaiseksi<br />
              {element.description}<br />
              {element.fluencyText}<br />
            </p>
          </Popup>
        </Polyline>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showTrafficFluency) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(TrafficFluencyContainer, ['SimpleModeStore'], context => ({
  showTrafficFluency: context.getStore('MapSelectionsStore').getTrafficFluencyState(),
}));
