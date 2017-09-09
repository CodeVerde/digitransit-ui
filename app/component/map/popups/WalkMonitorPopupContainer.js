import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import { Line } from 'react-chartjs-2';

import { isBrowser } from '../../../util/browser';
import { getJsonWithHeaders } from '../../../util/xhrPromise';
import { cleanJson } from '../../../util/ouluUtils';
import Icon from '../../Icon';
import Card from '../../Card';

const parseWalkMonitorDetails = (data) => {
  const cleanData = {};

  if (!data || !data.ecoCounterDayResults) { return cleanData; }

  cleanData.resultTitle = data.resultTitle;
  cleanData.yearMaxDate = data.yearMaxDate;
  cleanData.yearMaxValue = data.yearMaxValue;
  cleanData.yearMaxWeekday = data.yearMaxWeekday;

  cleanData.ecoCounterDayResults = [];

  data.ecoCounterDayResults.forEach((element) => {
    cleanData.ecoCounterDayResults.push({
      date: element.date,
      value: element.value,
      weekday: element.weekday,
    });
  });

  return cleanData;
};

export default class WalkMonitorPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    loading: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.dataLabels = [];
    this.dataValues = [];
  }

  componentWillMount() {
    const url = `https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/eco_traffic/eco_counter_daydata.php?daysFromHistory=31&measurementPointId=${this.props.id}`;
    const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };
    getJsonWithHeaders(url, null, headers)
    .then(response => cleanJson(response))
    .then(cleanResponse => this.setState({ data: (parseWalkMonitorDetails(cleanResponse)) }))
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }

  renderObjects() {
    const data = this.state.data;
    if (data === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    const dataLabels = [];
    const dataValues = [];

    data.ecoCounterDayResults.forEach((element) => {
      dataLabels.push(element.date);
      dataValues.push(element.value);
    });

    const myData = {
      labels: dataLabels,
      datasets: [{
        data: dataValues,
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


    return (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <div className="card-header-icon">
              <Icon
                id="car-monitor-popup-icon"
                img="icon-icon_measurement_1"
                className="icon-green"
              />
              <span className="oulu-card-content oulu-card-detail-text no-padding no-margin">
                {this.context.intl.formatMessage({ id: 'monitoring-point', defaultMessage: 'Monitoring point' })}
              </span>
            </div>
            <span className="oulu-card-header-primary">
              {data.resultTitle}
            </span>
            <div className="card-sub-header">
              {data.resultTitle}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text no-padding no-margin">Vuoden korkein tilastoluku, {data.yearMaxWeekday} {data.yearMaxDate}: {data.yearMaxValue}</p>
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
    );
  }

  render() {
    if (!isBrowser) { return false; }

    return (<div>{this.renderObjects()}</div>);
  }
}
