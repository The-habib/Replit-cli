import { Command } from 'commander';
import { defaultAuthManager } from '../../auth/manager.js';
import { UI } from '../ui.js';

export function registerLogoutCommand(program: Command): void {
  program
    .command('logout')
    .description('Log out and clear stored Replit credentials')
    .action(() => {
      defaultAuthManager.logout();
      UI.success('Logged out successfully. Credentials cleared.');
    });
}
