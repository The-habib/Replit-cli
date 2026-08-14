export type ShellMode = 'remote' | 'local' | 'ssh' | 'auto';

export interface ShellSessionOptions {
  replId: string;
  replSlug?: string;
  mode?: ShellMode;
  command?: string[];
  env?: Record<string, string>;
  cwd?: string;
  interactive?: boolean;
  rows?: number;
  cols?: number;
  mockMode?: boolean;
}

export interface ShellEvents {
  onData?: (data: string | Buffer) => void;
  onError?: (err: Error) => void;
  onExit?: (code: number, signal?: string) => void;
  onStateChange?: (state: 'connecting' | 'connected' | 'reconnecting' | 'disconnected') => void;
}

export interface IShellSession {
  start(): Promise<void>;
  send(data: string | Buffer): void;
  resize(rows: number, cols: number): void;
  disconnect(): void;
  kill(signal?: string): void;
}
