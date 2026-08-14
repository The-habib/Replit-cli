import { Command } from 'commander';
import chalk from 'chalk';
import { defaultDbService } from '../../core/db.js';
import { UI } from '../ui.js';

export function registerDbCommand(program: Command): void {
  const db = program
    .command('db')
    .description('Inspect and interact with Replit database connectors (PostgreSQL / SQLite)');

  db
    .command('info')
    .description('Display detected database connection details')
    .action(() => {
      const info = defaultDbService.detectDatabase();

      console.log(`\n${chalk.bold('Database Information:')}\n`);
      console.log(`${chalk.bold('Type:')}      ${chalk.cyan(info.type.toUpperCase())}`);
      console.log(`${chalk.bold('Status:')}    ${UI.badge(info.status, info.status === 'connected' ? 'green' : 'yellow')}`);

      if (info.type === 'postgres') {
        console.log(`${chalk.bold('Host:')}      ${info.host || 'localhost'}`);
        console.log(`${chalk.bold('Port:')}      ${info.port || 5432}`);
        console.log(`${chalk.bold('Database:')}  ${info.database || 'default'}`);
        console.log(`${chalk.bold('User:')}      ${info.user || 'runner'}`);
        if (info.url) {
          console.log(`${chalk.bold('URL:')}       ${chalk.gray(info.url.replace(/:[^:@]+@/, ':••••@'))}`);
        }
      } else if (info.type === 'sqlite') {
        console.log(`${chalk.bold('File:')}      ${info.sqlitePath}`);
      }

      console.log('');
    });

  db
    .command('query <sql>')
    .description('Execute a SQL query against the active database')
    .action(async (sql: string) => {
      const spinner = UI.spinner(`Executing query: "${sql}"...`);
      try {
        const result = await defaultDbService.runQuery(sql);
        spinner.stop();
        console.log(`\n${chalk.bold('Query Results:')}\n`);
        console.log(result);
        console.log('');
      } catch (err: any) {
        spinner.fail(`Query failed: ${err.message}`);
      }
    });
}
