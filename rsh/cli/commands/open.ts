import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerOpenCommand(program: Command): void {
  program
    .command('open [repl]')
    .description('Open a Replit project in your default browser')
    .action(async (replArg) => {
      const target = replArg || process.env.REPL_SLUG || 'workspace';
      const spinner = UI.spinner(`Opening ${target} in browser...`);

      try {
        const url = await defaultProjectService.openInBrowser(target);
        spinner.succeed(`Opened ${chalk.cyan(url)}`);
      } catch (err: any) {
        spinner.fail(`Could not open browser: ${err.message}`);
      }
    });
}
