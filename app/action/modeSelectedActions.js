export function toggleBusState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteBusState');
}

export function enableBusState(actionContext) {
  actionContext.dispatch('EnableNearbyRouteBusState');
}

export function disableBusState(actionContext) {
  actionContext.dispatch('DisableNearbyRouteBusState');
}

export function toggleTramState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteTramState');
}

export function toggleRailState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteRailState');
}

export function toggleSubwayState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteSubwayState');
}

export function toggleFerryState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteFerryState');
}

export function toggleAirplaneState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteAirplaneState');
}

export function toggleCitybikeState(actionContext) {
  actionContext.dispatch('ToggleNearbyRouteCitybikeState');
}
