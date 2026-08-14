import { Command } from 'commander';
import chalk from 'chalk';
import { UI } from '../ui.js';

export function registerEnvCommand(program: Command): void {
  program
    .command('env')
    .description('View active container environment variables (sanitizing sensitive values)')
    .option('--all', 'Include system variables', false)
    .action((options) => {
      const keys = Object.keys(process.env).sort();
      const filtered = keys.filter((k) => {
        if (options.all) return true;
        return (
          k.startsWith('REPL') ||
          k.startsWith('RSH') ||
          k.startsWith('DATABASE') ||
          k.startsWith('PG') ||
          k.startsWith('NODE_') ||
          k === 'PATH' ||
          k === 'USER' ||
          k === 'HOME'
        );
      });

      console.log(`\n${chalk.bold('Environment Variables')} (${filtered.length} shown):\n`);
      const headers = ['VARIABLE', 'VALUE'];
      const rows = filtered.map((k) => {
        const val = process.env[k] || '';
        const isSecret = k.includes('KEY') || k.includes('SECRET') || k.includes('TOKEN') || k.includes('PASSWORD');
        const displayVal = isSecret ? (val.length > 4 ? val.slice(0, 3) + '••••' : '••••') : val;
        return [chalk.bold.cyan(k), chalk.gray(displayVal.slice(0, 80) + (displayVal.length > 80 ? '...' : ''))];
      });

      UI.table(headers, rows);
      console.log('');
    });
}
