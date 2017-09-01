import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { asString as iconAsString } from '../../OuluIcon';

import { isBrowser } from '../../../util/browser';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}

const getEventIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_boat_1', iconText }),
    className: 'white-icon-oulu',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
);

class EventMarkerContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
  };

  static propTypes = {
    showEvents: PropTypes.bool.isRequired,
    eventsData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      geometry: PropTypes.arrayOf(PropTypes.number),
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.objs = [];
  }

  componentWillMount() {
    this.updateObjects(this.props.eventsData);
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          key={`event-marker-${element.name}`}
          position={{
            lat: element.geometry[0],
            lng: element.geometry[1],
          }}
          icon={getEventIcon()}
          title={element.name}
          interactive={false}
        />,
      );
    });
    this.objs = newObjs;
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.objs.length === 0 || !this.props.showEvents) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(EventMarkerContainer, ['MapSelectionsStore'], context => ({
  showEvents: context.getStore('MapSelectionsStore').getEventsState(),
  eventsData: context.getStore('MapSelectionsStore').getEventsData(),
}));
