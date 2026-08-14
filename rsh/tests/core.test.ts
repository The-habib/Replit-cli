import { describe, it, expect } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { ProjectService } from '../core/project.js';
import { SyncService } from '../core/sync.js';
import { AiService } from '../core/ai.js';
import { ReplitApiClient } from '../api/client.js';

describe('Core Subsystem (Project, Sync & AI)', () => {
  const apiClient = new ReplitApiClient({ mockMode: true });
  const projectService = new ProjectService(apiClient);
  const syncService = new SyncService(apiClient);
  const aiService = new AiService();

  it('should list projects via ProjectService', async () => {
    const list = await projectService.listProjects();
    expect(list.length).toBeGreaterThan(0);
  });

  it('should clone a Repl into a temporary directory', async () => {
    const tempDir = path.join(os.tmpdir(), `rsh-clone-test-${Date.now()}`);
    const res = await syncService.clone('my-express-api', tempDir);

    expect(fs.existsSync(res.dir)).toBe(true);
    expect(fs.existsSync(path.join(res.dir, '.replit.json'))).toBe(true);
    expect(fs.existsSync(path.join(res.dir, 'index.js'))).toBe(true);
  });

  it('should pull and push project files', async () => {
    const tempDir = path.join(os.tmpdir(), `rsh-sync-test-${Date.now()}`);
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(path.join(tempDir, 'test.txt'), 'hello');

    const pullRes = await syncService.pull('my-express-api', tempDir);
    expect(pullRes.totalFiles).toBeGreaterThan(0);

    const pushRes = await syncService.push('my-express-api', tempDir);
    expect(pushRes.totalFiles).toBeGreaterThan(0);
  });

  it('should answer questions with context via AiService ask', async () => {
    const answer = await aiService.ask('How do I log in to Replit with rsh?');
    expect(answer).toBeDefined();
    expect(answer.toLowerCase()).toContain('login');
  });

  it('should run autonomous agent multi-step loop via AiService agent', async () => {
    const tempDir = path.join(os.tmpdir(), `rsh-agent-test-${Date.now()}`);
    fs.mkdirSync(tempDir, { recursive: true });

    const session = await aiService.agent('Create a simple node script', undefined, tempDir);
    expect(session.steps.length).toBeGreaterThanOrEqual(3);
    expect(session.success).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'index.js'))).toBe(true);
  });
});
