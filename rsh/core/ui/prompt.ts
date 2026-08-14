import enquirer from 'enquirer';
import { defaultThemeEngine } from '../theme/index.js';
import { ReplInfo } from '../../api/types.js';
import chalk from 'chalk';

export async function promptProjectPicker(projects: ReplInfo[]): Promise<string> {
  const theme = defaultThemeEngine.getTheme();

  if (projects.length === 0) {
    return 'workspace';
  }

  const choices = projects.map((p) => ({
    name: p.slug,
    message: `${chalk.bold.white(p.title)} ${chalk.cyan(`(${p.language || 'generic'})`)}`,
    hint: p.isPrivate ? `${theme.icons.lock} private` : `${theme.icons.unlock} public`,
  }));

  try {
    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'selected',
      message: `${theme.icons.terminal} Select a Replit project to connect to:`,
      choices,
    });
    return res.selected;
  } catch {
    return 'workspace';
  }
}

export async function promptConfirm(message: string, initial: boolean = false): Promise<boolean> {
  try {
    const res = await (enquirer as any).prompt({
      type: 'confirm',
      name: 'confirmed',
      message,
      initial,
    });
    return Boolean(res.confirmed);
  } catch {
    return false;
  }
}
