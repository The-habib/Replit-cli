import { Command } from 'commander';
import chalk from 'chalk';
import { defaultUpdateChecker } from '../../core/update.js';
import { UI } from '../ui.js';

export function registerUpdateCommand(program: Command): void {
  program
    .command('update')
    .alias('upgrade')
    .description('Check for updates and display upgrade instructions')
    .action(async () => {
      const spinner = UI.spinner('Checking for rsh updates...');
      try {
        const info = await defaultUpdateChecker.checkForUpdate();
        spinner.stop();

        console.log(`\n${chalk.bold('Current Version:')} ${chalk.cyan(info.currentVersion)}`);
        console.log(`${chalk.bold('Latest Version:')}  ${chalk.cyan(info.latestVersion)}`);

        if (info.hasUpdate) {
          UI.success(`A new version of rsh is available: v${info.latestVersion}!`);
          console.log(`\nTo update, run:`);
          console.log(`  ${chalk.bold.yellow('npm install -g rsh')}`);
          console.log(`  or re-run the universal installer:`);
          console.log(`  ${chalk.bold.yellow('curl -fsSL https://raw.githubusercontent.com/replit/rsh/main/install.sh | bash')}\n`);
        } else {
          UI.success('rsh is up to date with the latest release.');
        }
      } catch (err: any) {
        spinner.fail(`Failed to check for updates: ${err.message}`);
      }
    });
}
