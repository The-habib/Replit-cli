import { defaultThemeEngine } from '../theme/index.js';
import { defaultTerminal } from '../render/terminal.js';
import { padEndVisible, truncate, visibleLength } from '../render/string-utils.js';

export interface TableOptions {
  padding?: number;
  compactColumns?: number[]; // indices of columns to keep on compact screens
}

export function renderTable(
  headers: string[],
  rows: string[][],
  options: TableOptions = {}
): string {
  const theme = defaultThemeEngine.getTheme();
  const termWidth = defaultTerminal.getColumns();
  const isCompact = defaultTerminal.isCompact();

  let activeHeaders = headers;
  let activeRows = rows;

  // On compact viewports (mobile / narrow terminals < 65 cols), retain only first 2-3 columns
  if (isCompact && headers.length > 2) {
    const keepIndices = options.compactColumns || [0, 1];
    activeHeaders = keepIndices.map((i) => headers[i]);
    activeRows = rows.map((row) => keepIndices.map((i) => row[i] || ''));
  }

  // Calculate maximum column widths
  const colWidths = activeHeaders.map((header, colIndex) => {
    const maxRowLen = activeRows.reduce((max, row) => {
      const cell = row[colIndex] || '';
      return Math.max(max, visibleLength(cell));
    }, 0);
    return Math.max(visibleLength(header), maxRowLen);
  });

  // Calculate spacing & constraint to terminal width
  const spacing = 3;
  const totalSpacing = spacing * (activeHeaders.length - 1);
  const totalContentWidth = colWidths.reduce((sum, w) => sum + w, 0);

  if (totalContentWidth + totalSpacing > termWidth) {
    // Shrink the widest column to fit
    const overflow = totalContentWidth + totalSpacing - termWidth;
    let maxIdx = 0;
    let maxW = 0;
    colWidths.forEach((w, i) => {
      if (w > maxW) {
        maxW = w;
        maxIdx = i;
      }
    });
    colWidths[maxIdx] = Math.max(10, maxW - overflow);
  }

  const lines: string[] = [];
  const spaceStr = ' '.repeat(spacing);

  // 1. Header row
  const formattedHeaders = activeHeaders.map((h, i) =>
    theme.colors.muted(padEndVisible(h.toUpperCase(), colWidths[i]))
  );
  lines.push(formattedHeaders.join(spaceStr));

  // 2. Underline row
  const totalRowLen = Math.min(termWidth, colWidths.reduce((sum, w) => sum + w, 0) + totalSpacing);
  lines.push(theme.colors.border(theme.borders.horizontal.repeat(totalRowLen)));

  // 3. Data rows
  for (const row of activeRows) {
    const formattedCells = row.map((cell, i) => {
      const cellLen = colWidths[i] || 10;
      const cleanText = truncate(cell, cellLen);
      return padEndVisible(cleanText, cellLen);
    });
    lines.push(formattedCells.join(spaceStr));
  }

  return lines.join('\n');
}
