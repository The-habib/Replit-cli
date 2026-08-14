import { describe, it, expect, beforeEach } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { AuthStorage } from '../auth/storage.js';
import { AuthManager } from '../auth/manager.js';

describe('Authentication Subsystem', () => {
  const tempDir = path.join(os.tmpdir(), `rsh-auth-test-${Date.now()}`);
  let storage: AuthStorage;
  let authManager: AuthManager;

  beforeEach(() => {
    storage = new AuthStorage(tempDir);
    authManager = new AuthManager(storage);
  });

  it('should encrypt and decrypt sensitive token payloads', () => {
    const originalToken = 'secret-replit-token-xyz-12345';
    const encrypted = storage.encrypt(originalToken);
    expect(encrypted).not.toBe(originalToken);
    expect(encrypted).toContain(':');

    const decrypted = storage.decrypt(encrypted);
    expect(decrypted).toBe(originalToken);
  });

  it('should save and load credentials securely', () => {
    authManager.saveLogin({
      username: 'testdeveloper',
      userId: 'user-999',
      connectSid: 's%3Atest-session-cookie-val',
      email: 'dev@replit.test',
    });

    const loaded = storage.load();
    expect(loaded.username).toBe('testdeveloper');
    expect(loaded.userId).toBe('user-999');
    expect(loaded.connectSid).toBe('s%3Atest-session-cookie-val');
  });

  it('should resolve credentials with correct priority', () => {
    // 1. Explicit override
    const explicit = authManager.resolveCredentials('explicit-api-key');
    expect(explicit.token).toBe('explicit-api-key');
    expect(explicit.authMethod).toBe('token');

    // 2. Cookie recognition
    const cookieExplicit = authManager.resolveCredentials('s%3Aexplicit-session-cookie');
    expect(cookieExplicit.connectSid).toBe('s%3Aexplicit-session-cookie');
    expect(cookieExplicit.authMethod).toBe('cookie');
  });

  it('should clear credentials on logout', () => {
    authManager.saveLogin({ username: 'temp-user', token: 'temp-token' });
    expect(storage.load().token).toBe('temp-token');

    authManager.logout();
    expect(storage.load().token).toBeUndefined();
  });

  it('should detect container environment context if present', () => {
    const context = authManager.detectContainerContext();
    expect(context).toBeDefined();
    expect(typeof context.isInsideContainer).toBe('boolean');
  });
});
