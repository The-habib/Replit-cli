import { defaultThemeEngine } from '../theme/index.js';
import { renderBox } from '../layout/box.js';
import chalk from 'chalk';

export interface EditorialErrorOptions {
  title: string;
  what: string;
  why?: string;
  howToFix?: string[];
  debugCommand?: string;
  errorCode?: string;
}

export function renderEditorialError(options: EditorialErrorOptions): string {
  const theme = defaultThemeEngine.getTheme();
  const lines: string[] = [];

  // Code badge
  if (options.errorCode) {
    lines.push(`${theme.colors.muted('Code:')} ${theme.colors.error(options.errorCode)}\n`);
  }

  // 1. What happened
  lines.push(`${theme.colors.bold('What happened:')}`);
  lines.push(`  ${options.what}\n`);

  // 2. Why it occurred
  if (options.why) {
    lines.push(`${theme.colors.bold('Possible cause:')}`);
    lines.push(`  ${options.why}\n`);
  }

  // 3. How to fix
  if (options.howToFix && options.howToFix.length > 0) {
    lines.push(`${theme.colors.bold('How to resolve:')}`);
    options.howToFix.forEach((step, idx) => {
      lines.push(`  ${idx + 1}. ${step}`);
    });
    lines.push('');
  }

  // 4. Debug Command suggestion
  if (options.debugCommand) {
    lines.push(`${theme.colors.muted('For detailed logs, run:')}`);
    lines.push(`  ${theme.colors.code(chalk.yellow(options.debugCommand))}`);
  }

  return renderBox(lines, {
    title: `${theme.icons.error} ${options.title}`,
    borderColor: theme.colors.error,
    padding: 1,
  });
}
