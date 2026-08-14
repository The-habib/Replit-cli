import { describe, it, expect } from 'vitest';
import { DbService } from '../core/db.js';

describe('Database Subsystem', () => {
  const dbService = new DbService();

  it('should detect environment database configuration', () => {
    const info = dbService.detectDatabase();
    expect(info).toBeDefined();
    expect(['postgres', 'sqlite', 'none']).toContain(info.type);
    expect(['connected', 'available', 'not_configured']).toContain(info.status);
  });
});
