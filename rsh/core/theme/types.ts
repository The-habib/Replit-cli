export type ColorMode = 'dark' | 'light' | 'monochrome' | 'high-contrast';

export interface ThemeColors {
  primary: (text: string) => string;
  secondary: (text: string) => string;
  accent: (text: string) => string;
  success: (text: string) => string;
  warning: (text: string) => string;
  error: (text: string) => string;
  info: (text: string) => string;
  muted: (text: string) => string;
  subtle: (text: string) => string;
  border: (text: string) => string;
  highlight: (text: string) => string;
  code: (text: string) => string;
  bold: (text: string) => string;
}

export interface ThemeBorders {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
  cross: string;
  leftT: string;
  rightT: string;
  topT: string;
  bottomT: string;
}

export interface ThemeIcons {
  success: string;
  error: string;
  warning: string;
  info: string;
  bullet: string;
  arrowRight: string;
  arrowDown: string;
  dot: string;
  ellipsis: string;
  sparkle: string;
  lock: string;
  unlock: string;
  terminal: string;
  database: string;
  cloud: string;
  folder: string;
  file: string;
  sync: string;
  check: string;
  cross: string;
}

export interface Theme {
  name: string;
  mode: ColorMode;
  colors: ThemeColors;
  borders: ThemeBorders;
  icons: ThemeIcons;
  unicode: boolean;
}
