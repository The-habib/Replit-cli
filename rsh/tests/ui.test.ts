import { describe, it, expect } from 'vitest';
import {
  renderBadge,
  renderCard,
  renderDiff,
  renderProgressBar,
  renderTable,
  renderTimeline,
  renderTree,
} from '../core/ui/index.js';
import { renderBox } from '../core/layout/box.js';
import { renderDivider } from '../core/layout/divider.js';
import { renderGrid } from '../core/layout/grid.js';
import { suggestCommand } from '../core/did-you-mean.js';
import { defaultThemeEngine } from '../core/theme/index.js';
import { defaultTerminal } from '../core/render/terminal.js';

describe('Design System v2 Primitives', () => {
  it('should render structured box container', () => {
    const box = renderBox(['Line 1', 'Line 2'], { title: 'Container' });
    expect(box).toContain('Container');
    expect(box).toContain('Line 1');
  });

  it('should render section divider', () => {
    const divider = renderDivider('Section A', 40);
    expect(divider).toContain('Section A');
  });

  it('should render responsive grid', () => {
    const grid = renderGrid([
      { content: ['Left 1', 'Left 2'] },
      { content: ['Right 1', 'Right 2'] },
    ]);
    expect(grid).toContain('Left 1');
    expect(grid).toContain('Right 1');
  });

  it('should render status badges', () => {
    const badge = renderBadge('ACTIVE', 'green');
    expect(badge).toContain('ACTIVE');
  });

  it('should render cards with icons and borders', () => {
    const card = renderCard('Everything is operational', { type: 'success', title: 'System OK' });
    expect(card).toContain('System OK');
    expect(card).toContain('Everything is operational');
  });

  it('should render responsive table with headers and borders', () => {
    const tbl = renderTable(['Name', 'Status'], [['App 1', 'Running'], ['App 2', 'Stopped']]);
    expect(tbl).toContain('NAME');
    expect(tbl).toContain('App 1');
    expect(tbl).toContain('Running');
  });

  it('should render hierarchical tree structure', () => {
    const tree = renderTree([
      {
        name: 'src',
        type: 'folder',
        children: [{ name: 'index.ts', type: 'file', metadata: '1.2kb' }],
      },
    ]);
    expect(tree).toContain('src');
    expect(tree).toContain('index.ts');
  });

  it('should render step progression timeline', () => {
    const timeline = renderTimeline([
      { title: 'Init', status: 'completed' },
      { title: 'Deploy', status: 'running', details: 'Building container' },
    ]);
    expect(timeline).toContain('Init');
    expect(timeline).toContain('Deploy');
    expect(timeline).toContain('Building container');
  });

  it('should render visual progress bar with percentage', () => {
    const bar = renderProgressBar(50, 100, { showPercent: true });
    expect(bar).toContain('50%');
  });

  it('should render syntax-colored diff viewer', () => {
    const diff = renderDiff('app.ts', 'const x = 1;', 'const x = 2;');
    expect(diff).toContain('--- a/app.ts');
    expect(diff).toContain('+++ b/app.ts');
  });

  it('should accurately suggest commands on typos', () => {
    const known = ['deploy', 'logs', 'shell', 'secrets', 'doctor'];
    const sugg1 = suggestCommand('deploi', known);
    expect(sugg1).toContain('deploy');

    const sugg2 = suggestCommand('shl', known);
    expect(sugg2).toContain('shell');

    const sugg3 = suggestCommand('sec', known);
    expect(sugg3).toContain('secrets');
  });
});
