import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerNewCommand(program: Command): void {
  program
    .command('new <title>')
    .alias('create')
    .description('Create a new Replit project')
    .option('-l, --lang <language>', 'Programming language / template', 'nodejs')
    .option('-p, --private', 'Create as private Repl', false)
    .option('-d, --desc <description>', 'Repl description')
    .action(async (title: string, options) => {
      const spinner = UI.spinner(`Creating Repl '${title}'...`);

      try {
        const repl = await defaultProjectService.createProject({
          title,
          language: options.lang,
          isPrivate: options.private,
          description: options.desc,
        });

        spinner.succeed(`Created Repl '${chalk.bold.green(repl.title)}' (${repl.slug})`);
        console.log(`  ${chalk.bold('URL:')}      ${chalk.cyan(repl.url)}`);
        console.log(`  ${chalk.bold('Language:')} ${repl.language}`);
        console.log(`  ${chalk.bold('Access:')}   ${repl.isPrivate ? 'Private' : 'Public'}\n`);
        console.log(`To open an interactive terminal:`);
        console.log(`  ${chalk.bold.yellow(`rsh shell ${repl.slug}`)}\n`);
      } catch (err: any) {
        spinner.fail(`Failed to create Repl: ${err.message}`);
      }
    });
}
