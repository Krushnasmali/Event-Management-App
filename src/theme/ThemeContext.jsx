// ThemeContext.jsx - Dark Navy Blue Theme (Locked)

import React, { createContext, useContext } from 'react';

// Dark Navy Blue / Black Theme Only
export const DARK_COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  background: '#0F1419', // Dark navy blue/black
  surface: '#1a202c',    // Slightly lighter navy
  surfaceAlt: '#232d3f',  // For contrast cards
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textLight: '#808080',
  border: '#2d3748',
  error: '#FF6B6B',
  success: '#51CF66',
  warning: '#FFE66D',
  info: '#4ECDC4',
  overlay: 'rgba(255, 255, 255, 0.08)',
  shadow: '#000000',
  shadowDark: 'rgba(0, 0, 0, 0.8)',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Dark mode is always ON - no toggle available
  const isDarkMode = true;
  const colors = DARK_COLORS;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
