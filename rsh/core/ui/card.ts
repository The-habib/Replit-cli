import { defaultThemeEngine } from '../theme/index.js';
import { renderBox } from '../layout/box.js';
import chalk from 'chalk';

export type CardType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface CardOptions {
  title?: string;
  type?: CardType;
  padding?: number;
  footer?: string;
}

export function renderCard(body: string | string[], options: CardOptions = {}): string {
  const theme = defaultThemeEngine.getTheme();
  const type = options.type || 'neutral';

  let borderColor = theme.colors.border;
  let icon = '';
  let titlePrefix = '';

  switch (type) {
    case 'info':
      borderColor = theme.colors.info;
      icon = `${theme.icons.info} `;
      titlePrefix = 'INFO: ';
      break;
    case 'success':
      borderColor = theme.colors.success;
      icon = `${theme.icons.success} `;
      titlePrefix = 'SUCCESS: ';
      break;
    case 'warning':
      borderColor = theme.colors.warning;
      icon = `${theme.icons.warning} `;
      titlePrefix = 'WARNING: ';
      break;
    case 'error':
      borderColor = theme.colors.error;
      icon = `${theme.icons.error} `;
      titlePrefix = 'ERROR: ';
      break;
  }

  const title = options.title ? `${icon}${options.title}` : undefined;

  return renderBox(body, {
    title,
    padding: options.padding ?? 1,
    borderColor,
  });
}
