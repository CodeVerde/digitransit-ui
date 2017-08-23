/* eslint-disable import/prefer-default-export */
import { getJsonWithHeaders } from '../util/xhrPromise';
import { cleanJson } from '../util/ouluUtils';

const authHeaders = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };

export function ToggleBusLinesState(actionContext) {
  actionContext.dispatch('ToggleBusLinesState');
}

export function ToggleBulletinsState(actionContext) {
  actionContext.dispatch('ToggleBulletinsState');
}

export function AddBulletinsData(actionContext, parser) {
  const promises = [];
  const urls = [
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?transport=walking',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?type=future&transport=walking',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?transport=walking',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?type=future&transport=walking',
  ];

  urls.forEach(url => (
    promises.push(getJsonWithHeaders(url, null, authHeaders))
  ));

  return Promise
  .all(promises)
  .then((responses) => {
    const data = [];
    responses.forEach((response) => {
      data.push(...parser(cleanJson(response)));
    });
    actionContext.dispatch('AddBulletinsData', data);
  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleTrafficFluencyState(actionContext) {
  actionContext.dispatch('ToggleTrafficFluencyState');
}

export function AddTrafficFluencyData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/fluencylines_encoded/fluencies.php?zoom=15';

  return getJsonWithHeaders(url, null, authHeaders)
  // .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddTrafficFluencyData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleCamerasState(actionContext) {
  actionContext.dispatch('ToggleCamerasState');
}

export function AddCamerasData(actionContext, parser) {
  const url = 'https://it101.infotripla.fi/city_app_traffic_data_rest_api/weathercamera/weathercamerastations.php?imageHistoryInHours=2&minLat=64.6&maxLat=65.7&minLon=25&maxLon=26.4';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddCamerasData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleCarMonitorsState(actionContext) {
  actionContext.dispatch('ToggleCarMonitorsState');
}

export function AddCarMonitorsData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/lam/lams.php';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddCarMonitorsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleCarParksState(actionContext) {
  actionContext.dispatch('ToggleCarParksState');
}

export function AddCarParksData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/parking/parkingstations.php';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddCarParksData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleIncidentsState(actionContext) {
  actionContext.dispatch('ToggleIncidentsState');
}

export function AddIncidentsData(actionContext, parser) {
  const promises = [];
  const urls = [
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?type=future',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?type=future',
  ];

  urls.forEach(url => (
    promises.push(getJsonWithHeaders(url, null, authHeaders))
  ));

  return Promise
  .all(promises)
  .then((responses) => {
    const data = [];
    responses.forEach((response) => {
      data.push(...parser(cleanJson(response)));
    });
    actionContext.dispatch('AddIncidentsData', data);
  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleMaintenanceState(actionContext) {
  actionContext.dispatch('ToggleMaintenanceState');
}

export function AddMaintenanceData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/php/list_route_points_parameters_hrs.php?class=274,275&fromhrs=1';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(data => console.log('AddMaintenanceData: ', data))
  // .then(cleanResponse => parser(cleanResponse))
  // .then(data => actionContext.dispatch('AddRoadConditionsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleRoadConditionsState(actionContext) {
  actionContext.dispatch('ToggleRoadConditionsState');
}

export function AddRoadConditionsData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadcondition/roadconditions.php';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddRoadConditionsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleWalkMonitorsState(actionContext) {
  actionContext.dispatch('ToggleWalkMonitorsState');
}

export function AddWalkMonitorsData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/eco_traffic/eco_counters.php?type=walking';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddWalkMonitorsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function AddWeatherStationsData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweatherstations.php';

  return getJsonWithHeaders(url, null, authHeaders)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddWeatherStationsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleWeatherStationsState(actionContext) {
  actionContext.dispatch('ToggleWeatherStationsState');
}
