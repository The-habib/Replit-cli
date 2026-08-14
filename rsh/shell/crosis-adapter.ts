import WebSocket from 'ws';
import { Channel, Client, ConnectionState, FetchConnectionMetadataResult } from '@replit/crosis';
import { api } from '@replit/protocol';
import { ReplitApiClient } from '../api/client.js';
import { IShellSession, ShellEvents, ShellSessionOptions } from './types.js';

export class CrosisShellSession implements IShellSession {
  private client: Client<{ replId: string }>;
  private apiClient: ReplitApiClient;
  private options: ShellSessionOptions;
  private events: ShellEvents;
  private execChannel: Channel | null = null;
  private closeChannelFn: (() => void) | null = null;
  private isClosed: boolean = false;

  constructor(options: ShellSessionOptions, events: ShellEvents = {}, apiClient?: ReplitApiClient) {
    this.options = options;
    this.events = events;
    this.apiClient = apiClient || new ReplitApiClient();
    this.client = new Client<{ replId: string }>();
  }

  public async start(): Promise<void> {
    this.events.onStateChange?.('connecting');

    const fetchConnectionMetadata = async (
      signal: AbortSignal
    ): Promise<FetchConnectionMetadataResult> => {
      try {
        const meta = await this.apiClient.getConnectionMetadata(this.options.replId);
        return {
          token: meta.token,
          gurl: meta.gurl,
          conmanURL: meta.conmanURL || `https://conman.repl.it/${this.options.replId}`,
          wsURL: meta.wsURL || meta.gurl,
          dotdevHostname: meta.dotdevHostname || `${this.options.replId}.id.repl.co`,
          error: null,
        };
      } catch (err: any) {
        return {
          error: err,
        };
      }
    };

    if (this.options.mockMode) {
      this.startMockSession();
      return;
    }

    try {
      this.client.open(
        {
          context: { replId: this.options.replId },
          fetchConnectionMetadata,
          WebSocketClass: WebSocket as any,
          timeout: 10000,
        },
        ({ channel }) => {
          this.events.onStateChange?.('connected');

          // Open the exec channel
          this.closeChannelFn = this.client.openChannel(
            { service: 'exec', name: 'rsh-shell' },
            ({ channel: childChannel }) => {
              this.execChannel = childChannel;

              childChannel.onCommand((cmd: api.Command) => {
                if (cmd.output) {
                  this.events.onData?.(cmd.output);
                }
                if (cmd.stderr) {
                  this.events.onData?.(cmd.stderr);
                }
                if (cmd.exitCodeEvent !== undefined && cmd.exitCodeEvent !== null) {
                  const code = typeof cmd.exitCodeEvent === 'number' ? cmd.exitCodeEvent : (cmd.exitCodeEvent as any).code || 0;
                  this.events.onExit?.(code);
                }
              });

              // Initiate the shell process
              const args = this.options.command && this.options.command.length > 0
                ? this.options.command
                : ['/bin/bash', '-l'];

              childChannel.send({
                exec: {
                  args,
                  env: {
                    TERM: 'xterm-256color',
                    COLORTERM: 'truecolor',
                    ...this.options.env,
                  },
                },
              });

              // Send initial terminal dimensions if specified
              if (this.options.rows && this.options.cols) {
                childChannel.send({
                  resizeTerm: {
                    rows: this.options.rows,
                    cols: this.options.cols,
                  },
                });
              }
            }
          );
        }
      );

      this.client.onConnectionStateChange((state: ConnectionState) => {
        if (state === ConnectionState.CONNECTED) {
          this.events.onStateChange?.('connected');
        } else if (state === ConnectionState.CONNECTING) {
          this.events.onStateChange?.('reconnecting');
        } else if (state === ConnectionState.DISCONNECTED) {
          this.events.onStateChange?.('disconnected');
        }
      });
    } catch (err: any) {
      this.events.onError?.(err);
      throw err;
    }
  }

  private startMockSession(): void {
    setTimeout(() => {
      this.events.onStateChange?.('connected');
      if (this.options.command && this.options.command.length > 0 && !this.options.interactive) {
        const cmdStr = this.options.command.join(' ');
        this.events.onData?.(`[mock container: ${this.options.replSlug || this.options.replId}] ${cmdStr}\n`);
        this.events.onExit?.(0);
        return;
      }
      this.events.onData?.('\x1b[1;34m[rsh]\x1b[0m Connected to container \x1b[32m' + this.options.replId + '\x1b[0m\r\n');
      this.events.onData?.('\x1b[1;36mLinux replit-eval-box 6.6.0-replit x86_64\x1b[0m\r\n\r\n');
      this.events.onData?.('runner@' + (this.options.replSlug || 'workspace') + ':~$ ');
    }, 50);
  }

  public send(data: string | Buffer): void {
    if (this.isClosed) return;

    if (this.options.mockMode) {
      const str = data.toString();
      if (str === '\r') {
        this.events.onData?.('\r\nrunner@' + (this.options.replSlug || 'workspace') + ':~$ ');
      } else if (str === '\x03') {
        this.events.onData?.('^C\r\nrunner@' + (this.options.replSlug || 'workspace') + ':~$ ');
      } else {
        this.events.onData?.(str);
      }
      return;
    }

    if (this.execChannel) {
      this.execChannel.send({
        input: typeof data === 'string' ? data : data.toString('utf8'),
      });
    }
  }

  public resize(rows: number, cols: number): void {
    if (this.isClosed) return;
    if (this.execChannel) {
      this.execChannel.send({
        resizeTerm: { rows, cols },
      });
    }
  }

  public kill(signal: string = 'SIGTERM'): void {
    this.disconnect();
    this.events.onExit?.(130, signal);
  }

  public disconnect(): void {
    if (this.isClosed) return;
    this.isClosed = true;
    if (this.closeChannelFn) {
      try {
        this.closeChannelFn();
      } catch {}
    }
    try {
      this.client.destroy();
    } catch {}
    this.events.onStateChange?.('disconnected');
  }
}
