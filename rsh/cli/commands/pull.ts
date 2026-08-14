import { Command } from 'commander';
import chalk from 'chalk';
import { defaultSyncService } from '../../core/sync.js';
import { UI } from '../ui.js';

export function registerPullCommand(program: Command): void {
  program
    .command('pull [repl]')
    .description('Pull changes from remote Replit project into current directory')
    .action(async (replArg?: string) => {
      const spinner = UI.spinner('Pulling latest files from Replit...');

      try {
        const res = await defaultSyncService.pull(replArg);
        spinner.succeed(`Synchronized ${res.totalFiles} files from Replit.`);
        if (res.added.length > 0) {
          console.log(chalk.gray(`  Added:   ${res.added.join(', ')}`));
        }
        if (res.updated.length > 0) {
          console.log(chalk.gray(`  Updated: ${res.updated.join(', ')}`));
        }
      } catch (err: any) {
        spinner.fail(`Pull failed: ${err.message}`);
      }
    });
}
