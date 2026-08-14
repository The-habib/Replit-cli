import { Command } from 'commander';
import chalk from 'chalk';
import enquirer from 'enquirer';
import { defaultProjectService } from '../../core/project.js';
import { defaultConfigService } from '../../core/config.js';
import { InteractiveTerminalRunner } from '../../shell/session.js';
import { ShellMode } from '../../shell/types.js';
import { UI } from '../ui.js';

export function registerShellCommand(program: Command): void {
  program
    .command('shell [repl]')
    .description('Open an interactive remote shell connected to a Replit container')
    .option('-m, --mode <mode>', 'Shell connection mode (auto, remote, local, ssh)', 'auto')
    .option('--mock', 'Run in mock container mode for offline testing', false)
    .action(async (replArg, options) => {
      let targetSlug = replArg;

      // If no repl argument was provided
      if (!targetSlug) {
        // 1. Check if inside container
        if (process.env.REPL_SLUG) {
          targetSlug = process.env.REPL_SLUG;
        } else {
          // 2. Check default configured repl
          const defaultRepl = defaultConfigService.get('defaultRepl');
          if (defaultRepl) {
            targetSlug = defaultRepl;
          } else {
            // 3. Prompt user with interactive list
            try {
              const repls = await defaultProjectService.listProjects();
              if (repls.length > 0) {
                const choice = await (enquirer as any).prompt({
                  type: 'select',
                  name: 'selected',
                  message: 'Select a Replit project to connect to:',
                  choices: repls.map((r) => ({
                    name: r.slug,
                    message: `${r.title} (${chalk.cyan(r.language || 'generic')})`,
                  })),
                });
                targetSlug = choice.selected;
              } else {
                targetSlug = 'workspace';
              }
            } catch {
              targetSlug = 'workspace';
            }
          }
        }
      }

      let targetId = targetSlug;

      try {
        if (!options.mock && targetSlug !== 'workspace' && targetSlug !== 'current') {
          const repl = await defaultProjectService.getProject(targetSlug);
          if (repl) {
            targetId = repl.id;
            targetSlug = repl.slug;
          }
        }

        UI.info(`Connecting terminal to ${chalk.bold.green(targetSlug)}...`);
        console.log(chalk.gray('(Press Ctrl+D or type exit to disconnect)\n'));

        const runner = new InteractiveTerminalRunner({
          replId: targetId,
          replSlug: targetSlug,
          mode: options.mode as ShellMode,
          interactive: true,
          mockMode: Boolean(options.mock || process.env.RSH_MOCK_MODE === 'true'),
        });

        const code = await runner.run();
        console.log(chalk.gray(`\n[rsh] Shell session finished (exit code ${code}).`));
        process.exit(code);
      } catch (err: any) {
        UI.error(`Failed to establish shell connection: ${err.message}`);
        process.exit(1);
      }
    });
}
