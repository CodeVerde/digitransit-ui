import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { Line } from 'react-chartjs-2';

import { asString as iconAsString } from '../IconWithTail';

import { isBrowser } from '../../util/browser';
import { monitoringMarkerData, monitoringDetailsData } from './MonitoringData';

import Card from '../Card';

let Popup;
let Marker;
let L;

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/lib/Popup').default;
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}


const parseMonitoringMessage = (data) => {
  const cleanData = [];
  data.forEach((element) => {
    cleanData.push({
      id: `monitoring-marker-${element.id}`,
      geometry: { lat: element.geom.coordinates[1], lon: element.geom.coordinates[0] },
      name: element.name,
      directionName: element.direction_name,
      type: element.type,
    });
  });

  return cleanData;
};

const getMonitoringIcon = iconText => (
  L.divIcon({
    html: iconAsString({ img: 'icon-icon_tiesaa_marker', iconText }),
    className: 'weather-station-marker',
    iconSize: [20, 20],
    iconAnchor: [30, 40],
  })
);

class MonitoringContainer extends React.PureComponent {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    showMonitoring: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      objs: null,
    };
    this.dataLabels = [];
    this.dataValues = [];
  }

  componentWillMount() {
    this.data = parseMonitoringMessage(monitoringMarkerData);
    this.objs = [];

    this.dataLabels = [];
    this.dataValues = [];

    monitoringDetailsData.forEach((element) => {
      this.dataLabels.push(element.date);
      this.dataValues.push(element.value);
    });

    const myData = {
      labels: this.dataLabels,
      datasets: [{
        data: this.dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: 'white',
        pointBorderWidth: 1,
        pointHitRadius: 8,
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        pointRadius: 4,
        pointStyle: 'circle',
      }],
    };

    this.data.forEach((element) => {
      this.objs.push(
        <Marker
          key={element.id}
          position={{
            lat: element.geometry.lat,
            lng: element.geometry.lon,
          }}
          icon={getMonitoringIcon()}
          title={element.name}
        >
          <Popup
            offset={[106, 16]}
            closeButton={false}
            maxWidth="auto"
            className="oulu-popup-xlarge"
          >
            <Card className="padding-small">
              <div className="card-header">
                <div className="card-header-wrapper">
                  <span className="header-primary">
                    {element.name}
                  </span>
                  <div className="card-sub-header">
                    {monitoringDetailsData[0].weekday} {monitoringDetailsData[0].date}
                  </div>
                </div>
              </div>
              <div>
                <p className="departure route-detail-text no-padding no-margin">Vuoden korkein tilastoluku: {monitoringDetailsData[0].weekday} {monitoringDetailsData[0].date}: {monitoringDetailsData[0].value}</p>
                <p className="departure route-detail-text no-padding no-margin">Tulokset: {monitoringDetailsData[0].weekday} {monitoringDetailsData[0].date}</p>
              </div>
              <Line
                data={myData}
                width={400}
                height={200}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    xAxes: [{
                      ticks: {
                        stepSize: 1,
                        min: 0,
                        autoSkip: false,
                      },
                    }],
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                      },
                    }],
                  },
                  hover: {
                    animationDuration: 0,
                  },
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    enabled: true,
                    mode: 'nearest',
                    displayColors: false,
                    callbacks: {
                      label: tooltipItem => (tooltipItem.yLabel),
                    },
                  },
                }}
              />
            </Card>
          </Popup>
        </Marker>,
      );
    });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.data === null || !this.props.showMonitoring) { return false; }

    return (<div style={{ display: 'none' }}>{this.objs}</div>);
  }
}

export default connectToStores(MonitoringContainer, ['SimpleModeStore'], context => ({
  showMonitoring: context.getStore('MapSelectionsStore').getMonitoringState(),
}));
