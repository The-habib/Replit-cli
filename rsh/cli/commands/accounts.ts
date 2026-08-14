import { Command } from 'commander';
import chalk from 'chalk';
import { defaultAuthManager } from '../../auth/manager.js';
import { UI } from '../ui.js';

export function registerAccountsCommand(program: Command): void {
  const accounts = program
    .command('accounts')
    .description('Manage multiple authenticated Replit accounts');

  accounts
    .command('ls')
    .alias('list')
    .description('List all saved accounts')
    .action(() => {
      const list = defaultAuthManager.listAccounts();
      const currentCreds = defaultAuthManager.resolveCredentials();

      if (list.length === 0) {
        UI.info('No accounts stored. Run `rsh login` to add an account.');
        return;
      }

      console.log(`\n${chalk.bold('Saved Replit Accounts:')}\n`);
      const headers = ['ACTIVE', 'USERNAME', 'USER ID', 'AUTH METHOD', 'LAST USED'];
      const rows = list.map((a) => {
        const isActive = a.username === currentCreds.username;
        return [
          isActive ? chalk.green('▶ ACTIVE') : chalk.gray(' '),
          chalk.bold.cyan(`@${a.username}`),
          a.userId || 'n/a',
          a.connectSid ? 'cookie' : 'token',
          a.lastUsed ? new Date(a.lastUsed).toLocaleDateString() : 'recent',
        ];
      });

      UI.table(headers, rows);
      console.log('');
    });

  accounts
    .command('switch <username>')
    .description('Switch active account')
    .action((username: string) => {
      const cleanUser = username.replace(/^@/, '');
      const ok = defaultAuthManager.switchAccount(cleanUser);
      if (ok) {
        UI.success(`Switched active account to @${chalk.bold.green(cleanUser)}`);
      } else {
        UI.error(`Account @${cleanUser} was not found in saved credentials.`);
      }
    });

  accounts
    .command('rm <username>')
    .alias('remove')
    .description('Remove an account from saved credentials')
    .action((username: string) => {
      const cleanUser = username.replace(/^@/, '');
      const ok = defaultAuthManager.removeAccount(cleanUser);
      if (ok) {
        UI.success(`Removed account @${cleanUser}`);
      } else {
        UI.warn(`Account @${cleanUser} was not found.`);
      }
    });

  // Top level shorthand: rsh switch <username>
  program
    .command('switch <username>')
    .description('Shorthand to switch active Replit account')
    .action((username: string) => {
      const cleanUser = username.replace(/^@/, '');
      const ok = defaultAuthManager.switchAccount(cleanUser);
      if (ok) {
        UI.success(`Switched active account to @${chalk.bold.green(cleanUser)}`);
      } else {
        UI.error(`Account @${cleanUser} was not found. Run 'rsh accounts ls' to see available accounts.`);
      }
    });
}
