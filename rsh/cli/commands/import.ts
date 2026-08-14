import { Command } from 'commander';
import chalk from 'chalk';
import { defaultProjectService } from '../../core/project.js';
import { defaultSyncService } from '../../core/sync.js';
import { UI } from '../ui.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function registerImportCommand(program: Command): void {
  program
    .command('import <githubUrl> [title]')
    .description('Import a GitHub repository into a new Replit project workspace')
    .action(async (githubUrl: string, titleArg?: string) => {
      const repoName = titleArg || githubUrl.split('/').pop()?.replace('.git', '') || 'imported-repo';
      const spinner = UI.spinner(`Importing repository '${githubUrl}' into '${repoName}'...`);

      try {
        const repl = await defaultProjectService.createProject({
          title: repoName,
          language: 'generic',
          description: `Imported from ${githubUrl}`,
        });

        // Clone git repo locally into directory
        try {
          await execAsync(`git clone "${githubUrl}" "${repoName}"`);
        } catch {
          // If git clone fails, scaffold using syncService
          await defaultSyncService.clone(repoName, repoName);
        }

        spinner.succeed(`Imported '${chalk.green(githubUrl)}' to '${chalk.cyan(repl.title)}'`);
        console.log(`\nNext steps:`);
        console.log(`  cd ${repoName}`);
        console.log(`  ${chalk.bold.yellow('rsh shell')}\n`);
      } catch (err: any) {
        spinner.fail(`Import failed: ${err.message}`);
      }
    });
}
