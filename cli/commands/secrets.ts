import { Command } from 'commander';
import chalk from 'chalk';
import { defaultSecretsService } from '../../core/secrets.js';
import { UI } from '../ui.js';

export function registerSecretsCommand(program: Command): void {
  const secrets = program
    .command('secrets')
    .alias('secret')
    .description('Manage Replit project secrets and environment variables');

  secrets
    .command('ls')
    .alias('list')
    .description('List all configured secrets in current project')
    .option('--show-values', 'Display unmasked secret values', false)
    .action((options) => {
      const list = defaultSecretsService.listSecrets();
      if (list.length === 0) {
        UI.info('No secrets found in this project. Add one with `rsh secrets set <KEY> <VALUE>`.');
        return;
      }

      console.log(`\n${chalk.bold('Project Secrets')} (${list.length} configured):\n`);
      const headers = ['KEY', 'VALUE', 'SOURCE'];
      const rows = list.map((s) => [
        chalk.bold.white(s.key),
        options.showValues ? chalk.yellow(s.value) : chalk.gray(defaultSecretsService.maskSecret(s.value)),
        UI.badge(s.source, s.source === 'replit' ? 'blue' : 'gray'),
      ]);

      UI.table(headers, rows);
      console.log('');
    });

  secrets
    .command('set <key> <value>')
    .description('Set a secret key-value pair in project environment')
    .action((key: string, value: string) => {
      defaultSecretsService.setSecret(key, value);
      UI.success(`Secret '${chalk.bold.green(key)}' set successfully.`);
    });

  secrets
    .command('rm <key>')
    .alias('remove')
    .description('Remove a secret key from project environment')
    .action((key: string) => {
      const removed = defaultSecretsService.removeSecret(key);
      if (removed) {
        UI.success(`Secret '${chalk.bold.green(key)}' removed.`);
      } else {
        UI.warn(`Secret '${key}' was not found.`);
      }
    });
}
