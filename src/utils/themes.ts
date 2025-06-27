// Simplified theme configuration system with only dark and white themes

import type { Theme } from '../types';
import { ErrorHandler, ErrorSeverity, ErrorSource } from './errorHandler';

export const themes: Record<string, Theme> = {
  white: {
    name: 'White',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    font: 'Inter, system-ui, sans-serif',
    txAnimation: 'blockchain-3d'
  },
  dark: {
    name: 'Dark',
    primary: '#3b82f6',
    secondary: '#2563eb',
    accent: '#60a5fa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    success: '#22c55e',
    warning: '#eab308',
    error: '#f87171',
    font: 'Inter, system-ui, sans-serif',
    txAnimation: 'pulse'
  }
};

export const applyTheme = (theme: Theme): void => {
  try {
    if (!theme) {
      throw new Error('Theme is undefined or null');
    }
    
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-text-secondary', theme.textSecondary);
    root.style.setProperty('--color-success', theme.success);
    root.style.setProperty('--color-warning', theme.warning);
    root.style.setProperty('--color-error', theme.error);
    root.style.setProperty('--font-family', theme.font);
    
    // Apply background color to body
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    
    // Update theme-specific classes
    const themeClass = `theme-${theme.name.toLowerCase()}`;
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(themeClass);
  } catch (error) {
    ErrorHandler.handleError(
      `Failed to apply theme: ${error}`,
      ErrorSeverity.WARNING,
      ErrorSource.UI
    );
    
    // Apply fallback theme
    try {
      const fallbackTheme = themes.white;
      const root = document.documentElement;
      
      root.style.setProperty('--color-background', fallbackTheme.background);
      root.style.setProperty('--color-surface', fallbackTheme.surface);
      root.style.setProperty('--color-text', fallbackTheme.text);
      
      document.body.style.backgroundColor = fallbackTheme.background;
      document.body.style.color = fallbackTheme.text;
    } catch (fallbackError) {
      console.error('Critical theme error, could not apply fallback:', fallbackError);
    }
  }
};

// Get theme by name with error handling
export const getThemeByName = (themeName: string): Theme => {
  try {
    const theme = themes[themeName];
    if (!theme) {
      throw new Error(`Theme "${themeName}" not found`);
    }
    return theme;
  } catch (error) {
    ErrorHandler.handleError(
      `Failed to get theme "${themeName}": ${error}`,
      ErrorSeverity.WARNING,
      ErrorSource.UI
    );
    return themes.white; // Fallback to white theme
  }
};