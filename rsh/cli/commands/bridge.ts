import { Command } from 'commander';
import chalk from 'chalk';
import { defaultBrowserBridge } from '../../auth/bridge.js';
import { UI } from '../ui.js';

export function registerBridgeCommand(program: Command): void {
  program
    .command('bridge')
    .description('Start interactive browser session bridge to authenticate rsh via browser')
    .option('-p, --port <port>', 'Local bridge server port', '8484')
    .option('--auto', 'Attempt automated browser launch with Chromium', false)
    .action(async (options) => {
      UI.info('Launching rsh Browser Session Bridge...\n');

      if (options.auto) {
        const spinner = UI.spinner('Opening Chromium browser session...');
        const res = await defaultBrowserBridge.launchAutomatedCapture();
        if (res.success) {
          spinner.succeed(res.message);
        } else {
          spinner.warn(`${res.message} Falling back to loopback bridge.`);
          await runLoopback(parseInt(options.port, 10));
        }
      } else {
        await runLoopback(parseInt(options.port, 10));
      }
    });
}

async function runLoopback(port: number): Promise<void> {
  console.log(`1. Open ${chalk.bold.cyan(`http://127.0.0.1:${port}/`)} in your browser.`);
  console.log('2. Log in to Replit or paste your session cookie.');
  console.log('3. rsh will automatically capture the session and encrypt it locally.\n');
  console.log(chalk.gray('(Press Ctrl+C to cancel)\n'));

  const res = await defaultBrowserBridge.startLoopbackBridge();
  if (res.success) {
    UI.success(`Authentication complete! ${res.message}`);
  } else {
    UI.error(`Bridge session ended: ${res.message}`);
  }
}
