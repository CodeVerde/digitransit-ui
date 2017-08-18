/* eslint-disable import/prefer-default-export */
import { getJsonWithHeaders } from '../util/xhrPromise';
import { cleanJson } from '../util/ouluUtils';


export function ToggleBusLinesState(actionContext) {
  actionContext.dispatch('ToggleBusLinesState');
}

export function AddIncidentsData(actionContext, parser) {
  const promises = [];
  const urls = [
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/incidents.php?type=future',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php',
    'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/incident/livi_incidents.php?type=future',
  ];
  const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };

  urls.forEach(url => (
    promises.push(getJsonWithHeaders(url, null, headers))
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

export function ToggleRoadWeatherState(actionContext) {
  actionContext.dispatch('ToggleRoadWeatherState');
}

export function AddWeatherStationsData(actionContext, parser) {
  const url = 'https://www.oulunliikenne.fi/oulunliikenne_traffic_data_rest_api_new_restricted/roadweather/roadweatherstations.php';
  const headers = { Authorization: 'Basic cmVzdGFwaXVzZXI6cXVpUDJhZVc=' };

  return getJsonWithHeaders(url, null, headers)
  .then(response => cleanJson(response))
  .then(cleanResponse => parser(cleanResponse))
  .then(data => actionContext.dispatch('AddWeatherStationsData', data))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
}

export function ToggleWeatherStationsState(actionContext) {
  actionContext.dispatch('ToggleWeatherStationsState');
}
