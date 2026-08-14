import chalk from 'chalk';
import { Theme, ThemeBorders, ThemeColors, ThemeIcons } from './types.js';

export const UNICODE_BORDERS: ThemeBorders = {
  topLeft: '┌',
  topRight: '┐',
  bottomLeft: '└',
  bottomRight: '┘',
  horizontal: '─',
  vertical: '│',
  cross: '┼',
  leftT: '├',
  rightT: '┤',
  topT: '┬',
  bottomT: '┴',
};

export const ASCII_BORDERS: ThemeBorders = {
  topLeft: '+',
  topRight: '+',
  bottomLeft: '+',
  bottomRight: '+',
  horizontal: '-',
  vertical: '|',
  cross: '+',
  leftT: '+',
  rightT: '+',
  topT: '+',
  bottomT: '+',
};

export const UNICODE_ICONS: ThemeIcons = {
  success: '✔',
  error: '✖',
  warning: '▲',
  info: 'ℹ',
  bullet: '•',
  arrowRight: '→',
  arrowDown: '↓',
  dot: '●',
  ellipsis: '…',
  sparkle: '✨',
  lock: '🔒',
  unlock: '🔓',
  terminal: '❯',
  database: '⛁',
  cloud: '☁',
  folder: '📁',
  file: '📄',
  sync: '↻',
  check: '✓',
  cross: '✗',
};

export const ASCII_ICONS: ThemeIcons = {
  success: '[OK]',
  error: '[ERR]',
  warning: '[!]',
  info: '[i]',
  bullet: '*',
  arrowRight: '->',
  arrowDown: 'v',
  dot: '*',
  ellipsis: '...',
  sparkle: '*',
  lock: '[L]',
  unlock: '[U]',
  terminal: '>',
  database: '[DB]',
  cloud: '[C]',
  folder: '[DIR]',
  file: '[FILE]',
  sync: '[SYNC]',
  check: 'v',
  cross: 'x',
};

// 1. Dark Theme (Standard Replit / Terminal palette: Warm Orange Accent, Crisp Slate Blues, Pure Whites)
export const DarkThemeColors: ThemeColors = {
  primary: chalk.hex('#F26207').bold,
  secondary: chalk.hex('#3B82F6'),
  accent: chalk.hex('#00D26A'),
  success: chalk.hex('#10B981').bold,
  warning: chalk.hex('#F59E0B').bold,
  error: chalk.hex('#EF4444').bold,
  info: chalk.hex('#0EA5E9'),
  muted: chalk.hex('#64748B'),
  subtle: chalk.hex('#475569'),
  border: chalk.hex('#334155'),
  highlight: chalk.hex('#F8FAFC').bold,
  code: chalk.hex('#E2E8F0'),
  bold: chalk.bold,
};

// 2. Light Theme (Clean slate for white/light terminal backgrounds)
export const LightThemeColors: ThemeColors = {
  primary: chalk.hex('#C2410C').bold,
  secondary: chalk.hex('#1D4ED8'),
  accent: chalk.hex('#047857'),
  success: chalk.hex('#059669').bold,
  warning: chalk.hex('#D97706').bold,
  error: chalk.hex('#DC2626').bold,
  info: chalk.hex('#0284C7'),
  muted: chalk.hex('#64748B'),
  subtle: chalk.hex('#94A3B8'),
  border: chalk.hex('#CBD5E1'),
  highlight: chalk.hex('#0F172A').bold,
  code: chalk.hex('#1E293B'),
  bold: chalk.bold,
};

// 3. Monochrome / No Color Theme (For CI/CD, screen readers, NO_COLOR=1)
const identity = (text: string) => text;
export const MonochromeThemeColors: ThemeColors = {
  primary: identity,
  secondary: identity,
  accent: identity,
  success: identity,
  warning: identity,
  error: identity,
  info: identity,
  muted: identity,
  subtle: identity,
  border: identity,
  highlight: identity,
  code: identity,
  bold: identity,
};
