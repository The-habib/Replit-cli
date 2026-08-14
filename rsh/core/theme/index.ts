import { ColorMode, Theme } from './types.js';
import {
  ASCII_BORDERS,
  ASCII_ICONS,
  DarkThemeColors,
  LightThemeColors,
  MonochromeThemeColors,
  UNICODE_BORDERS,
  UNICODE_ICONS,
} from './tokens.js';

export class ThemeEngine {
  private currentTheme: Theme;

  constructor() {
    this.currentTheme = this.detectOptimalTheme();
  }

  public detectOptimalTheme(): Theme {
    const isNoColor = Boolean(process.env.NO_COLOR || process.env.NODE_DISABLE_COLORS);
    const isDumbTerm = process.env.TERM === 'dumb';
    const isWindowsLegacy = process.platform === 'win32' && !process.env.WT_SESSION && !process.env.ConEmuPID;

    const useUnicode = !isDumbTerm && (process.env.LANG?.includes('UTF-8') || process.env.LC_ALL?.includes('UTF-8') || !isWindowsLegacy);

    if (isNoColor || isDumbTerm) {
      return {
        name: 'monochrome',
        mode: 'monochrome',
        colors: MonochromeThemeColors,
        borders: useUnicode ? UNICODE_BORDERS : ASCII_BORDERS,
        icons: useUnicode ? UNICODE_ICONS : ASCII_ICONS,
        unicode: useUnicode,
      };
    }

    const isLightTerminal = process.env.COLORFGBG?.endsWith(';15') || process.env.COLORFGBG?.endsWith(';7');

    return {
      name: isLightTerminal ? 'light' : 'dark',
      mode: isLightTerminal ? 'light' : 'dark',
      colors: isLightTerminal ? LightThemeColors : DarkThemeColors,
      borders: useUnicode ? UNICODE_BORDERS : ASCII_BORDERS,
      icons: useUnicode ? UNICODE_ICONS : ASCII_ICONS,
      unicode: useUnicode,
    };
  }

  public getTheme(): Theme {
    return this.currentTheme;
  }

  public setMode(mode: ColorMode): void {
    if (mode === 'monochrome') {
      this.currentTheme.mode = 'monochrome';
      this.currentTheme.colors = MonochromeThemeColors;
    } else if (mode === 'light') {
      this.currentTheme.mode = 'light';
      this.currentTheme.colors = LightThemeColors;
    } else {
      this.currentTheme.mode = 'dark';
      this.currentTheme.colors = DarkThemeColors;
    }
  }
}

export const defaultThemeEngine = new ThemeEngine();
export const theme = defaultThemeEngine.getTheme();
