import chalk from 'chalk';
import ora, { Ora } from 'ora';

export class UI {
  public static banner(): void {
    console.log(
      chalk.bold.hex('#F26207')('  ____  ____  _   _ ') + chalk.bold.gray('— Replit Shell CLI (rsh)')
    );
    console.log(chalk.bold.hex('#F26207')(' |  _ \\/ ___|| | | |'));
    console.log(chalk.bold.hex('#F26207')(' | |_) \\___ \\| |_| |') + chalk.dim('  The command-line companion for Replit'));
    console.log(chalk.bold.hex('#F26207')(' |  _ < ___) |  _  |'));
    console.log(chalk.bold.hex('#F26207')(' |_| \\_\\____/|_| |_|\n'));
  }

  public static success(msg: string): void {
    console.log(chalk.green('✔ ') + chalk.bold(msg));
  }

  public static error(msg: string): void {
    console.error(chalk.red('✖ ') + chalk.bold(msg));
  }

  public static info(msg: string): void {
    console.log(chalk.cyan('ℹ ') + msg);
  }

  public static warn(msg: string): void {
    console.log(chalk.yellow('⚠ ') + msg);
  }

  public static spinner(text: string): Ora {
    return ora({
      text,
      color: 'cyan',
    }).start();
  }

  public static table(
    headers: string[],
    rows: string[][],
    colWidths?: number[]
  ): void {
    const widths = colWidths || headers.map((h, i) => {
      const maxRowLen = rows.reduce((max, row) => Math.max(max, (row[i] || '').length), 0);
      return Math.max(h.length, maxRowLen) + 2;
    });

    const headerStr = headers
      .map((h, i) => chalk.bold.cyan(h.padEnd(widths[i])))
      .join('  ');
    const divider = widths.map((w) => '─'.repeat(w)).join('──');

    console.log(headerStr);
    console.log(chalk.gray(divider));

    for (const row of rows) {
      const rowStr = row
        .map((cell, i) => (cell || '').padEnd(widths[i]))
        .join('  ');
      console.log(rowStr);
    }
  }

  public static badge(text: string, color: 'green' | 'blue' | 'yellow' | 'gray' = 'blue'): string {
    switch (color) {
      case 'green':
        return chalk.bgGreen.black(` ${text} `);
      case 'yellow':
        return chalk.bgYellow.black(` ${text} `);
      case 'gray':
        return chalk.bgGray.white(` ${text} `);
      case 'blue':
      default:
        return chalk.bgCyan.black(` ${text} `);
    }
  }
}
