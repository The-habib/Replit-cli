import { Command } from 'commander';
import chalk from 'chalk';
import { defaultAiService } from '../../core/ai.js';
import { UI } from '../ui.js';

export function registerAskCommand(program: Command): void {
  program
    .command('ask <query>')
    .description('Ask an AI question about your Replit project, code, or terminal errors')
    .action(async (query: string) => {
      const spinner = UI.spinner(`Thinking: "${query}"...`);

      try {
        const answer = await defaultAiService.ask(query);
        spinner.stop();

        console.log(`\n${chalk.bold.hex('#F26207')('✦ rsh AI Response:')}\n`);
        console.log(answer);
        console.log('');
      } catch (err: any) {
        spinner.fail(`AI query failed: ${err.message}`);
      }
    });
}
