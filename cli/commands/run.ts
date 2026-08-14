import { Command } from 'commander';
import { defaultProjectService } from '../../core/project.js';
import { UI } from '../ui.js';

export function registerRunCommand(program: Command): void {
  program
    .command('run [repl]')
    .description('Run the main program in a Replit project')
    .action(async (replArg?: string) => {
      const target = replArg || process.env.REPL_SLUG || 'workspace';
      const spinner = UI.spinner(`Starting run process on ${target}...`);

      try {
        const res = await defaultProjectService.runProject(target);
        spinner.succeed(res.message);
      } catch (err: any) {
        spinner.fail(`Run command failed: ${err.message}`);
      }
    });
}
