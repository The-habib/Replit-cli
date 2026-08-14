import { Command } from 'commander';
import chalk from 'chalk';
import { defaultAuthManager } from '../../auth/manager.js';
import { defaultApiClient } from '../../api/client.js';
import { UI } from '../ui.js';

export function registerWhoamiCommand(program: Command): void {
  program
    .command('whoami')
    .description('Display information about the currently authenticated Replit user')
    .option('--json', 'Output user information as JSON')
    .action(async (options) => {
      const creds = defaultAuthManager.resolveCredentials();
      const container = defaultAuthManager.detectContainerContext();

      try {
        const user = await defaultApiClient.getCurrentUser();

        if (options.json) {
          console.log(
            JSON.stringify(
              {
                user,
                authMethod: creds.authMethod,
                containerContext: container.isInsideContainer ? container : null,
              },
              null,
              2
            )
          );
          return;
        }

        if (user) {
          console.log(`\n${chalk.bold('User:')}       @${chalk.cyan(user.username)}`);
          if (user.id) console.log(`${chalk.bold('User ID:')}    ${user.id}`);
          if (user.email) console.log(`${chalk.bold('Email:')}      ${user.email}`);
          if (user.plan?.name) console.log(`${chalk.bold('Plan:')}       ${chalk.green(user.plan.name)}`);
          console.log(`${chalk.bold('Auth Mode:')}  ${UI.badge(creds.authMethod, 'green')}`);

          if (container.isInsideContainer) {
            console.log(`${chalk.bold('Container:')}  ${chalk.yellow(container.replSlug || 'workspace')} (${container.replId || 'local'})\n`);
          } else {
            console.log('');
          }
        } else {
          UI.warn('Not logged in. Run `rsh login` to authenticate.');
        }
      } catch (err: any) {
        if (container.isInsideContainer) {
          console.log(`\n${chalk.bold('User:')}       @${chalk.cyan(container.replitUser || container.replOwner || 'runner')}`);
          console.log(`${chalk.bold('Context:')}    ${chalk.yellow('Replit MicroVM Container')}`);
          console.log(`${chalk.bold('Repl ID:')}    ${container.replId || 'unknown'}`);
          console.log(`${chalk.bold('Auth Mode:')}  ${UI.badge('container', 'green')}\n`);
          return;
        }

        UI.error(`Could not fetch user profile: ${err.message}`);
        console.log('Run `rsh login` to set up authentication.');
      }
    });
}
