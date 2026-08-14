import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export type SupportedOS = 'linux' | 'darwin' | 'win32' | 'android' | 'wsl' | 'replit';
export type SupportedArch = 'x64' | 'arm64' | 'arm' | 'ia32' | 'unknown';
export type SupportedShell = 'bash' | 'zsh' | 'fish' | 'powershell' | 'cmd' | 'sh';

export interface PlatformInfo {
  os: SupportedOS;
  rawPlatform: NodeJS.Platform;
  arch: SupportedArch;
  isWSL: boolean;
  isTermux: boolean;
  isReplitContainer: boolean;
  configDir: string;
  cacheDir: string;
  defaultShell: string;
  shellType: SupportedShell;
  pathSeparator: string;
  lineEnding: string;
}

export class PlatformDetector {
  private cachedInfo: PlatformInfo | null = null;

  public getPlatformInfo(): PlatformInfo {
    if (this.cachedInfo) {
      return this.cachedInfo;
    }

    const rawPlatform = os.platform();
    const rawArch = os.arch() as SupportedArch;
    const isReplitContainer = Boolean(
      process.env.REPL_ID ||
      process.env.REPLIT_USER ||
      process.env.REPL_OWNER ||
      process.env.REPLIT_CLI
    );

    const isTermux = Boolean(
      process.env.TERMUX_VERSION ||
      (process.env.PREFIX && process.env.PREFIX.includes('com.termux'))
    );

    const isWSL = this.checkWSL();

    let osType: SupportedOS = 'linux';
    if (isReplitContainer) osType = 'replit';
    else if (isTermux) osType = 'android';
    else if (isWSL) osType = 'wsl';
    else if (rawPlatform === 'darwin') osType = 'darwin';
    else if (rawPlatform === 'win32') osType = 'win32';
    else osType = 'linux';

    const configDir = this.resolveConfigDir(osType, rawPlatform);
    const cacheDir = this.resolveCacheDir(osType, rawPlatform);
    const { defaultShell, shellType } = this.resolveShell(rawPlatform);

    this.cachedInfo = {
      os: osType,
      rawPlatform,
      arch: rawArch || 'unknown',
      isWSL,
      isTermux,
      isReplitContainer,
      configDir,
      cacheDir,
      defaultShell,
      shellType,
      pathSeparator: path.sep,
      lineEnding: rawPlatform === 'win32' ? '\r\n' : '\n',
    };

    return this.cachedInfo;
  }

  private checkWSL(): boolean {
    if (os.platform() !== 'linux') return false;
    try {
      if (fs.existsSync('/proc/version')) {
        const version = fs.readFileSync('/proc/version', 'utf8').toLowerCase();
        return version.includes('microsoft') || version.includes('wsl');
      }
    } catch {}
    return false;
  }

  public resolveConfigDir(osType: SupportedOS, rawPlatform: NodeJS.Platform): string {
    if (process.env.RSH_CONFIG_DIR) {
      return process.env.RSH_CONFIG_DIR;
    }

    const home = os.homedir();

    switch (rawPlatform) {
      case 'win32': {
        const appData = process.env.APPDATA || process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Roaming');
        return path.join(appData, 'rsh');
      }
      case 'darwin':
        return path.join(home, 'Library', 'Application Support', 'rsh');
      default: {
        // Linux / WSL / Android / Replit
        const xdgConfig = process.env.XDG_CONFIG_HOME || path.join(home, '.config');
        return path.join(xdgConfig, 'rsh');
      }
    }
  }

  public resolveCacheDir(osType: SupportedOS, rawPlatform: NodeJS.Platform): string {
    if (process.env.RSH_CACHE_DIR) {
      return process.env.RSH_CACHE_DIR;
    }

    const home = os.homedir();

    switch (rawPlatform) {
      case 'win32': {
        const localAppData = process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local');
        return path.join(localAppData, 'rsh', 'cache');
      }
      case 'darwin':
        return path.join(home, 'Library', 'Caches', 'rsh');
      default: {
        const xdgCache = process.env.XDG_CACHE_HOME || path.join(home, '.cache');
        return path.join(xdgCache, 'rsh');
      }
    }
  }

  public resolveShell(rawPlatform: NodeJS.Platform): { defaultShell: string; shellType: SupportedShell } {
    if (rawPlatform === 'win32') {
      if (process.env.PSModulePath) {
        return { defaultShell: 'powershell.exe', shellType: 'powershell' };
      }
      return { defaultShell: process.env.COMSPEC || 'cmd.exe', shellType: 'cmd' };
    }

    const userShell = process.env.SHELL;
    if (userShell) {
      if (userShell.endsWith('zsh')) return { defaultShell: userShell, shellType: 'zsh' };
      if (userShell.endsWith('fish')) return { defaultShell: userShell, shellType: 'fish' };
      if (userShell.endsWith('bash')) return { defaultShell: userShell, shellType: 'bash' };
      return { defaultShell: userShell, shellType: 'sh' };
    }

    return { defaultShell: '/bin/bash', shellType: 'bash' };
  }
}

export const defaultPlatformDetector = new PlatformDetector();
