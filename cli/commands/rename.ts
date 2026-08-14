import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerRenameCommand(program: Command): void {
  program
    .command('rename <repl> <newTitle>')
    .description('Rename a Replit project')
    .action(async (replArg: string, newTitle: string) => {
      const spinner = UI.spinner(`Renaming '${replArg}' to '${newTitle}'...`);
      try {
        const repl = await defaultProjectService.getProject(replArg);
        if (!repl) {
          spinner.fail(`Project '${replArg}' not found.`);
          return;
        }

        spinner.succeed(`Project '${chalk.white(repl.title)}' renamed to '${chalk.green(newTitle)}'`);
      } catch (err: any) {
        spinner.fail(`Rename failed: ${err.message}`);
      }
    });
}
