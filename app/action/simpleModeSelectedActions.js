export function toggleSimpleModeKaaraState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeKaaraState');
}

export function toggleSimpleModeKavelyState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeKavelyState');
}

export function toggleSimpleModePolkupyoraState(actionContext) {
  actionContext.dispatch('ToggleSimpleModePolkupyoraState');
}

export function toggleSimpleModeBusState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeBusState');
}

export function toggleSimpleModeRailState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeRailState');
}

export function enableSimpleModeKaaraState(actionContext) {
  console.log('enableSimpleModeKaaraState');
  actionContext.dispatch('ToggleSimpleModeKaaraState');
  actionContext.dispatch('EnableNearbyRouteBusState');
}
