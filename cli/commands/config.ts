import { Command } from 'commander';
import chalk from 'chalk';
import { defaultConfigService, UserPreferences } from '../../core/config.js';
import { UI } from '../ui.js';

export function registerConfigCommand(program: Command): void {
  const config = program
    .command('config')
    .description('Manage user preferences, editor defaults, and CLI settings');

  config
    .command('ls')
    .alias('list')
    .description('List all CLI configuration settings')
    .action(() => {
      const all = defaultConfigService.getAll();
      console.log(`\n${chalk.bold('rsh User Configuration:')}\n`);

      const headers = ['SETTING', 'VALUE'];
      const rows = Object.entries(all).map(([k, v]) => [
        chalk.bold.cyan(k),
        typeof v === 'boolean' ? (v ? chalk.green('true') : chalk.gray('false')) : chalk.white(String(v)),
      ]);

      UI.table(headers, rows);
      console.log('');
    });

  config
    .command('get <key>')
    .description('Get the value of a configuration setting')
    .action((key: string) => {
      const val = defaultConfigService.get(key as keyof UserPreferences);
      console.log(`${key} = ${val}`);
    });

  config
    .command('set <key> <value>')
    .description('Set a configuration setting (e.g. editor, defaultRepl, autoSync, colorMode)')
    .action((key: string, value: string) => {
      let parsedVal: any = value;
      if (value === 'true') parsedVal = true;
      else if (value === 'false') parsedVal = false;

      defaultConfigService.set(key as keyof UserPreferences, parsedVal);
      UI.success(`Configuration '${chalk.cyan(key)}' updated to '${chalk.green(value)}'`);
    });
}
