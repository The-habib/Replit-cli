import chalk from 'chalk';
import { defaultThemeEngine } from '../theme/index.js';

export function renderDiff(filename: string, oldContent: string, newContent: string): string {
  const theme = defaultThemeEngine.getTheme();
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');

  const output: string[] = [];
  output.push(theme.colors.bold(`--- a/${filename}`));
  output.push(theme.colors.bold(`+++ b/${filename}`));

  const maxLen = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLen; i++) {
    const o = oldLines[i];
    const n = newLines[i];

    if (o === n) {
      if (o !== undefined) output.push(chalk.gray(`  ${o}`));
    } else {
      if (o !== undefined) output.push(chalk.red(`- ${o}`));
      if (n !== undefined) output.push(chalk.green(`+ ${n}`));
    }
  }

  return output.join('\n');
}
