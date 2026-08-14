import chalk from 'chalk';

export class Logger {
  private debugEnabled: boolean;

  constructor() {
    this.debugEnabled =
      process.env.RSH_DEBUG === 'true' ||
      process.argv.includes('--debug') ||
      process.argv.includes('-v');
  }

  public setDebug(enabled: boolean): void {
    this.debugEnabled = enabled;
  }

  public mask(content: string): string {
    return content
      .replace(/(connect\.sid=)[^;\s]+/g, '$1••••')
      .replace(/(Bearer\s+)[a-zA-Z0-9_\-\.]+/g, '$1••••')
      .replace(/(password=)[^&;\s]+/g, '$1••••')
      .replace(/(token=)[^&;\s]+/g, '$1••••');
  }

  public debug(msg: string, ...args: any[]): void {
    if (!this.debugEnabled) return;
    const sanitized = this.mask(msg);
    console.error(chalk.gray(`[DEBUG ${new Date().toISOString()}] ${sanitized}`), ...args);
  }

  public info(msg: string): void {
    console.log(this.mask(msg));
  }

  public warn(msg: string): void {
    console.warn(chalk.yellow(this.mask(msg)));
  }

  public error(msg: string): void {
    console.error(chalk.red(this.mask(msg)));
  }
}

export const defaultLogger = new Logger();
