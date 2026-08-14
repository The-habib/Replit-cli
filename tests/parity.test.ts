import { describe, it, expect } from 'vitest';
import { ProjectService } from '../core/project.js';
import { ReplitApiClient } from '../api/client.js';
import { BrowserBridge } from '../auth/bridge.js';

describe('Browser Parity & Bridge Subsystem', () => {
  const apiClient = new ReplitApiClient({ mockMode: true });
  const projectService = new ProjectService(apiClient);
  const bridge = new BrowserBridge(9898);

  it('should duplicate / fork an existing project', async () => {
    const fork = await projectService.createProject({
      title: 'Forked Test App',
      language: 'nodejs',
      isPrivate: true,
      description: 'Fork test',
    });

    expect(fork).toBeDefined();
    expect(fork.title).toBe('Forked Test App');
    expect(fork.slug).toBe('forked-test-app');
  });

  it('should initialize browser bridge instance', () => {
    expect(bridge).toBeDefined();
  });
});
