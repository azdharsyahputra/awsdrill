import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

// Token names follow DESIGN.md (Pass-Mark Green, Study Desk, Sheet White, Notebook Ink, Pencil Grey, Ruled Line…).
const light = {
  bg: '#f3f5f4', surface: '#ffffff', fg: '#17201d', muted: '#5d6b66', line: '#d9e0dd',
  accent: '#0f7a5c', accentInk: '#ffffff', accentSoft: '#e1f1eb', accentPressed: '#0b6049',
  ok: '#1d7a3a', okSoft: '#e3f4e7', bad: '#b3261e', badSoft: '#fbe9e7', warn: '#a65f00',
  d: { 1: '#2f6fb0', 2: '#b3261e', 3: '#0f7a5c', 4: '#a65f00' },
  // Soft sheet: ambient depth for sheets and answer options (The Paper On A Desk Rule).
  sheetShadow: Platform.select({
    web: { boxShadow: '0 1px 2px rgba(23,32,29,0.06), 0 4px 14px rgba(23,32,29,0.06)' },
    default: { shadowColor: '#17201d', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  }),
};
const dark = {
  bg: '#101614', surface: '#18201d', fg: '#e6ece9', muted: '#9aa8a2', line: '#2a3531',
  accent: '#3fc398', accentInk: '#06231a', accentSoft: '#183a2f', accentPressed: '#35a984',
  ok: '#5fd27f', okSoft: '#173523', bad: '#ff8a80', badSoft: '#3d1a18', warn: '#f0b24a',
  d: { 1: '#7fb2ea', 2: '#ff8a80', 3: '#3fc398', 4: '#f0b24a' },
  // In dark mode depth comes from the lighter sheet tone, not shadow.
  sheetShadow: {},
};
export const themes = { light, dark };
export const mono = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'ui-monospace, Menlo, monospace' });

// Minimum touch target: 44pt (iOS HIG) / 48dp (Material). Use the larger so one value serves both.
export const TOUCH = 48;

export const ThemeContext = createContext(light);
export const useTheme = () => useContext(ThemeContext);
