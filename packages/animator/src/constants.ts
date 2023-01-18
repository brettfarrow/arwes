import type {
  AnimatorState,
  AnimatorAction,
  AnimatorManagerName,
  AnimatorDuration,
  AnimatorSettings
} from './types';

// States
export const ANIMATOR_STATES: Record<AnimatorState, AnimatorState> = Object.freeze({
  entered: 'entered',
  entering: 'entering',
  exiting: 'exiting',
  exited: 'exited'
});

// Actions
export const ANIMATOR_ACTIONS: Record<AnimatorAction, AnimatorAction> = Object.freeze({
  setup: 'setup',
  enter: 'enter',
  enterEnd: 'enterEnd',
  exit: 'exit',
  exitEnd: 'exitEnd',
  update: 'update'
});

// Managers
export const ANIMATOR_MANAGER_NAMES: Record<AnimatorManagerName, AnimatorManagerName> = Object.freeze({
  parallel: 'parallel',
  sequence: 'sequence',
  stagger: 'stagger'
});

export const ANIMATOR_DEFAULT_DURATION: AnimatorDuration = Object.freeze({
  enter: 0.3,
  exit: 0.3,
  delay: 0,
  offset: 0,
  stagger: 0.03,
  interval: 3
});

export const ANIMATOR_DEFAULT_SETTINGS: AnimatorSettings = Object.freeze({
  active: false,
  duration: ANIMATOR_DEFAULT_DURATION,
  manager: ANIMATOR_MANAGER_NAMES.parallel,
  merge: false,
  combine: false
});
