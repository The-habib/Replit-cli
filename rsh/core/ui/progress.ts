import { defaultThemeEngine } from '../theme/index.js';

export interface ProgressBarOptions {
  width?: number;
  showPercent?: boolean;
  unit?: string;
}

export function renderProgressBar(
  current: number,
  total: number,
  options: ProgressBarOptions = {}
): string {
  const theme = defaultThemeEngine.getTheme();
  const width = options.width || 24;
  const ratio = Math.min(1, Math.max(0, current / (total || 1)));
  const completedWidth = Math.round(ratio * width);
  const remainingWidth = width - completedWidth;

  const filledChar = theme.unicode ? '█' : '=';
  const emptyChar = theme.unicode ? '░' : '-';

  const bar =
    theme.colors.primary(filledChar.repeat(completedWidth)) +
    theme.colors.border(emptyChar.repeat(remainingWidth));

  const percentStr = options.showPercent !== false ? ` ${Math.round(ratio * 100)}%` : '';
  const countStr = options.unit ? ` (${current}/${total} ${options.unit})` : '';

  return `[${bar}]${percentStr}${countStr}`;
}
