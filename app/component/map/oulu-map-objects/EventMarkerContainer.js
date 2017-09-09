import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import moment from 'moment';

import { getEventIconName } from '../../../util/ouluUtils';
import { asString as iconAsString } from '../../OuluIcon';
import { isBrowser } from '../../../util/browser';
import { AddEventsData } from '../../../action/mapSelectionsActions';

let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}

const parseEventMessage = (data) => {
  const cleanData = [];

  if (!data || !Array.isArray(data)) { return cleanData; }

  const today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const limitDate = moment().add(90, 'day').set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  data.forEach((venue) => {
    venue.events.every((event) => {
      if (moment(event.startDate, 'YYYY-MM-DD').isSameOrBefore(limitDate) &&
        moment(event.endDate, 'YYYY-MM-DD').isSameOrAfter(today)) {
        cleanData.push({
          geometry: venue.geometry,
          venueName: venue.name,
          infoLink: event.infoLink,
          extraInfo: event.extraInfo,
          id: event.id,
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          startTime: event.startTime,
          endTime: event.endTime,
          tags: event.tags,
        });
        return false;
      }
      return true;
    });
  });

  return cleanData;
};

const getEventIcon = tags => (
  L.divIcon({
    html: iconAsString({ img: getEventIconName(tags) }),
    className: 'purple-icon-oulu',
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
    if (this.objs.length !== this.props.eventsData.length) {
      this.updateObjects(this.props.eventsData);
    } else if (this.props.showEvents) {
      this.context.executeAction(
        AddEventsData,
        parseEventMessage,
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showEvents && !this.props.showEvents) {
      this.context.executeAction(
        AddEventsData,
        parseEventMessage,
      );
    } else if (this.objs.length !== newProps.eventsData.length) {
      this.updateObjects(newProps.eventsData);
    }
  }

  updateObjects(data) {
    const newObjs = [];
    data.forEach((element) => {
      newObjs.push(
        <Marker
          key={`event-marker-${element.id}`}
          position={{
            lat: element.geometry[0],
            lng: element.geometry[1],
          }}
          icon={getEventIcon(element.tags)}
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
