import chalk from 'chalk';
import { defaultThemeEngine } from '../theme/index.js';

export type BadgeVariant = 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'gray';

export function renderBadge(text: string, variant: BadgeVariant = 'gray'): string {
  const theme = defaultThemeEngine.getTheme();

  if (theme.mode === 'monochrome') {
    return `[${text.toUpperCase()}]`;
  }

  switch (variant) {
    case 'green':
      return chalk.bgHex('#064E3B').hex('#34D399').bold(` ${text.toUpperCase()} `);
    case 'blue':
      return chalk.bgHex('#1E3A8A').hex('#60A5FA').bold(` ${text.toUpperCase()} `);
    case 'yellow':
      return chalk.bgHex('#78350F').hex('#FBBF24').bold(` ${text.toUpperCase()} `);
    case 'red':
      return chalk.bgHex('#7F1D1D').hex('#F87171').bold(` ${text.toUpperCase()} `);
    case 'purple':
      return chalk.bgHex('#581C87').hex('#C084FC').bold(` ${text.toUpperCase()} `);
    case 'gray':
    default:
      return chalk.bgHex('#1E293B').hex('#94A3B8').bold(` ${text.toUpperCase()} `);
  }
}
