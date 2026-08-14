import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerLsCommand(program: Command): void {
  program
    .command('ls')
    .alias('list')
    .description('List your Replit projects')
    .option('-u, --user <username>', 'List Repls for a specific user')
    .option('--json', 'Output list as JSON')
    .action(async (options) => {
      const spinner = UI.spinner('Fetching Replit projects...');

      try {
        const repls = await defaultProjectService.listProjects(options.user);
        spinner.stop();

        if (options.json) {
          console.log(JSON.stringify(repls, null, 2));
          return;
        }

        if (repls.length === 0) {
          UI.info('No Repls found. Create one with `rsh new "My Project"`.');
          return;
        }

        console.log(`\n${chalk.bold('Replit Projects')} (${repls.length} total):\n`);

        const headers = ['TITLE / SLUG', 'LANGUAGE', 'VISIBILITY', 'UPDATED', 'URL'];
        const rows = repls.map((r) => [
          chalk.bold.white(r.title),
          chalk.cyan(r.language || 'generic'),
          r.isPrivate ? chalk.yellow('Private') : chalk.green('Public'),
          r.timeUpdated ? new Date(r.timeUpdated).toLocaleDateString() : 'recent',
          chalk.gray(r.url),
        ]);

        UI.table(headers, rows);
        console.log('');
      } catch (err: any) {
        spinner.fail(`Failed to list projects: ${err.message}`);
      }
    });
}
