import { Command } from 'commander';
import chalk from 'chalk';
import { defaultSyncService } from '../../core/sync.js';
import { UI } from '../ui.js';

export function registerPushCommand(program: Command): void {
  program
    .command('push [repl]')
    .description('Push local workspace files to remote Replit project')
    .action(async (replArg?: string) => {
      const spinner = UI.spinner('Pushing workspace files to Replit...');

      try {
        const res = await defaultSyncService.push(replArg);
        spinner.succeed(`Pushed ${res.totalFiles} files to Replit container.`);
        console.log(chalk.gray(`  Synced files: ${res.updated.slice(0, 5).join(', ')}${res.updated.length > 5 ? ' ...' : ''}`));
      } catch (err: any) {
        spinner.fail(`Push failed: ${err.message}`);
      }
    });
}
