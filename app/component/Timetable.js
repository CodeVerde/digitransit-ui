import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import TimetableRow from './TimetableRow';
import ComponentUsageExample from './ComponentUsageExample';


function mapStopTimes(stoptimesObject) {
  return stoptimesObject.map(stoptime =>
    stoptime.stoptimes
      .filter(st => st.pickupType !== 'NONE')
      .map(st => ({
        name: stoptime.pattern.route.shortName || stoptime.pattern.route.agency.name,
        scheduledDeparture: st.scheduledDeparture,
        serviceDay: st.serviceDay,
      })),
  ).reduce((acc, val) => acc.concat(val), []);
}

function groupArrayByHour(stoptimesArray) {
  return groupBy(stoptimesArray, stoptime =>
    Math.floor(stoptime.scheduledDeparture / (60 * 60)),
  );
}

const Timetable = ({ stop }) => {
  const timetableMap = groupArrayByHour(mapStopTimes(stop.stoptimesForServiceDate));
  return (
    <div className="timetable">
      {Object.keys(timetableMap).sort((a, b) => a - b).map(hour =>
        <TimetableRow
          key={hour}
          title={padStart(hour % 24, 2, '0')}
          stoptimes={timetableMap[hour]}
        />,
      )}
    </div>
  );
};

Timetable.displayName = 'Timetable';
const exampleStop = {
  stoptimesForServiceDate: [{
    pattern: {
      route: {
        shortName: '787K',
        agency: {
          name: 'Helsingin seudun liikenne',
        },
      },
    },
    stoptimes: [{
      scheduledDeparture: 60180,
      serviceDay: 1495659600,
    }],
  }, {
    pattern: {
      route: {
        agency: {
          name: 'Helsingin seudun liikenne',
        },
      },
    },
    stoptimes: [{
      scheduledDeparture: 61180,
      serviceDay: 1495659600,
    }],
  }],
};

Timetable.description = () =>
  <div>
    <p>Renders a timetable</p>
    <ComponentUsageExample description="">
      <Timetable stop={exampleStop} />
    </ComponentUsageExample>
  </div>;

Timetable.propTypes = {
  stop: PropTypes.shape({
    stoptimesForServiceDate: PropTypes.arrayOf(PropTypes.shape({
      pattern: PropTypes.shape({
        route: PropTypes.shape({
          shortName: PropTypes.string,
          agency: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      stoptimes: PropTypes.arrayOf(PropTypes.shape({
        scheduledDeparture: PropTypes.number.isRequired,
        serviceDay: PropTypes.number.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};

export default Timetable;
