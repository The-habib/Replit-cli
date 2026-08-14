import { describe, it, expect } from 'vitest';
import { PlatformDetector } from '../core/platform.js';
import { defaultUpdateChecker } from '../core/update.js';

describe('Cross-Platform Compatibility Subsystem', () => {
  const detector = new PlatformDetector();

  it('should detect current runtime platform and shell', () => {
    const info = detector.getPlatformInfo();
    expect(info).toBeDefined();
    expect(['linux', 'darwin', 'win32', 'android', 'wsl', 'replit']).toContain(info.os);
    expect(info.configDir).toBeDefined();
    expect(info.defaultShell).toBeDefined();
    expect(info.pathSeparator).toBeDefined();
  });

  it('should resolve Windows AppData config directory correctly', () => {
    const winConfig = detector.resolveConfigDir('win32', 'win32');
    expect(winConfig).toBeDefined();
    expect(winConfig.includes('rsh')).toBe(true);
  });

  it('should resolve macOS Application Support config directory correctly', () => {
    const macConfig = detector.resolveConfigDir('darwin', 'darwin');
    expect(macConfig).toContain('Library/Application Support/rsh');
  });

  it('should resolve Linux XDG config directory correctly', () => {
    const linuxConfig = detector.resolveConfigDir('linux', 'linux');
    expect(linuxConfig).toContain('.config/rsh');
  });

  it('should check version with UpdateChecker', async () => {
    const res = await defaultUpdateChecker.checkForUpdate();
    expect(res).toBeDefined();
    expect(res.currentVersion).toBe('1.0.0');
  });
});
