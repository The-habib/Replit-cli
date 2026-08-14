#!/usr/bin/env node

import { Command } from 'commander';
import { UI } from './ui.js';
import { registerLoginCommand } from './commands/login.js';
import { registerLogoutCommand } from './commands/logout.js';
import { registerWhoamiCommand } from './commands/whoami.js';
import { registerLsCommand } from './commands/ls.js';
import { registerNewCommand } from './commands/new.js';
import { registerOpenCommand } from './commands/open.js';
import { registerShellCommand } from './commands/shell.js';
import { registerExecCommand } from './commands/exec.js';
import { registerCloneCommand } from './commands/clone.js';
import { registerPullCommand } from './commands/pull.js';
import { registerPushCommand } from './commands/push.js';
import { registerRunCommand } from './commands/run.js';
import { registerRestartCommand } from './commands/restart.js';
import { registerSecretsCommand } from './commands/secrets.js';
import { registerDbCommand } from './commands/db.js';
import { registerEnvCommand } from './commands/env.js';
import { registerRenameCommand } from './commands/rename.js';
import { registerDeleteCommand } from './commands/delete.js';
import { registerImportCommand } from './commands/import.js';
import { registerConfigCommand } from './commands/config.js';
import { registerCompletionsCommand } from './commands/completions.js';
import { registerAskCommand } from './commands/ask.js';
import { registerAgentCommand } from './commands/agent.js';
import { registerBridgeCommand } from './commands/bridge.js';
import { registerDuplicateCommand } from './commands/duplicate.js';
import { registerDeployCommand } from './commands/deploy.js';
import { registerLogsCommand } from './commands/logs.js';
import { registerAccountsCommand } from './commands/accounts.js';
import { registerDoctorCommand } from './commands/doctor.js';
import { registerUpdateCommand } from './commands/update.js';
import { defaultApiClient } from '../api/client.js';
import { defaultLogger } from '../core/logger.js';
import { defaultThemeEngine } from '../core/theme/index.js';
import { suggestCommand } from '../core/did-you-mean.js';
import { runInteractiveLauncher } from '../core/ui/launcher.js';
import chalk from 'chalk';

const KNOWN_COMMANDS = [
  'login',
  'logout',
  'accounts',
  'switch',
  'whoami',
  'bridge',
  'doctor',
  'update',
  'menu',
  'launcher',
  'ls',
  'new',
  'open',
  'duplicate',
  'rename',
  'delete',
  'import',
  'shell',
  'exec',
  'clone',
  'pull',
  'push',
  'run',
  'restart',
  'deploy',
  'logs',
  'secrets',
  'db',
  'env',
  'config',
  'completions',
  'ask',
  'agent',
];

const program = new Command();

program
  .name('rsh')
  .description('Universal Replit Terminal CLI — Manage projects, live shell, secrets, sync, databases, deployments, and AI coding')
  .version('1.0.0')
  .option('-t, --token <token>', 'Override Replit API token for this invocation')
  .option('-s, --sid <connectSid>', 'Override Replit connect.sid cookie for this invocation')
  .option('--mock', 'Enable mock container & API mode for offline testing')
  .option('-d, --debug', 'Enable verbose debug diagnostics and protocol logging')
  .option('--monochrome', 'Disable colors and use plain ASCII output')
  .hook('preAction', (thisCommand) => {
    const opts = (thisCommand as any).optsWithGlobals ? (thisCommand as any).optsWithGlobals() : program.opts();
    if (opts.monochrome) {
      defaultThemeEngine.setMode('monochrome');
    }
    if (opts.debug || process.argv.includes('--debug') || process.argv.includes('-d')) {
      process.env.RSH_DEBUG = 'true';
      defaultLogger.setDebug(true);
    }
    if (opts.mock || process.argv.includes('--mock')) {
      process.env.RSH_MOCK_MODE = 'true';
      defaultApiClient.setMockMode(true);
    }
    if (opts.token) {
      process.env.REPLIT_TOKEN = opts.token;
    }
    if (opts.sid) {
      process.env.REPLIT_CONNECT_SID = opts.sid;
    }
  });

// Register all subcommands
registerLoginCommand(program);
registerLogoutCommand(program);
registerAccountsCommand(program);
registerBridgeCommand(program);
registerWhoamiCommand(program);
registerDoctorCommand(program);
registerUpdateCommand(program);
registerLsCommand(program);
registerNewCommand(program);
registerOpenCommand(program);
registerDuplicateCommand(program);
registerRenameCommand(program);
registerDeleteCommand(program);
registerImportCommand(program);
registerShellCommand(program);
registerExecCommand(program);
registerCloneCommand(program);
registerPullCommand(program);
registerPushCommand(program);
registerRunCommand(program);
registerRestartCommand(program);
registerDeployCommand(program);
registerLogsCommand(program);
registerSecretsCommand(program);
registerDbCommand(program);
registerEnvCommand(program);
registerConfigCommand(program);
registerCompletionsCommand(program);
registerAskCommand(program);
registerAgentCommand(program);

// Explicit interactive menu command
program
  .command('menu')
  .alias('launcher')
  .description('Open interactive command center and workflow launcher')
  .action(async () => {
    await runInteractiveLauncher();
  });

// Handle unknown commands with "Did you mean?" suggestions
program.on('command:*', (operands) => {
  const unknownCmd = operands[0];
  const suggestions = suggestCommand(unknownCmd, KNOWN_COMMANDS);

  console.error(`\n${chalk.bold.red('Error:')} '${unknownCmd}' is not a valid rsh command.`);

  if (suggestions.length > 0) {
    console.error(`\n${chalk.bold('Did you mean:')}`);
    suggestions.forEach((s) => {
      console.error(`  ${chalk.cyan('rsh')} ${chalk.bold.yellow(s)}`);
    });
  }

  console.error(`\nRun ${chalk.yellow('rsh --help')} for a list of all available commands.\n`);
  process.exit(1);
});

// Default behavior when run with no arguments: Launch interactive menu if TTY, or show help if piped
if (process.argv.length <= 2) {
  if (process.stdout.isTTY && !process.env.CI) {
    runInteractiveLauncher().catch((err) => {
      UI.error(err.message);
      process.exit(1);
    });
  } else {
    UI.banner();
    program.outputHelp();
  }
} else {
  program.parseAsync(process.argv).catch((err) => {
    UI.error(err.message);
    process.exit(1);
  });
}
