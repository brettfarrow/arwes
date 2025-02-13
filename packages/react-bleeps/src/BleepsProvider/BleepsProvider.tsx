import type { ReactNode, ReactElement } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { BleepsManagerProps } from '@arwes/bleeps';
import { createBleepsManager } from '@arwes/bleeps';

import { BleepsManagerContext } from '../internal/BleepsManagerContext';

interface BleepsProviderProps <BleepsNames extends string> extends BleepsManagerProps<BleepsNames> {
  children: ReactNode
}

const BleepsProvider = <BleepsNames extends string>(props: BleepsProviderProps<BleepsNames>): ReactElement => {
  const { master, common, categories, bleeps, children } = props;

  // The bleeps is created once with the provided bleep names.
  const bleepsManager = useMemo(
    () => createBleepsManager({ master, common, categories, bleeps }),
    []
  );

  useEffect(() => {
    bleepsManager?.update({ master, common, categories, bleeps });
  }, [master, common, categories, bleeps]);

  useEffect(() => {
    return () => {
      bleepsManager?.unload();
    };
  }, []);

  return (
    <BleepsManagerContext.Provider value={bleepsManager}>
      {children}
    </BleepsManagerContext.Provider>
  );
};

export type { BleepsProviderProps };
export { BleepsProvider };
