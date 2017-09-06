import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Toggle from 'react-toggle';
import connectToStores from 'fluxible-addons-react/connectToStores';

import BicycleMonitorsToggle from './toggles/BicycleMonitorsToggle';
import BusLinesMapToggle from './BusLinesMapToggle';
import BulletinsToggle from './toggles/BulletinsToggle';
import CamerasToggle from './toggles/CamerasToggle';
import CarMonitorsToggle from './toggles/CarMonitorsToggle';
import CarParksToggle from './toggles/CarParksToggle';
import EventsToggle from './toggles/EventsToggle';
import IncidentsToggle from './toggles/IncidentsToggle';
import OutdoorGymsToggle from './toggles/OutdoorGymsToggle';
import RoadConditionsToggle from './toggles/RoadConditionsToggle';
import TrafficFluencyToggle from './toggles/TrafficFluencyToggle';
import WalkMonitorsToggle from './toggles/WalkMonitorsToggle';
import WeatherStationsToggle from './toggles/WeatherStationsToggle';
import WeatherForecastToggle from './toggles/WeatherForecastToggle';

const getToggles = (selectedSimpleMode) => {
  const modes = [];
  switch (selectedSimpleMode) {
    case 'BUS':
      modes.push(<BusLinesMapToggle key="bus-lines-map-toggle" />);
      modes.push(<RoadConditionsToggle key="road-conditions-toggle" />);
      break;
    case 'WALK':
      modes.push(<BulletinsToggle key="bulletins-toggle" />);
      modes.push(<WalkMonitorsToggle key="walk-monitor-toggle" />);
      break;
    case 'POLKUPYORA':
      modes.push(<BulletinsToggle key="bulletins-toggle" />);
      modes.push(<BicycleMonitorsToggle key="bicycle-monitor-toggle" />);
      break;
    case 'CAR':
      modes.push(<IncidentsToggle key="incidents-toggle" />);
      modes.push(<TrafficFluencyToggle key="traffic-fluency-toggle" />);
      modes.push(<CarMonitorsToggle key="car-monitors-toggle" />);
      modes.push(<CarParksToggle key="car-parks-toggle" />);
      modes.push(<CamerasToggle key="cameras-toggle" />);
      modes.push(<RoadConditionsToggle key="road-conditions-toggle" />);
      break;
    default:
      break;
  }

  modes.push(<WeatherStationsToggle key="weather-stations-toggle" />);
  modes.push(<OutdoorGymsToggle key="outdoor-gyms-toggle" />);
  modes.push(<EventsToggle key="events-toggle" />);
  modes.push(<WeatherForecastToggle key="weather-forecast-toggle" />);
  return modes;
};

const MapUtils = ({ selectedSimpleMode }) => (
  <div className="map-utils-float">
    <div className="MapUtils">

      {getToggles(selectedSimpleMode)}

      {false && <div className="" id="toggle-bus-stops" key="toggle-bus-stops">
        <div className="map-utils-button active" id="toggle-bus-stops-button">
          <Toggle icons={false} id="BusStopsToggle" />
          <label htmlFor="BusStopsToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_bus_stops" />
            </svg>
            <FormattedMessage id="stops" defaultMessage="Stops" />
          </label>
        </div>
      </div>}

      {false && <div className="" id="toggle-bus-lines-tool" key="toggle-bus-lines-tool">
        <div className="map-utils-button" id="toggle-bus-lines-tool-button">
          <Toggle icons={false} id="BusLinesToggle" />
          <label htmlFor="BusLinesToggle">
            <svg className="icon" viewBox="0 0 283.46 283.46">
              <use xlinkHref="#icon-icon_bus_lines" />
            </svg>
            <FormattedMessage id="routes" defaultMessage="Routes" />
          </label>
        </div>
      </div>}

    </div>
  </div>
);

MapUtils.propTypes = {
  selectedSimpleMode: PropTypes.string.isRequired,
};

MapUtils.displayName = 'MapUtils';

export default connectToStores(MapUtils, ['SimpleModeStore'], context => ({
  selectedSimpleMode: context.getStore('SimpleModeStore').getModeString(),
}));
