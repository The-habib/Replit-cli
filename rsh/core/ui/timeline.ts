import { defaultThemeEngine } from '../theme/index.js';

export interface TimelineStep {
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  details?: string;
}

export function renderTimeline(steps: TimelineStep[]): string {
  const theme = defaultThemeEngine.getTheme();
  const lines: string[] = [];

  steps.forEach((step, idx) => {
    const isLast = idx === steps.length - 1;
    let icon = '';
    let titleStr = step.title;

    switch (step.status) {
      case 'completed':
        icon = theme.colors.success(theme.icons.check);
        titleStr = theme.colors.bold(step.title);
        break;
      case 'running':
        icon = theme.colors.primary(theme.icons.dot);
        titleStr = theme.colors.primary(step.title);
        break;
      case 'failed':
        icon = theme.colors.error(theme.icons.cross);
        titleStr = theme.colors.error(step.title);
        break;
      case 'pending':
      default:
        icon = theme.colors.muted('○');
        titleStr = theme.colors.muted(step.title);
        break;
    }

    lines.push(`  ${icon}  ${titleStr}`);

    if (step.details) {
      const bar = isLast ? '   ' : theme.colors.border('│  ');
      lines.push(`  ${bar}  ${theme.colors.muted(step.details)}`);
    }

    if (!isLast) {
      lines.push(`  ${theme.colors.border('│')}`);
    }
  });

  return lines.join('\n');
}
