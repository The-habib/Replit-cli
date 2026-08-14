import { describe, it, expect } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import { AuthStorage } from '../auth/storage.js';
import { AuthManager } from '../auth/manager.js';

describe('Multi-Account Subsystem', () => {
  const tempDir = path.join(os.tmpdir(), `rsh-auth-accounts-${Date.now()}`);
  const storage = new AuthStorage(tempDir);
  const auth = new AuthManager(storage);

  it('should save and switch between multiple user accounts', () => {
    auth.saveLogin({
      username: 'developer_one',
      userId: 'user-101',
      token: 'tok_dev_one_123',
    });

    auth.saveLogin({
      username: 'developer_two',
      userId: 'user-102',
      token: 'tok_dev_two_456',
    });

    const accounts = auth.listAccounts();
    expect(accounts.length).toBe(2);

    expect(auth.resolveCredentials().username).toBe('developer_two');

    const switched = auth.switchAccount('developer_one');
    expect(switched).toBe(true);
    expect(auth.resolveCredentials().username).toBe('developer_one');
    expect(auth.resolveCredentials().token).toBe('tok_dev_one_123');
  });

  it('should remove an account cleanly', () => {
    const removed = auth.removeAccount('developer_one');
    expect(removed).toBe(true);
    const accounts = auth.listAccounts();
    expect(accounts.length).toBe(1);
    expect(accounts[0].username).toBe('developer_two');
  });
});
