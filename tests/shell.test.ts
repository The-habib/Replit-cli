import { describe, it, expect } from 'vitest';
import { LocalShellSession } from '../shell/local-engine.js';
import { CrosisShellSession } from '../shell/crosis-adapter.js';

describe('Shell & Remote Execution Subsystem', () => {
  it('should execute a local command and capture output via LocalShellSession', async () => {
    let capturedData = '';
    let exitCode = -1;

    const session = new LocalShellSession(
      {
        replId: 'local-test',
        command: ['echo', 'rsh-local-test-output'],
      },
      {
        onData: (data) => {
          capturedData += data.toString();
        },
        onExit: (code) => {
          exitCode = code;
        },
      }
    );

    await session.start();

    // Wait for exit
    await new Promise<void>((resolve) => {
      const check = setInterval(() => {
        if (exitCode !== -1) {
          clearInterval(check);
          resolve();
        }
      }, 20);
    });

    expect(capturedData).toContain('rsh-local-test-output');
    expect(exitCode).toBe(0);
  });

  it('should handle mock Crosis session interactive events', async () => {
    let capturedData = '';
    let connectionState = '';

    const session = new CrosisShellSession(
      {
        replId: 'mock-repl-id',
        replSlug: 'my-project',
        mockMode: true,
      },
      {
        onData: (data) => {
          capturedData += data.toString();
        },
        onStateChange: (state) => {
          connectionState = state;
        },
      }
    );

    await session.start();

    // Wait for mock connection
    await new Promise((r) => setTimeout(r, 100));

    expect(connectionState).toBe('connected');
    expect(capturedData).toContain('Connected to container');

    // Send input and verify mock echo
    session.send('ls -la\r');
    await new Promise((r) => setTimeout(r, 50));

    expect(capturedData).toContain('runner@my-project');

    session.disconnect();
  });
});
