import { spawn, ChildProcess } from 'child_process';
import { IShellSession, ShellEvents, ShellSessionOptions } from './types.js';
import { defaultPlatformDetector } from '../core/platform.js';

export class LocalShellSession implements IShellSession {
  private options: ShellSessionOptions;
  private events: ShellEvents;
  private child: ChildProcess | null = null;

  constructor(options: ShellSessionOptions, events: ShellEvents = {}) {
    this.options = options;
    this.events = events;
  }

  public async start(): Promise<void> {
    const platform = defaultPlatformDetector.getPlatformInfo();
    const cmdArgs = this.options.command || [platform.defaultShell];
    const isWindows = platform.rawPlatform === 'win32';

    this.events.onStateChange?.('connecting');

    try {
      if (isWindows) {
        this.child = spawn('cmd.exe', ['/c', ...cmdArgs], {
          cwd: this.options.cwd || process.cwd(),
          env: {
            ...process.env,
            ...this.options.env,
            TERM: 'xterm-256color',
            REPL_SLUG: this.options.replSlug || 'workspace',
            REPL_ID: this.options.replId || 'local',
          },
          stdio: ['pipe', 'pipe', 'pipe'],
        });
      } else {
        const shellBin = cmdArgs[0] || platform.defaultShell;
        const args = cmdArgs.length > 1 ? cmdArgs.slice(1) : ['-l'];

        this.child = spawn(shellBin, args, {
          cwd: this.options.cwd || process.cwd(),
          env: {
            ...process.env,
            ...this.options.env,
            TERM: 'xterm-256color',
            REPL_SLUG: this.options.replSlug || 'workspace',
            REPL_ID: this.options.replId || 'local',
          },
          stdio: ['pipe', 'pipe', 'pipe'],
        });
      }

      this.events.onStateChange?.('connected');

      if (this.child.stdout) {
        this.child.stdout.on('data', (chunk: Buffer) => {
          this.events.onData?.(chunk.toString('utf8'));
        });
      }

      if (this.child.stderr) {
        this.child.stderr.on('data', (chunk: Buffer) => {
          this.events.onData?.(chunk.toString('utf8'));
        });
      }

      this.child.on('close', (code: number | null) => {
        this.events.onStateChange?.('disconnected');
        this.events.onExit?.(code ?? 0);
      });

      this.child.on('error', (err: Error) => {
        this.events.onError?.(err);
      });
    } catch (err: any) {
      this.events.onError?.(err);
      throw err;
    }
  }

  public send(data: string | Buffer): void {
    if (this.child && this.child.stdin && !this.child.stdin.destroyed) {
      this.child.stdin.write(data);
    }
  }

  public resize(rows: number, cols: number): void {
    // Pipe-based local resize is managed via terminal driver
  }

  public disconnect(): void {
    if (this.child) {
      this.child.kill('SIGTERM');
      this.child = null;
    }
    this.events.onStateChange?.('disconnected');
  }

  public kill(signal?: string): void {
    if (this.child) {
      this.child.kill((signal as any) || 'SIGTERM');
      this.child = null;
    }
    this.events.onStateChange?.('disconnected');
  }
}
