import { SetMapSelectionsDefaults } from './mapSelectionsActions';

export function toggleSimpleModeCarState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeCarState');
  actionContext.executeAction(SetMapSelectionsDefaults, 'Car');
}

export function toggleSimpleModeWalkState(actionContext) {
  actionContext.dispatch('ToggleSimpleModeWalkState');
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
