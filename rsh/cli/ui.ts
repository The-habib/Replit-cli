import chalk from 'chalk';
import ora, { Ora } from 'ora';
import {
  BadgeVariant,
  createSpinner,
  renderBadge,
  renderBanner,
  renderCard,
  renderCommandHeader,
  renderDiff,
  renderEditorialError,
  renderProgressBar,
  renderTable,
  renderTimeline,
  renderTree,
  SpinnerContext,
  TimelineStep,
  TreeNode,
} from '../core/ui/index.js';
import { defaultThemeEngine } from '../core/theme/index.js';

export class UI {
  public static banner(): void {
    console.log(renderBanner());
  }

  public static header(title: string, subtitle?: string): void {
    console.log(renderCommandHeader(title, subtitle));
  }

  public static success(msg: string): void {
    const theme = defaultThemeEngine.getTheme();
    console.log(`${theme.colors.success(theme.icons.check)} ${msg}`);
  }

  public static error(msg: string): void {
    const theme = defaultThemeEngine.getTheme();
    console.error(`${theme.colors.error(theme.icons.cross)} ${msg}`);
  }

  public static warn(msg: string): void {
    const theme = defaultThemeEngine.getTheme();
    console.warn(`${theme.colors.warning(theme.icons.warning)} ${msg}`);
  }

  public static info(msg: string): void {
    const theme = defaultThemeEngine.getTheme();
    console.log(`${theme.colors.info(theme.icons.info)} ${msg}`);
  }

  public static spinner(text: string, context?: SpinnerContext): Ora {
    return createSpinner(text, context);
  }

  public static table(headers: string[], rows: string[][]): void {
    console.log(renderTable(headers, rows));
  }

  public static badge(text: string, variant: BadgeVariant = 'gray'): string {
    return renderBadge(text, variant);
  }

  public static card(body: string | string[], options?: any): string {
    return renderCard(body, options);
  }

  public static tree(nodes: TreeNode[]): void {
    console.log(renderTree(nodes));
  }

  public static timeline(steps: TimelineStep[]): void {
    console.log(renderTimeline(steps));
  }

  public static diff(filename: string, oldContent: string, newContent: string): void {
    console.log(renderDiff(filename, oldContent, newContent));
  }

  public static progress(current: number, total: number, options?: any): string {
    return renderProgressBar(current, total, options);
  }

  public static editorialError(options: any): void {
    console.error(renderEditorialError(options));
  }
}
