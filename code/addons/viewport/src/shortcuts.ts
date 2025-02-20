import type { API } from '@storybook/manager-api';
import { ADDON_ID } from './constants';
import { globals as defaultGlobals } from './preview';

const getCurrentViewportIndex = (viewportsKeys: string[], current: string): number =>
  viewportsKeys.indexOf(current);

const getNextViewport = (viewportsKeys: string[], current: string): string => {
  const currentViewportIndex = getCurrentViewportIndex(viewportsKeys, current);
  return currentViewportIndex === viewportsKeys.length - 1
    ? viewportsKeys[0]
    : viewportsKeys[currentViewportIndex + 1];
};

const getPreviousViewport = (viewportsKeys: string[], current: string): string => {
  const currentViewportIndex = getCurrentViewportIndex(viewportsKeys, current);
  return currentViewportIndex < 1
    ? viewportsKeys[viewportsKeys.length - 1]
    : viewportsKeys[currentViewportIndex - 1];
};

export const registerShortcuts = async (
  api: API,
  globals: any,
  updateGlobals: any,
  viewportsKeys: string[]
) => {
  await api.setAddonShortcut(ADDON_ID, {
    label: 'Previous viewport',
    defaultShortcut: ['shift', 'V'],
    actionName: 'previous',
    action: () => {
      updateGlobals({
        viewport: getPreviousViewport(viewportsKeys, globals.viewport),
      });
    },
  });

  await api.setAddonShortcut(ADDON_ID, {
    label: 'Next viewport',
    defaultShortcut: ['V'],
    actionName: 'next',
    action: () => {
      updateGlobals({
        viewport: getNextViewport(viewportsKeys, globals.viewport),
      });
    },
  });

  await api.setAddonShortcut(ADDON_ID, {
    label: 'Reset viewport',
    defaultShortcut: ['alt', 'V'],
    actionName: 'reset',
    action: () => {
      updateGlobals(defaultGlobals);
    },
  });
};
