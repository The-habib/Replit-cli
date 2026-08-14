import { defaultThemeEngine } from '../theme/index.js';

export interface TreeNode {
  name: string;
  type?: 'file' | 'folder';
  children?: TreeNode[];
  metadata?: string;
}

export function renderTree(nodes: TreeNode[], prefix: string = ''): string {
  const theme = defaultThemeEngine.getTheme();
  const lines: string[] = [];

  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const branch = isLast ? '└── ' : '├── ';
    const icon = node.type === 'folder' ? `${theme.icons.folder} ` : `${theme.icons.file} `;
    const nameStr = node.type === 'folder' ? theme.colors.bold(node.name) : node.name;
    const metaStr = node.metadata ? theme.colors.muted(` (${node.metadata})`) : '';

    lines.push(`${theme.colors.border(prefix + branch)}${icon}${nameStr}${metaStr}`);

    if (node.children && node.children.length > 0) {
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(renderTree(node.children, nextPrefix));
    }
  });

  return lines.join('\n');
}
