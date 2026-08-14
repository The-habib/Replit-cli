import { describe, it, expect, beforeEach } from 'vitest';
import { ReplitApiClient } from '../api/client.js';
import { AuthStorage } from '../auth/storage.js';
import { AuthManager } from '../auth/manager.js';

describe('API Subsystem (GraphQL & Client)', () => {
  let client: ReplitApiClient;
  let authManager: AuthManager;

  beforeEach(() => {
    const storage = new AuthStorage();
    storage.setMemoryOnly(true);
    authManager = new AuthManager(storage);
    client = new ReplitApiClient({
      authManager,
      mockMode: true,
    });
  });

  it('should fetch current user profile in mock/test mode', async () => {
    const user = await client.getCurrentUser();
    expect(user).toBeDefined();
    expect(user?.username).toBe('mockuser');
    expect(user?.plan?.name).toBe('Replit Core');
  });

  it('should list repls and map attributes correctly', async () => {
    const repls = await client.getUserRepls('mockuser');
    expect(repls.length).toBeGreaterThan(0);
    const first = repls[0];
    expect(first.title).toBeDefined();
    expect(first.slug).toBeDefined();
    expect(first.language).toBeDefined();
  });

  it('should create a new Repl and format slug', async () => {
    const newRepl = await client.createRepl({
      title: 'Fullstack Microservice',
      language: 'nodejs',
      isPrivate: true,
      description: 'Test repl created via rsh test suite',
    });

    expect(newRepl.title).toBe('Fullstack Microservice');
    expect(newRepl.slug).toBe('fullstack-microservice');
    expect(newRepl.isPrivate).toBe(true);
    expect(newRepl.url).toContain('fullstack-microservice');
  });

  it('should get Repl by slug/url', async () => {
    const repl = await client.getRepl('my-express-api');
    expect(repl).not.toBeNull();
    expect(repl?.slug).toBe('my-express-api');
  });

  it('should resolve connection metadata for Crosis', async () => {
    const meta = await client.getConnectionMetadata('repl-101');
    expect(meta.token).toBeDefined();
    expect(meta.gurl).toContain('wsv2');
    expect(meta.conmanURL).toBeDefined();
  });

  it('should delete Repl by ID', async () => {
    const result = await client.deleteRepl('repl-101');
    expect(result).toBe(true);
  });
});
