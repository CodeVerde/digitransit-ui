import { SetMapSelectionsDefaults } from './mapSelectionsActions';

export function toggleSimpleModeKaaraState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeKaaraState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Car');
}

export function toggleSimpleModeKavelyState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeKavelyState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Walk');
}

export function toggleSimpleModePolkupyoraState(actionContext) {
  actionContext.dispatch('ToggleSimpleModePolkupyoraState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Bicycle');
}

export function toggleSimpleModeBusState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeBusState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Bus');
}

export function toggleSimpleModeRailState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeRailState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Rail');
}
