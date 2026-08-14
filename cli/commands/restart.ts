import { Command } from 'commander';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerRestartCommand(program: Command): void {
  program
    .command('restart [repl]')
    .description('Restart the container for a Replit project')
    .action(async (replArg?: string) => {
      const target = replArg || process.env.REPL_SLUG || 'workspace';
      const spinner = UI.spinner(`Restarting container for ${target}...`);

      try {
        const res = await defaultProjectService.restartProject(target);
        spinner.succeed(res.message);
      } catch (err: any) {
        spinner.fail(`Restart failed: ${err.message}`);
      }
    });
}
