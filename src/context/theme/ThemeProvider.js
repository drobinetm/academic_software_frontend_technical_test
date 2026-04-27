import React, { useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../../constants/storage';
import { readStorageValue, writeStorageValue } from '../../utils/storage';
import { ThemeContext } from './ThemeContext';

const THEME_MODES = ['light', 'dark', 'system'];

const getSystemMode = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredThemeMode = () => {
  const storedValue = readStorageValue(STORAGE_KEYS.themeMode, 'system');
  return THEME_MODES.includes(storedValue) ? storedValue : 'system';
};

const applyResolvedMode = (mode) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState(getStoredThemeMode);
  const [systemMode, setSystemMode] = useState(getSystemMode);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setSystemMode(event.matches ? 'dark' : 'light');
    };

    setSystemMode(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const setThemeMode = (nextMode) => {
    const safeMode = THEME_MODES.includes(nextMode) ? nextMode : 'system';
    setThemeModeState(safeMode);
    writeStorageValue(STORAGE_KEYS.themeMode, safeMode);
  };

  const resolvedMode = themeMode === 'system' ? systemMode : themeMode;

  useEffect(() => {
    applyResolvedMode(resolvedMode);
  }, [resolvedMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      resolvedMode,
      setThemeMode,
    }),
    [resolvedMode, themeMode]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
