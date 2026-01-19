import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const ThemeContext = createContext();

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeSettings must be used within ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [contrast, setContrast] = useState('default');
  const [direction, setDirection] = useState('ltr');
  const [layout, setLayout] = useState('vertical');
  const [colorPreset, setColorPreset] = useState('blue');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const savedContrast = localStorage.getItem('themeContrast');
    const savedDirection = localStorage.getItem('themeDirection');
    const savedLayout = localStorage.getItem('themeLayout');
    const savedColorPreset = localStorage.getItem('themeColorPreset');

    if (savedMode) setMode(savedMode);
    if (savedContrast) setContrast(savedContrast);
    if (savedDirection) setDirection(savedDirection);
    if (savedLayout) setLayout(savedLayout);
    if (savedColorPreset) setColorPreset(savedColorPreset);
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themeContrast', contrast);
    localStorage.setItem('themeDirection', direction);
    localStorage.setItem('themeLayout', layout);
    localStorage.setItem('themeColorPreset', colorPreset);
  }, [mode, contrast, direction, layout, colorPreset]);

  const colorPresets = {
    default: { main: '#00d4aa', light: '#4ade80', dark: '#059669' },
    cyan: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    purple: { main: '#a855f7', light: '#c084fc', dark: '#9333ea' },
    blue: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
    orange: { main: '#f97316', light: '#fb923c', dark: '#ea580c' },
    red: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: colorPresets[colorPreset],
          background: {
            default: mode === 'light' ? '#ffffff' : '#1a1d29',
            paper: mode === 'light' ? '#f8fafc' : '#0f1117',
          },
          text: {
            primary: mode === 'light' ? '#1e293b' : '#ffffff',
            secondary: mode === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
          },
        },
        direction,
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode, contrast, direction, colorPreset]
  );

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleContrast = () => setContrast((prev) => (prev === 'default' ? 'bold' : 'default'));
  const toggleDirection = () => setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));

  const value = {
    mode,
    contrast,
    direction,
    layout,
    colorPreset,
    setMode,
    setContrast,
    setDirection,
    setLayout,
    setColorPreset,
    toggleMode,
    toggleContrast,
    toggleDirection,
    colorPresets,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
