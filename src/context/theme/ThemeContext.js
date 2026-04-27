import React from 'react';

export const ThemeContext = React.createContext({
  themeMode: 'system',
  resolvedMode: 'dark',
  setThemeMode: () => {},
});
