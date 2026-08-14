import { Command } from 'commander';
import chalk from 'chalk';
import { defaultSyncService } from '../../core/sync.js';
import { UI } from '../ui.js';

export function registerCloneCommand(program: Command): void {
  program
    .command('clone <repl> [dir]')
    .description('Clone a Replit project into a local workspace directory')
    .action(async (replArg: string, dirArg?: string) => {
      const spinner = UI.spinner(`Cloning ${replArg}...`);

      try {
        const res = await defaultSyncService.clone(replArg, dirArg);
        spinner.succeed(`Cloned '${chalk.green(res.title)}' to ${chalk.cyan(res.dir)}`);
        console.log(`\nNext steps:`);
        console.log(`  cd ${res.dir}`);
        console.log(`  ${chalk.bold.yellow('rsh shell')}\n`);
      } catch (err: any) {
        spinner.fail(`Clone failed: ${err.message}`);
      }
    });
}
