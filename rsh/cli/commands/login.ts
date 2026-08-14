import { Command } from 'commander';
import enquirer from 'enquirer';
import { defaultAuthManager } from '../../auth/manager.js';
import { defaultApiClient } from '../../api/client.js';
import { UI } from '../ui.js';

export function registerLoginCommand(program: Command): void {
  program
    .command('login')
    .description('Authenticate rsh with your Replit account')
    .option('-t, --token <token>', 'Replit API token or access token')
    .option('-s, --sid <connectSid>', 'Replit connect.sid session cookie')
    .action(async (options, cmd) => {
      const allOpts = cmd?.optsWithGlobals ? cmd.optsWithGlobals() : { ...program.opts(), ...options };
      let token = options.token || allOpts.token || process.env.REPLIT_TOKEN;
      let sid = options.sid || allOpts.sid || process.env.REPLIT_CONNECT_SID;

      if (!token && !sid) {
        UI.info('Log in to Replit to manage your projects, run shells, and sync code.\n');
        console.log('You can authenticate using:');
        console.log('1. Replit Session Cookie (connect.sid from browser cookies)');
        console.log('2. Replit API / Access Token\n');

        try {
          const response = await (enquirer as any).prompt([
            {
              type: 'select',
              name: 'authType',
              message: 'Select authentication method:',
              choices: [
                { name: 'cookie', message: 'Replit Session Cookie (connect.sid)' },
                { name: 'token', message: 'Personal Access Token / API Key' },
              ],
            },
            {
              type: 'password',
              name: 'secret',
              message: 'Enter your credential value:',
            },
          ]);

          if (response.authType === 'cookie') {
            sid = response.secret;
          } else {
            token = response.secret;
          }
        } catch {
          UI.error('Login cancelled.');
          return;
        }
      }

      const spinner = UI.spinner('Verifying Replit credentials...');

      try {
        defaultAuthManager.saveLogin({
          token,
          connectSid: sid,
        });

        // Verify with GraphQL / container
        const user = await defaultApiClient.getCurrentUser();

        if (user?.username) {
          defaultAuthManager.saveLogin({
            username: user.username,
            userId: user.id,
            email: user.email,
          });
          spinner.succeed(`Successfully authenticated as @${user.username} (${user.plan?.name || 'Replit User'})`);
        } else {
          spinner.succeed('Credentials stored successfully in encrypted vault.');
        }
      } catch (err: any) {
        spinner.warn(`Credentials saved locally. (Verification note: ${err.message})`);
      }
    });
}
