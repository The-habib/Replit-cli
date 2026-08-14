export type Breakpoint = 'compact' | 'standard' | 'wide' | 'ultrawide';

export class TerminalDetector {
  public getColumns(): number {
    return process.stdout?.columns || 80;
  }

  public getRows(): number {
    return process.stdout?.rows || 24;
  }

  public getBreakpoint(): Breakpoint {
    const cols = this.getColumns();
    if (cols < 65) return 'compact'; // Termux / Mobile / Split Pane
    if (cols <= 105) return 'standard'; // Normal Terminal (80 cols)
    if (cols <= 160) return 'wide'; // Fullscreen / Modern Large Terminal
    return 'ultrawide'; // 4K / Ultrawide displays
  }

  public isInteractive(): boolean {
    return Boolean(process.stdin.isTTY && process.stdout.isTTY);
  }

  public isCompact(): boolean {
    return this.getBreakpoint() === 'compact';
  }
}

export const defaultTerminal = new TerminalDetector();
