import ora, { Ora } from 'ora';
import { defaultThemeEngine } from '../theme/index.js';

export type SpinnerContext = 'login' | 'deploy' | 'sync' | 'connect' | 'research' | 'generic';

export function createSpinner(text: string, context: SpinnerContext = 'generic'): Ora {
  const theme = defaultThemeEngine.getTheme();

  // If in CI or non-interactive environment, return clean quiet spinner
  if (!process.stdout.isTTY || theme.mode === 'monochrome') {
    return ora({
      text,
      isEnabled: false,
    });
  }

  let spinnerType: any = 'dots';
  switch (context) {
    case 'deploy':
      spinnerType = 'aesthetic';
      break;
    case 'sync':
      spinnerType = 'bouncingBar';
      break;
    case 'connect':
      spinnerType = 'pipe';
      break;
    case 'research':
      spinnerType = 'dots12';
      break;
  }

  return ora({
    text,
    spinner: spinnerType,
    color: 'yellow',
  }).start();
}
