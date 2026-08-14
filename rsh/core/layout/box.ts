import { defaultThemeEngine } from '../theme/index.js';
import { defaultTerminal } from '../render/terminal.js';
import { padEndVisible, stripAnsi, visibleLength, wrapText } from '../render/string-utils.js';

export interface BoxOptions {
  title?: string;
  padding?: number;
  minWidth?: number;
  maxWidth?: number;
  borderColor?: (text: string) => string;
  style?: 'rounded' | 'single' | 'double' | 'none';
}

export function renderBox(content: string | string[], options: BoxOptions = {}): string {
  const theme = defaultThemeEngine.getTheme();
  const termWidth = defaultTerminal.getColumns();
  const padding = options.padding ?? 1;
  const borderColor = options.borderColor || theme.colors.border;

  const rawLines = Array.isArray(content) ? content : content.split('\n');

  // Compute inner content width
  const maxContentLen = Math.max(...rawLines.map((l) => visibleLength(l)), options.title ? visibleLength(options.title) + 4 : 0);
  const targetInnerWidth = Math.min(
    Math.max(maxContentLen, options.minWidth || 20),
    (options.maxWidth || termWidth) - 4
  );

  // Wrap all lines to target inner width
  const lines: string[] = [];
  for (const rawLine of rawLines) {
    if (visibleLength(rawLine) > targetInnerWidth) {
      lines.push(...wrapText(rawLine, targetInnerWidth));
    } else {
      lines.push(rawLine);
    }
  }

  const b = theme.borders;
  const padStr = ' '.repeat(padding);
  const innerWidthWithPadding = targetInnerWidth + padding * 2;

  // Header line
  let header = '';
  if (options.title) {
    const titleText = ` ${options.title} `;
    const remainingBorder = Math.max(0, innerWidthWithPadding - visibleLength(titleText) - 1);
    header =
      borderColor(b.topLeft + b.horizontal) +
      theme.colors.bold(titleText) +
      borderColor(b.horizontal.repeat(remainingBorder) + b.topRight);
  } else {
    header = borderColor(b.topLeft + b.horizontal.repeat(innerWidthWithPadding) + b.topRight);
  }

  const output: string[] = [header];

  // Content lines with padding
  for (const line of lines) {
    const paddedLine = padEndVisible(line, targetInnerWidth);
    output.push(
      borderColor(b.vertical) +
      padStr +
      paddedLine +
      padStr +
      borderColor(b.vertical)
    );
  }

  // Footer line
  const footer = borderColor(b.bottomLeft + b.horizontal.repeat(innerWidthWithPadding) + b.bottomRight);
  output.push(footer);

  return output.join('\n');
}
