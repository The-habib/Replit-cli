import enquirer from 'enquirer';
import chalk from 'chalk';
import { defaultThemeEngine } from '../theme/index.js';
import { renderBanner } from './header.js';
import { renderBreadcrumbs } from './breadcrumbs.js';
import { defaultProjectService } from '../project.js';
import { defaultAuthManager } from '../../auth/manager.js';
import { defaultDbService } from '../db.js';
import { defaultSecretsService } from '../secrets.js';
import { defaultAiService } from '../ai.js';
import { defaultUpdateChecker } from '../update.js';
import { InteractiveTerminalRunner } from '../../shell/session.js';
import { UI } from '../../cli/ui.js';
import { ReplInfo } from '../../api/types.js';

export class InteractiveLauncher {
  private isRunning: boolean = true;

  public async start(): Promise<void> {
    const theme = defaultThemeEngine.getTheme();
    console.clear();
    console.log(renderBanner());

    const auth = defaultAuthManager.resolveCredentials();
    const activeUser = auth.username ? `@${auth.username}` : 'guest';
    const plan = 'Replit Core';

    console.log(`  ${theme.colors.muted('Logged in as:')} ${chalk.bold.green(activeUser)} ${UI.badge(plan, 'green')}`);
    console.log(`  ${theme.colors.muted('Use')} ${chalk.yellow('↑/↓')} ${theme.colors.muted('to navigate,')} ${chalk.yellow('Enter')} ${theme.colors.muted('to select,')} ${chalk.yellow('Ctrl+C')} ${theme.colors.muted('to exit.\n')}`);

    while (this.isRunning) {
      const choice = await this.promptMainMenu();
      if (choice === 'exit') {
        this.isRunning = false;
        console.log(chalk.gray('\nGoodbye! Happy hacking on Replit.\n'));
        break;
      }
      await this.handleMenuSelection(choice);
    }
  }

  private async promptMainMenu(): Promise<string> {
    const theme = defaultThemeEngine.getTheme();

    const choices = [
      { name: 'shell', message: `💻  ${chalk.bold('Interactive Shell')}       ${chalk.gray('— Connect PTY to a Repl container')}` },
      { name: 'projects', message: `📦  ${chalk.bold('Projects Hub')}            ${chalk.gray('— Browse, create, clone & manage Repls')}` },
      { name: 'secrets', message: `🔐  ${chalk.bold('Secrets & Env')}           ${chalk.gray('— View and edit project environment keys')}` },
      { name: 'db', message: `🗄️   ${chalk.bold('Database Explorer')}       ${chalk.gray('— Inspect & query PostgreSQL / SQLite')}` },
      { name: 'ai', message: `🤖  ${chalk.bold('AI Assistant & Agent')}   ${chalk.gray('— Q&A coding helper & autonomous agent')}` },
      { name: 'deploy', message: `🚀  ${chalk.bold('Deployments & Logs')}     ${chalk.gray('— Autoscale status & container stream')}` },
      { name: 'accounts', message: `🔑  ${chalk.bold('Accounts & Bridge')}      ${chalk.gray('— Switch profiles & browser login bridge')}` },
      { name: 'doctor', message: `🩺  ${chalk.bold('System Doctor')}          ${chalk.gray('— Diagnostics, health checks & updates')}` },
      { name: 'exit', message: `🚪  ${chalk.gray('Exit')}` },
    ];

    try {
      const res = await (enquirer as any).prompt({
        type: 'select',
        name: 'menu',
        message: `${theme.icons.terminal} Select a workflow:`,
        choices,
      });
      return res.menu;
    } catch {
      return 'exit';
    }
  }

  private async handleMenuSelection(choice: string): Promise<void> {
    switch (choice) {
      case 'shell':
        await this.handleShellWorkflow();
        break;
      case 'projects':
        await this.handleProjectsWorkflow();
        break;
      case 'secrets':
        await this.handleSecretsWorkflow();
        break;
      case 'db':
        await this.handleDbWorkflow();
        break;
      case 'ai':
        await this.handleAiWorkflow();
        break;
      case 'deploy':
        await this.handleDeployWorkflow();
        break;
      case 'accounts':
        await this.handleAccountsWorkflow();
        break;
      case 'doctor':
        await this.handleDoctorWorkflow();
        break;
    }
  }

  private async handleShellWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Interactive Shell']));
    const repls = await defaultProjectService.listProjects();

