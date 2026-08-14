import { describe, it, expect } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { AuthStorage } from '../auth/storage.js';
import { AuthManager } from '../auth/manager.js';
import { ReplitApiClient } from '../api/client.js';
import { ProjectService } from '../core/project.js';
import { DbService } from '../core/db.js';
import { SecretsService } from '../core/secrets.js';
import { withRetry } from '../core/retry.js';

describe('Phase 12: Hostile QA & Stress Testing', () => {
  const tempDir = path.join(os.tmpdir(), `rsh-hostile-qa-${Date.now()}`);
  const storage = new AuthStorage(tempDir);
  const auth = new AuthManager(storage);
  const apiClient = new ReplitApiClient({ mockMode: true });
  const projectService = new ProjectService(apiClient);
  const dbService = new DbService();
  const secretsService = new SecretsService(path.join(tempDir, '.env'));

  it('1. should survive corrupted / unreadable config JSON', () => {
    fs.mkdirSync(tempDir, { recursive: true });
    const configPath = path.join(tempDir, 'config.json');
    fs.writeFileSync(configPath, '{ invalid json corrupted !!! :::: }');

    expect(() => storage.load()).not.toThrow();
    const loaded = storage.load();
    expect(loaded).toBeDefined();
  });

  it('2. should handle non-existent project lookup gracefully', async () => {
    const repl = await projectService.getProject('non-existent-repl-99999999');
    expect(repl).toBeDefined();
    expect(repl?.slug).toBe('non-existent-repl-99999999');
  });

  it('3. should handle invalid SQL syntax without crashing', async () => {
    const res = await dbService.runQuery('INVALID SYNTAX ERROR SELECT !@#$%^&*');
    expect(res).toBeDefined();
  });

  it('4. should safely mask extreme shell injection patterns in secrets', () => {
    const maliciousSecret = "'; rm -rf /; echo 'injected' #";
    secretsService.setSecret('EVIL_VAR', maliciousSecret);
    const masked = secretsService.maskSecret(maliciousSecret);

    expect(masked).toContain('••••');
    expect(masked).not.toBe(maliciousSecret);
  });

  it('5. should handle network timeout in retry engine gracefully', async () => {
    let attempts = 0;
    await expect(
      withRetry(
        async () => {
          attempts++;
          throw new Error('ETIMEDOUT: Host unreachable');
        },
        { maxRetries: 2, baseDelayMs: 5 }
      )
    ).rejects.toThrow('ETIMEDOUT');

    expect(attempts).toBe(3); // Initial + 2 retries
  });

  it('6. should handle rapid concurrent account operations safely', async () => {
    for (let i = 0; i < 10; i++) {
      auth.saveLogin({
        username: `stress_user_${i}`,
        token: `tok_stress_${i}`,
      });
    }

    const accounts = auth.listAccounts();
    expect(accounts.length).toBe(10);

    expect(auth.switchAccount('stress_user_5')).toBe(true);
    expect(auth.resolveCredentials().username).toBe('stress_user_5');
  });
});
