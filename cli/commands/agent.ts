import { Command } from 'commander';
import chalk from 'chalk';
import { defaultAiService } from '../../core/ai.js';
import { UI } from '../ui.js';

export function registerAgentCommand(program: Command): void {
  program
    .command('agent <goal>')
    .description('Run an autonomous AI agent to inspect code, write files, and verify goal completion')
    .action(async (goal: string) => {
      UI.info(`Starting autonomous AI agent for goal: "${chalk.bold.cyan(goal)}"`);
      console.log(chalk.gray('The agent will inspect the workspace, edit code, and run verification.\n'));

      try {
        const session = await defaultAiService.agent(goal, (step) => {
          const actionBadge =
            step.action === 'inspect'
              ? UI.badge('INSPECT', 'blue')
              : step.action === 'write'
              ? UI.badge('WRITE', 'yellow')
              : step.action === 'exec'
              ? UI.badge('EXEC', 'green')
              : UI.badge('DONE', 'gray');

          console.log(`[Step ${step.step}] ${actionBadge} ${chalk.bold(step.thought)}`);
          if (step.output) {
            console.log(chalk.gray(`  ↳ ${step.output}`));
          }
        });

        console.log('');
        UI.success(`Agent workflow completed successfully!`);
        console.log(chalk.cyan(`Summary: ${session.summary}\n`));
      } catch (err: any) {
        UI.error(`Agent execution error: ${err.message}`);
      }
    });
}
