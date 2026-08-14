import { AuthManager, defaultAuthManager } from '../auth/manager.js';
import { ReplitApiClient, defaultApiClient } from '../api/client.js';
import { CrosisShellSession } from './crosis-adapter.js';
import { LocalShellSession } from './local-engine.js';
import { IShellSession, ShellMode, ShellSessionOptions } from './types.js';

export class InteractiveTerminalRunner {
  private session: IShellSession | null = null;
  private options: ShellSessionOptions;
  private authManager: AuthManager;
  private apiClient: ReplitApiClient;
  private originalRawMode: boolean = false;

  constructor(
    options: ShellSessionOptions,
    authManager?: AuthManager,
    apiClient?: ReplitApiClient
  ) {
    this.options = options;
    this.authManager = authManager || defaultAuthManager;
    this.apiClient = apiClient || defaultApiClient;
  }

  public async run(): Promise<number> {
    const mode = this.resolveMode();
    const rows = process.stdout.rows || 24;
    const cols = process.stdout.columns || 80;

    return new Promise<number>((resolve, reject) => {
      let exitCode = 0;

      const events = {
        onData: (data: string | Buffer) => {
          process.stdout.write(data);
        },
        onError: (err: Error) => {
          this.cleanup();
          reject(err);
        },
        onExit: (code: number) => {
          exitCode = code;
          this.cleanup();
          resolve(code);
        },
        onStateChange: (state: string) => {
          if (state === 'disconnected' && this.session) {
            this.cleanup();
            resolve(exitCode);
          }
        },
      };

      if (mode === 'local') {
        this.session = new LocalShellSession(
          {
            ...this.options,
            rows,
            cols,
          },
          events
        );
      } else {
        this.session = new CrosisShellSession(
          {
            ...this.options,
            rows,
            cols,
          },
          events,
          this.apiClient
        );
      }

      this.setupTerminal();

      this.session.start().catch((err) => {
        this.cleanup();
        reject(err);
      });
    });
  }

  private resolveMode(): ShellMode {
    if (this.options.mode && this.options.mode !== 'auto') {
      return this.options.mode;
    }

    const container = this.authManager.detectContainerContext();
    if (
      container.isInsideContainer &&
      (this.options.replId === container.replId ||
        this.options.replSlug === container.replSlug ||
        this.options.replSlug === 'workspace' ||
        this.options.replSlug === 'current')
    ) {
      return 'local';
    }

    return 'remote';
  }

  private setupTerminal(): void {
    if (process.stdin.isTTY) {
      this.originalRawMode = Boolean(process.stdin.isRaw);
      process.stdin.setRawMode(true);
      process.stdin.resume();

      process.stdin.on('data', this.handleStdinData);
      process.stdout.on('resize', this.handleResize);
    }

    process.on('SIGINT', this.handleSigint);
    process.on('SIGTERM', this.handleSigterm);
  }

  private handleStdinData = (data: Buffer): void => {
    if (this.session) {
      this.session.send(data);
    }
  };

  private handleResize = (): void => {
    if (this.session && process.stdout.isTTY) {
      this.session.resize(process.stdout.rows || 24, process.stdout.columns || 80);
    }
  };

  private handleSigint = (): void => {
    // If raw mode is on, Ctrl+C is passed as \x03 to the session
    if (!process.stdin.isRaw && this.session) {
      this.session.kill('SIGINT');
    }
  };

  private handleSigterm = (): void => {
    if (this.session) {
      this.session.kill('SIGTERM');
    }
  };

  private cleanup(): void {
    if (process.stdin.isTTY) {
      try {
        process.stdin.removeListener('data', this.handleStdinData);
        process.stdout.removeListener('resize', this.handleResize);
        process.stdin.setRawMode(this.originalRawMode);
        process.stdin.pause();
      } catch {}
    }

    process.removeListener('SIGINT', this.handleSigint);
    process.removeListener('SIGTERM', this.handleSigterm);
  }
}
