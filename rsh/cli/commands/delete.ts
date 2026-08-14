import { Command } from 'commander';
import chalk from 'chalk';
import enquirer from 'enquirer';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerDeleteCommand(program: Command): void {
  program
    .command('delete <repl>')
    .alias('rm')
    .description('Delete a Replit project')
    .option('-y, --yes', 'Skip confirmation prompt', false)
    .action(async (replArg: string, options) => {
      try {
        const repl = await defaultProjectService.getProject(replArg);
        if (!repl) {
          UI.error(`Project '${replArg}' not found.`);
          return;
        }

        if (!options.yes) {
          const res = await (enquirer as any).prompt({
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to permanently delete '${repl.title}' (${repl.slug})?`,
            initial: false,
          });

          if (!res.confirm) {
            UI.info('Deletion cancelled.');
            return;
          }
        }

        const spinner = UI.spinner(`Deleting Repl '${repl.title}'...`);
        const ok = await defaultProjectService.deleteProject(repl.id);
        if (ok) {
          spinner.succeed(`Deleted Repl '${chalk.bold.red(repl.title)}' (${repl.id})`);
        } else {
          spinner.fail(`Failed to delete Repl '${repl.title}'`);
        }
      } catch (err: any) {
        UI.error(`Delete failed: ${err.message}`);
      }
    });
}
