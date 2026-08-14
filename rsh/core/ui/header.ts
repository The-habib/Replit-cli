import { defaultThemeEngine } from '../theme/index.js';

export function renderBanner(): string {
  const theme = defaultThemeEngine.getTheme();

  return `
  ${theme.colors.primary('____  ____  _   _')}  ${theme.colors.bold('— Universal Replit Shell CLI (rsh)')}
 ${theme.colors.primary('|  _ \\/ ___|| | | |')}
 ${theme.colors.primary('| |_) \\___ \\| |_| |')}   ${theme.colors.muted('The command-line companion for Replit')}
 ${theme.colors.primary('|  _ < ___) |  _  |')}
 ${theme.colors.primary('|_| \\_\\____/|_| |_|')}
`;
}

export function renderCommandHeader(commandTitle: string, subtitle?: string): string {
  const theme = defaultThemeEngine.getTheme();
  let out = `\n${theme.colors.primary(theme.icons.terminal)} ${theme.colors.bold(commandTitle)}`;
  if (subtitle) {
    out += ` ${theme.colors.muted(`— ${subtitle}`)}`;
  }
  return out + '\n';
}
