import { describe, it, expect } from 'vitest';
import * as path from 'path';
import * as os from 'os';
import { ConfigService } from '../core/config.js';

describe('Config Subsystem (Preferences)', () => {
  const tempConfig = path.join(os.tmpdir(), `rsh-prefs-${Date.now()}.json`);
  const service = new ConfigService(tempConfig);

  it('should load default preferences when empty', () => {
    const prefs = service.getPreferences();
    expect(prefs.editor).toBe('nano');
    expect(prefs.colorMode).toBe('auto');
  });

  it('should set and get custom preferences', () => {
    service.set('editor', 'nvim');
    service.set('defaultRepl', 'my-favorite-app');
    service.set('autoSync', true);

    expect(service.get('editor')).toBe('nvim');
    expect(service.get('defaultRepl')).toBe('my-favorite-app');
    expect(service.get('autoSync')).toBe(true);
  });
});
