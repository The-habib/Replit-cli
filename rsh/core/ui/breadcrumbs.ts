import { defaultThemeEngine } from '../theme/index.js';
import chalk from 'chalk';

export function renderBreadcrumbs(crumbs: string[]): string {
  const theme = defaultThemeEngine.getTheme();
  const sep = ` ${theme.colors.muted(theme.icons.arrowRight)} `;

  const formatted = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (idx === 0) {
      return theme.colors.primary(chalk.bold(crumb));
    }
    return isLast ? theme.colors.highlight(crumb) : theme.colors.muted(crumb);
  });

  return `\n${theme.icons.terminal} ${formatted.join(sep)}\n`;
}
