import { Command } from 'commander';
import { defaultProjectService } from '../../core/project.js';
import { InteractiveTerminalRunner } from '../../shell/session.js';
import { ShellMode } from '../../shell/types.js';
import { UI } from '../ui.js';

export function registerExecCommand(program: Command): void {
  program
    .command('exec <repl> <cmd...>')
    .description('Execute a single command inside a Replit container and stream output')
    .option('-m, --mode <mode>', 'Execution mode (auto, remote, local, ssh)', 'auto')
    .option('--mock', 'Run in mock container mode for testing', false)
    .action(async (replArg: string, cmdParts: string[], options) => {
      const fullCmd = cmdParts.join(' ');
      let targetSlug = replArg;
      let targetId = replArg;

      try {
        if (!options.mock && replArg !== 'workspace' && replArg !== 'current') {
          const repl = await defaultProjectService.getProject(replArg);
          if (repl) {
            targetId = repl.id;
            targetSlug = repl.slug;
          }
        }

        const runner = new InteractiveTerminalRunner({
          replId: targetId,
          replSlug: targetSlug,
          mode: options.mode as ShellMode,
          command: ['/bin/sh', '-c', fullCmd],
          interactive: false,
          mockMode: Boolean(options.mock || process.env.RSH_MOCK_MODE === 'true'),
        });

        const code = await runner.run();
        process.exit(code);
      } catch (err: any) {
        UI.error(`Command execution failed: ${err.message}`);
        process.exit(1);
      }
    });
}
