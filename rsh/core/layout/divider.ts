import { defaultThemeEngine } from '../theme/index.js';
import { defaultTerminal } from '../render/terminal.js';
import { visibleLength } from '../render/string-utils.js';

export function renderDivider(label?: string, width?: number): string {
  const theme = defaultThemeEngine.getTheme();
  const termWidth = width || defaultTerminal.getColumns();
  const borderChar = theme.borders.horizontal;

  if (!label) {
    return theme.colors.border(borderChar.repeat(termWidth));
  }

  const labelText = ` ${label} `;
  const labelLen = visibleLength(labelText);
  const remaining = Math.max(0, termWidth - labelLen - 3);

  return (
    theme.colors.border(borderChar.repeat(3)) +
    theme.colors.bold(labelText) +
    theme.colors.border(borderChar.repeat(remaining))
  );
}