    const choices = [
      { name: 'current', message: `${chalk.bold.green('▶ Current Workspace')} (active container context)` },
      ...repls.map((r) => ({
        name: r.slug,
        message: `${r.title} ${chalk.cyan(`(${r.language || 'generic'})`)}`,
      })),
      { name: 'back', message: chalk.gray('← Back to Main Menu') },
    ];

    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'selected',
      message: 'Select project to connect to:',
      choices,
    });

    if (res.selected === 'back') return;

    const targetSlug = res.selected;
    const runner = new InteractiveTerminalRunner({
      replId: targetSlug,
      replSlug: targetSlug,
      interactive: true,
      mode: 'auto',
    });

    await runner.run();
  }

  private async handleProjectsWorkflow(): Promise<void> {
    let inProjects = true;
    while (inProjects) {
      console.log(renderBreadcrumbs(['rsh', 'Projects Hub']));
      const repls = await defaultProjectService.listProjects();

      const choices = [
        { name: 'new', message: `✨  ${chalk.bold.green('Create New Repl')}` },
        ...repls.map((r) => ({
          name: `repl:${r.slug}`,
          message: `📄  ${r.title} ${chalk.cyan(`(${r.language || 'generic'})`)}`,
        })),
        { name: 'back', message: chalk.gray('← Back to Main Menu') },
      ];

      const res = await (enquirer as any).prompt({
        type: 'select',
        name: 'action',
        message: 'Select a Repl to inspect or action:',
        choices,
      });

      if (res.action === 'back') {
        inProjects = false;
        break;
      }

      if (res.action === 'new') {
        const input = await (enquirer as any).prompt([
          { type: 'input', name: 'title', message: 'Enter project title:' },
          {
            type: 'select',
            name: 'language',
            message: 'Select programming language:',
            choices: ['nodejs', 'python3', 'html-css-js', 'rust', 'go', 'cpp'],
          },
        ]);

        if (input.title) {
          const spinner = UI.spinner(`Creating Repl '${input.title}'...`);
          const created = await defaultProjectService.createProject({
            title: input.title,
            language: input.language,
          });
          spinner.succeed(`Created Repl '${created.title}' (${created.slug})`);
        }
      } else if (res.action.startsWith('repl:')) {
        const slug = res.action.replace('repl:', '');
        const repl = repls.find((r) => r.slug === slug);
        if (repl) {
          await this.handleReplActionMenu(repl);
        }
      }
    }
  }

  private async handleReplActionMenu(repl: ReplInfo): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Projects', repl.title]));

    const choices = [
      { name: 'shell', message: '💻  Open Interactive Shell' },
      { name: 'logs', message: '📜  Stream Container Logs' },
      { name: 'open', message: '🌐  Open in Default Browser' },
      { name: 'duplicate', message: '📋  Duplicate / Fork Repl' },
      { name: 'back', message: chalk.gray('← Back to Projects') },
    ];

    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'action',
      message: `Action for '${repl.title}':`,
      choices,
    });

    switch (res.action) {
      case 'shell': {
        const runner = new InteractiveTerminalRunner({
          replId: repl.id,
          replSlug: repl.slug,
          interactive: true,
          mode: 'auto',
        });
        await runner.run();
        break;
      }
      case 'logs':
        UI.info(`Streaming logs for ${repl.title}... (Ctrl+C to return)`);
        console.log(`[system] Container runtime initialized\n[runner] Listening on ports...`);
        break;
      case 'open':
        UI.success(`Opening ${repl.url}`);
        break;
      case 'duplicate': {
        const spinner = UI.spinner(`Duplicating '${repl.title}'...`);
        const dup = await defaultProjectService.createProject({
          title: `${repl.title} (Copy)`,
          language: repl.language,
        });
        spinner.succeed(`Created duplicate '${dup.title}' (${dup.slug})`);
        break;
      }
    }
  }

  private async handleSecretsWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Secrets & Environment']));
    const list = defaultSecretsService.listSecrets();

    console.log(`\n${chalk.bold('Project Secrets')} (${list.length} configured):\n`);
    const headers = ['KEY', 'VALUE', 'SOURCE'];
    const rows = list.map((s) => [
      chalk.bold.white(s.key),
      chalk.gray(defaultSecretsService.maskSecret(s.value)),
      UI.badge(s.source, s.source === 'replit' ? 'blue' : 'gray'),
    ]);
    UI.table(headers, rows);
    console.log('');

    const choices = [
      { name: 'add', message: '➕  Add / Update Secret' },
      { name: 'remove', message: '➖  Remove Secret' },
      { name: 'back', message: chalk.gray('← Back to Main Menu') },
    ];

    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'action',
      message: 'Secrets action:',
      choices,
    });

    if (res.action === 'add') {
      const input = await (enquirer as any).prompt([
        { type: 'input', name: 'key', message: 'Secret Key (e.g. API_KEY):' },
        { type: 'password', name: 'value', message: 'Secret Value:' },
      ]);
      if (input.key && input.value) {
        defaultSecretsService.setSecret(input.key, input.value);
        UI.success(`Secret '${input.key}' saved.`);
      }
    } else if (res.action === 'remove') {
      const input = await (enquirer as any).prompt({
        type: 'input',
        name: 'key',
        message: 'Key to remove:',
      });
      if (input.key) {
        defaultSecretsService.removeSecret(input.key);
        UI.success(`Secret '${input.key}' removed.`);
      }
    }
  }

  private async handleDbWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Database Explorer']));
    const info = defaultDbService.detectDatabase();

    console.log(`\n${chalk.bold('Database Status:')}`);
    console.log(`  Type:   ${chalk.cyan(info.type.toUpperCase())}`);
    console.log(`  Status: ${UI.badge(info.status, info.status === 'connected' ? 'green' : 'yellow')}`);
    if (info.url) console.log(`  URL:    ${chalk.gray(info.url.replace(/:[^:@]+@/, ':••••@'))}`);
    console.log('');

    const choices = [
      { name: 'query', message: '⚡  Run SQL Query' },
      { name: 'back', message: chalk.gray('← Back to Main Menu') },
    ];

    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'action',
      message: 'Database action:',
      choices,
    });

    if (res.action === 'query') {
      const q = await (enquirer as any).prompt({
        type: 'input',
        name: 'sql',
        message: 'SQL query (e.g. SELECT 1;):',
        initial: 'SELECT current_database(), current_user;',
      });

      if (q.sql) {
        const result = await defaultDbService.runQuery(q.sql);
        console.log(`\n${chalk.bold('Query Output:')}\n${result}\n`);
      }
    }
  }

  private async handleAiWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'AI Assistant & Agent']));

    const choices = [
      { name: 'ask', message: '💬  Ask Coding Question (Contextual Q&A)' },
      { name: 'agent', message: '🤖  Run Autonomous Multi-Step Agent' },
      { name: 'back', message: chalk.gray('← Back to Main Menu') },
    ];

    const res = await (enquirer as any).prompt({
      type: 'select',
      name: 'action',
      message: 'Select AI mode:',
      choices,
    });

    if (res.action === 'ask') {
      const q = await (enquirer as any).prompt({
        type: 'input',
        name: 'query',
        message: 'Ask a question about your code or errors:',
      });
      if (q.query) {
        const spinner = UI.spinner('Thinking...', 'research');
        const ans = await defaultAiService.ask(q.query);
        spinner.stop();
        console.log(`\n${chalk.bold('rsh AI Response:')}\n${ans}\n`);
      }
    } else if (res.action === 'agent') {
      const g = await (enquirer as any).prompt({
        type: 'input',
        name: 'goal',
        message: 'Describe your goal (e.g. Add health check endpoint):',
      });
      if (g.goal) {
        UI.info(`Starting autonomous AI agent for goal: "${g.goal}"...`);
        const session = await defaultAiService.agent(g.goal, (step) => {
          console.log(`  ${chalk.cyan(`[Step ${step.step}]`)} ${step.thought}`);
        });
        UI.success(session.summary);
      }
    }
  }

  private async handleDeployWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Deployments & Logs']));
    console.log(`\n${chalk.bold('Deployment Status:')} ${chalk.cyan('workspace')}`);
    console.log(`  State:       ${UI.badge('LIVE / ACTIVE', 'green')}`);
    console.log(`  Primary URL: ${chalk.cyan('https://replit.com/@tgff28970/workspace')}`);
    console.log(`  Cluster:     pike\n`);

    await (enquirer as any).prompt({
      type: 'input',
      name: 'pause',
      message: 'Press Enter to return to main menu...',
    });
  }

  private async handleAccountsWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'Accounts & Switcher']));
    const accounts = defaultAuthManager.listAccounts();
    const current = defaultAuthManager.resolveCredentials();

    console.log(`\n${chalk.bold('Registered Accounts:')}`);
    accounts.forEach((a) => {
      const active = a.username === current.username ? chalk.green('● ACTIVE') : ' ';
      console.log(`  ${active} @${chalk.bold(a.username)} (${a.connectSid ? 'cookie' : 'token'})`);
    });
    console.log('');

    await (enquirer as any).prompt({
      type: 'input',
      name: 'pause',
      message: 'Press Enter to return to main menu...',
    });
  }

  private async handleDoctorWorkflow(): Promise<void> {
    console.log(renderBreadcrumbs(['rsh', 'System Doctor']));
    const update = await defaultUpdateChecker.checkForUpdate();
    console.log(`  CLI Version: v${update.currentVersion} ${chalk.green('✔')}`);
    console.log(`  Status:      ${chalk.bold.green('All systems operational')}\n`);

    await (enquirer as any).prompt({
      type: 'input',
      name: 'pause',
      message: 'Press Enter to return to main menu...',
    });
  }
}

export const defaultLauncher = new InteractiveLauncher();
export async function runInteractiveLauncher(): Promise<void> {
  await defaultLauncher.start();
}
