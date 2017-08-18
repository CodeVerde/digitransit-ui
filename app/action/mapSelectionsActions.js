/* eslint-disable import/prefer-default-export */

export function ToggleBusLinesState(actionContext) {
  actionContext.dispatch('ToggleBusLinesState');
}

export function AddIncidentsData(actionContext, data) {
  actionContext.dispatch('AddIncidentsData', data);
}

export function ToggleRoadWeatherState(actionContext) {
  actionContext.dispatch('ToggleRoadWeatherState');
}

export function AddWeatherStationsData(actionContext, data) {
  actionContext.dispatch('AddWeatherStationsData', data);
}

export function ToggleWeatherStationsState(actionContext) {
  actionContext.dispatch('ToggleWeatherStationsState');
}
