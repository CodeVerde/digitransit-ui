import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import cx from 'classnames';

import FuzzyTripRoute from './FuzzyTripRoute';
import TripLink from './TripLink';
import WalkDistance from './WalkDistance';
import StopCode from './StopCode';
import { fromStopTime } from './DepartureTime';
import ComponentUsageExample from './ComponentUsageExample';

// Function to fix issues with times in Waltti format
const walttiTimeFormatCheck = (timeString) => {
  if (timeString.includes(':')) {
    return (timeString.substring(0, 2) * 60 * 60) +
      (Number(timeString.substring(3)) * 60);
  }
  return (timeString.substring(0, 2) * 60 * 60) + Number(timeString.substring(2, 4) * 60);
};

const getRouteStopSvg = (first, last) => (
  <svg className="route-stop-schematized" >
    <line
      x1="6"
      x2="6"
      y1={first ? 13 : 0}
      y2={last ? 13 : 67}
      strokeWidth="5"
      stroke="currentColor"
    />
    <line
      x1="6"
      x2="6"
      y1={first ? 13 : 0}
      y2={last ? 13 : 67}
      strokeWidth="2"
      stroke="white"
      opacity="0.2"
    />
    <circle strokeWidth="2" stroke="currentColor" fill="white" cx="6" cy="13" r="5" />
  </svg>
);

class RouteStop extends React.Component {
  static propTypes = {
    vehicles: PropTypes.array,
    stop: PropTypes.object,
    mode: PropTypes.string,
    className: PropTypes.string,
    distance: PropTypes.number,
    currentTime: PropTypes.number.isRequired,
    first: PropTypes.bool,
    last: PropTypes.bool,
  };

  static description = () =>
    <ComponentUsageExample description="basic">
      <RouteStop
        stop={{
          stopTimesForPattern: [{
            realtime: true,
            realtimeState: 'UPDATED',
            realtimeDeparture: 48796,
            serviceDay: 1471467600,
            scheduledDeparture: 48780,
          },
          {
            realtime: false,
            realtimeState: 'SCHEDULED',
            realtimeDeparture: 49980,
            serviceDay: 1471467600,
            scheduledDeparture: 49980,
          }],
          gtfsId: 'HSL:1173101',
          lat: 60.198185699999726,
          lon: 24.940634400000118,
          name: 'Asemapäällikönkatu',
          desc: 'Ratamestarinkatu',
          code: '0663',
        }}
        mode="bus"
        distance={200}
        last={false}
        currentTime={1471515614}
      />
    </ComponentUsageExample>;

  render() {
    const { vehicles, stop, mode, distance, last, first, currentTime, className } = this.props;

    const vehicleTripLinks = vehicles && vehicles.map(vehicle => (
      <Relay.RootContainer
        key={vehicle.id}
        Component={TripLink}
        route={new FuzzyTripRoute({
          route: vehicle.route,
          direction: vehicle.direction,
          date: vehicle.operatingDay,
          time: walttiTimeFormatCheck(vehicle.tripStartTime),
        })}
        renderFetched={data =>
          (<TripLink
            mode={vehicle.mode}
            {...data}
          />)
        }
      />
    ));

    return (
      <div className={cx('route-stop row', className)} ref={el => (this.element = el)}>
        <div className="columns route-stop-now">{vehicleTripLinks}</div>
        <Link to={`/pysakit/${stop.gtfsId}`}>
          <div className={`columns route-stop-name ${mode}`}>
            {getRouteStopSvg(first, last)}
            {stop.name}
            <br />
            <div style={{ whiteSpace: 'nowrap' }}>
              {stop.code && <StopCode code={stop.code} />}
              <span className="route-stop-address">{stop.desc}</span>
              {'\u2002'}
              {distance && (
                <WalkDistance
                  className="nearest-route-stop"
                  icon="icon_location-with-user"
                  walkDistance={distance}
                />
              )}
            </div>
          </div>
          {(stop.stopTimesForPattern && stop.stopTimesForPattern.length > 0 &&
            stop.stopTimesForPattern.map(stopTime => (
              <div key={stopTime.scheduledDeparture} className="columns route-stop-time">
                {fromStopTime(stopTime, currentTime)}
              </div>
            ))
          )}
        </Link>
        <div className="route-stop-row-divider" />
      </div>);
  }
}

export default RouteStop;
