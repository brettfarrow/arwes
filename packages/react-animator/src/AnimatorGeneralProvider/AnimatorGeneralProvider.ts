import { createElement, type ReactElement, useRef, useMemo } from 'react';

import type { AnimatorGeneralProviderSettings, AnimatorGeneralInterface } from '../types';
import { AnimatorGeneralContext } from '../internal/AnimatorGeneralContext/index';
import { type AnimatorGeneralProviderProps } from './AnimatorGeneralProvider.types';

const AnimatorGeneralProvider = (props: AnimatorGeneralProviderProps): ReactElement => {
  const { children, ...animatorGeneralSettings } = props;

  const animatorGeneralSettingsRef = useRef<AnimatorGeneralProviderSettings>(animatorGeneralSettings);

  animatorGeneralSettingsRef.current = animatorGeneralSettings;

  const animatorGeneralInterface: AnimatorGeneralInterface = useMemo(() => {
    // TODO: Merge with existing parent general animator settings.
    const getSettings = (): AnimatorGeneralProviderSettings => animatorGeneralSettingsRef.current;
    return Object.freeze({ getSettings });
  }, []);

  // TODO: Shouldn't there be a dependencies check for updates?

  return createElement(AnimatorGeneralContext.Provider, { value: animatorGeneralInterface }, children);
};

export { AnimatorGeneralProvider };
