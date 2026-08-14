import { describe, it, expect } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { SecretsService } from '../core/secrets.js';

describe('Secrets Subsystem', () => {
  const tempEnv = path.join(os.tmpdir(), `rsh-secrets-test-${Date.now()}.env`);
  const service = new SecretsService(tempEnv);

  it('should set and list secrets in dotenv format', () => {
    service.setSecret('API_SECRET_KEY', 'sk_live_1234567890');
    service.setSecret('DATABASE_URL', 'postgresql://localhost:5432/mydb');

    const list = service.listSecrets();
    expect(list.length).toBeGreaterThanOrEqual(2);

    const match = list.find((s) => s.key === 'API_SECRET_KEY');
    expect(match).toBeDefined();
    expect(match?.value).toBe('sk_live_1234567890');
  });

  it('should mask sensitive secret values', () => {
    const masked = service.maskSecret('super-secret-token-123');
    expect(masked).toContain('••••');
    expect(masked.startsWith('sup')).toBe(true);
  });

  it('should remove secret from file', () => {
    service.removeSecret('API_SECRET_KEY');
    const list = service.listSecrets();
    const match = list.find((s) => s.key === 'API_SECRET_KEY');
    expect(match).toBeUndefined();
  });
});
