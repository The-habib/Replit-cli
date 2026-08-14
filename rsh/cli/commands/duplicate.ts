import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { defaultSyncService } from '../../core/sync.js';
import { UI } from '../ui.js';

export function registerDuplicateCommand(program: Command): void {
  program
    .command('duplicate <repl> [newTitle]')
    .alias('fork')
    .description('Duplicate/fork an existing Replit project into a new Repl')
    .action(async (replArg: string, newTitleArg?: string) => {
      const spinner = UI.spinner(`Finding project '${replArg}'...`);
      try {
        const sourceRepl = await defaultProjectService.getProject(replArg);
        const title = newTitleArg || `${sourceRepl?.title || replArg} (Copy)`;

        spinner.text = `Duplicating '${sourceRepl?.title || replArg}' as '${title}'...`;

        const newRepl = await defaultProjectService.createProject({
          title,
          language: sourceRepl?.language || 'nodejs',
          isPrivate: sourceRepl?.isPrivate ?? false,
          description: `Fork of ${sourceRepl?.title || replArg}`,
        });

        spinner.succeed(`Duplicated to '${chalk.green(newRepl.title)}' (${newRepl.slug})`);
        console.log(`  ${chalk.bold('URL:')}      ${chalk.cyan(newRepl.url)}`);
        console.log(`  ${chalk.bold('Language:')} ${newRepl.language}`);
        console.log(`\nTo open interactive terminal:`);
        console.log(`  ${chalk.bold.yellow(`rsh shell ${newRepl.slug}`)}\n`);
      } catch (err: any) {
        spinner.fail(`Duplication failed: ${err.message}`);
      }
    });
}
