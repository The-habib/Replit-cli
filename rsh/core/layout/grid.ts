import { defaultTerminal } from '../render/terminal.js';
import { padEndVisible, visibleLength } from '../render/string-utils.js';

export interface GridColumn {
  width?: number; // exact or flex
  content: string[];
}

export function renderGrid(columns: GridColumn[], spacing: number = 3): string {
  const isCompact = defaultTerminal.isCompact();
  const termWidth = defaultTerminal.getColumns();

  // On compact viewports (mobile/Termux), stack columns vertically
  if (isCompact || columns.length <= 1) {
    return columns.map((col) => col.content.join('\n')).join('\n\n');
  }

  // Compute column widths
  const numCols = columns.length;
  const totalSpacing = spacing * (numCols - 1);
  const availableWidth = Math.max(20, termWidth - totalSpacing);
  const defaultColWidth = Math.floor(availableWidth / numCols);

  const colWidths = columns.map((col) => col.width || defaultColWidth);
  const maxRows = Math.max(...columns.map((col) => col.content.length));

  const lines: string[] = [];
  const spaceStr = ' '.repeat(spacing);

  for (let r = 0; r < maxRows; r++) {
    const rowSegments: string[] = [];
    for (let c = 0; c < numCols; c++) {
      const cellText = columns[c].content[r] || '';
      rowSegments.push(padEndVisible(cellText, colWidths[c]));
    }
    lines.push(rowSegments.join(spaceStr));
  }

  return lines.join('\n');
}
