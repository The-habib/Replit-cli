import { describe, it, expect } from 'vitest';
import { renderBreadcrumbs } from '../core/ui/breadcrumbs.js';
import { InteractiveLauncher } from '../core/ui/launcher.js';

describe('Interactive Launcher & Navigation Subsystem', () => {
  it('should render styled navigation breadcrumbs', () => {
    const crumbs = renderBreadcrumbs(['rsh', 'Projects', 'my-express-api', 'Shell']);
    expect(crumbs).toContain('rsh');
    expect(crumbs).toContain('Projects');
    expect(crumbs).toContain('my-express-api');
    expect(crumbs).toContain('Shell');
  });

  it('should instantiate InteractiveLauncher cleanly', () => {
    const launcher = new InteractiveLauncher();
    expect(launcher).toBeDefined();
  });
});
