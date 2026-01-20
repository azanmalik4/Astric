import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
// import { fontSize } from '@mui/system';

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
  const [fontSize, setFontSize] = useState(60);

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const savedContrast = localStorage.getItem('themeContrast');
    const savedDirection = localStorage.getItem('themeDirection');
    const savedLayout = localStorage.getItem('themeLayout');
    const savedColorPreset = localStorage.getItem('themeColorPreset');
     const savedFontSize = localStorage.getItem('themeFontSize');

    if (savedMode) setMode(savedMode);
    if (savedContrast) setContrast(savedContrast);
    if (savedDirection) setDirection(savedDirection);
    if (savedLayout) setLayout(savedLayout);
    if (savedColorPreset) setColorPreset(savedColorPreset);
    if (savedFontSize) setFontSize(Number(savedFontSize));
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themeContrast', contrast);
    localStorage.setItem('themeDirection', direction);
    localStorage.setItem('themeLayout', layout);
    localStorage.setItem('themeColorPreset', colorPreset);
    localStorage.setItem('themeFontSize', fontSize.toString());
  }, [mode, contrast, direction, layout, colorPreset, fontSize]);

  const colorPresets = useMemo(
    () => ({
      default: { main: '#00d4aa', light: '#4ade80', dark: '#059669' },
      cyan: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
      purple: { main: '#a855f7', light: '#c084fc', dark: '#9333ea' },
      blue: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
      orange: { main: '#f97316', light: '#fb923c', dark: '#ea580c' },
      red: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    }),
    []
  );

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
          // ADD THIS - Contrast colors
          ...(contrast === 'bold' && {
            background: {
              default: mode === 'light' ? '#f0f0f0' : '#0a0d14',
              paper: mode === 'light' ? '#e5e5e5' : '#151820',
            },
            text: {
              primary: mode === 'light' ? '#000000' : '#ffffff',
              secondary: mode === 'light' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
            },
          }),
        },
        direction, // This enables RTL
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          // ADD THIS - Dynamic font sizes
          fontSize: 14, // Base font size
          h1: { fontSize: `${3.5 + (fontSize - 16) * 0.1}rem` },
          h2: { fontSize: `${3 + (fontSize - 16) * 0.08}rem` },
          h3: { fontSize: `${2.5 + (fontSize - 16) * 0.07}rem` },
          h4: { fontSize: `${2 + (fontSize - 16) * 0.06}rem` },
          h5: { fontSize: `${1.5 + (fontSize - 16) * 0.05}rem` },
          h6: { fontSize: `${1.25 + (fontSize - 16) * 0.04}rem` },
          body1: { fontSize: `${1 + (fontSize - 16) * 0.03}rem` },
          body2: { fontSize: `${0.875 + (fontSize - 16) * 0.02}rem` },
          button: { fontSize: `${0.875 + (fontSize - 16) * 0.02}rem` },
          caption: { fontSize: `${0.75 + (fontSize - 16) * 0.015}rem` },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                // ADD THIS - Apply font size to body
                fontSize: `${fontSize}px`,
                scrollbarColor: mode === 'light' ? '#888 #f1f1f1' : '#555 #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  width: 8,
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: mode === 'light' ? '#888' : '#555',
                  minHeight: 24,
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: mode === 'light' ? '#555' : '#888',
                },
                '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                  backgroundColor: mode === 'light' ? '#f1f1f1' : '#2b2b2b',
                },
              },
            },
          },
        },
      }),
    [mode, fontSize, contrast, direction, colorPreset, colorPresets]
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleContrast = useCallback(() => {
    setContrast((prev) => (prev === 'default' ? 'bold' : 'default'));
  }, []);

  const toggleDirection = useCallback(() => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      contrast,
      direction,
      layout,
      colorPreset,
      fontSize,
      setMode,
      setFontSize,
      setContrast,
      setDirection,
      setLayout,
      setColorPreset,
      toggleMode,
      toggleContrast,
      toggleDirection,
      colorPresets,
    }),
    [
      mode,
      contrast,
      direction,
      layout,
      fontSize,
      colorPreset,
      toggleMode,
      toggleContrast,
      toggleDirection,
      colorPresets,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
