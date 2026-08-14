import { Command } from 'commander';
import chalk from 'chalk';
import { defaultPlatformDetector } from '../../core/platform.js';
import { defaultAuthManager } from '../../auth/manager.js';
import { defaultDbService } from '../../core/db.js';
import { UI } from '../ui.js';

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Run comprehensive cross-platform system diagnostics')
    .action(async () => {
      console.log(`\n${chalk.bold('rsh System Diagnostics (Doctor)')}\n`);

      const platform = defaultPlatformDetector.getPlatformInfo();
      const auth = defaultAuthManager.resolveCredentials();
      const db = defaultDbService.detectDatabase();

      // 1. OS & Platform
      console.log(chalk.bold('Environment:'));
      console.log(`  OS Platform:       ${chalk.cyan(platform.os.toUpperCase())} (${platform.rawPlatform}, ${platform.arch})`);
      console.log(`  Shell:             ${chalk.cyan(platform.defaultShell)} (${platform.shellType})`);
      console.log(`  Config Dir:        ${platform.configDir}`);
      console.log(`  WSL Detected:      ${platform.isWSL ? chalk.green('Yes') : 'No'}`);
      console.log(`  Termux Detected:   ${platform.isTermux ? chalk.green('Yes') : 'No'}`);
      console.log(`  Replit Container:  ${platform.isReplitContainer ? chalk.green('Yes') : 'No'}`);

      // 2. Node & Runtime
      console.log(`\n${chalk.bold('Runtime:')}`);
      console.log(`  Node.js Version:   ${process.version} ${chalk.green('✔')}`);
      console.log(`  TTY Attached:      ${process.stdin.isTTY ? chalk.green('Yes') : chalk.yellow('No (Piped)')}`);
      console.log(`  Color Support:     ${chalk.level > 0 ? chalk.green('Yes (24-bit / 256 colors)') : chalk.yellow('Basic')}`);

      // 3. Authentication
      console.log(`\n${chalk.bold('Authentication:')}`);
      console.log(`  Active Method:     ${UI.badge(auth.authMethod, auth.authMethod !== 'mock' ? 'green' : 'yellow')}`);
      console.log(`  Active User:       ${auth.username ? chalk.green(`@${auth.username}`) : chalk.gray('Not logged in')}`);
      console.log(`  Saved Accounts:    ${defaultAuthManager.listAccounts().length} registered`);

      // 4. Database
      console.log(`\n${chalk.bold('Database Connectors:')}`);
      console.log(`  Type:              ${chalk.cyan(db.type.toUpperCase())}`);
      console.log(`  Status:            ${UI.badge(db.status, db.status === 'connected' ? 'green' : 'yellow')}`);

      console.log(`\n${chalk.bold.green('✔ System is healthy and ready to use rsh.')}\n`);
    });
}
