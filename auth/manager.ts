import { AuthStorage, defaultStorage } from './storage.js';
import { AccountProfile, AuthConfig, AuthMethod, ResolveCredentialsResult, UserProfile } from './types.js';

export class AuthManager {
  private storage: AuthStorage;

  constructor(storage?: AuthStorage) {
    this.storage = storage || defaultStorage;
  }

  public getStorage(): AuthStorage {
    return this.storage;
  }

  public detectContainerContext(): {
    isInsideContainer: boolean;
    replId?: string;
    replSlug?: string;
    replOwner?: string;
    replitUser?: string;
  } {
    const isInsideContainer = Boolean(
      process.env.REPL_ID ||
      process.env.REPLIT_USER ||
      process.env.REPL_OWNER ||
      process.env.REPLIT_CLI
    );

    return {
      isInsideContainer,
      replId: process.env.REPL_ID,
      replSlug: process.env.REPL_SLUG,
      replOwner: process.env.REPL_OWNER,
      replitUser: process.env.REPLIT_USER,
    };
  }

  public resolveCredentials(explicitToken?: string): ResolveCredentialsResult {
    // 1. Explicit token passed via CLI argument / flag
    if (explicitToken) {
      const isSid = explicitToken.startsWith('s%3A') || explicitToken.length > 50;
      return {
        token: isSid ? undefined : explicitToken,
        connectSid: isSid ? explicitToken : undefined,
        authMethod: isSid ? 'cookie' : 'token',
        apiUrl: process.env.REPLIT_API_URL || 'https://replit.com/graphql',
      };
    }

    // 2. Storage / Environment check
    const config = this.storage.load();

    if (config.connectSid) {
      return {
        connectSid: config.connectSid,
        token: config.token,
        username: config.username,
        authMethod: 'cookie',
        apiUrl: config.apiUrl || 'https://replit.com/graphql',
      };
    }

    if (config.token) {
      return {
        token: config.token,
        username: config.username,
        authMethod: 'token',
        apiUrl: config.apiUrl || 'https://replit.com/graphql',
      };
    }

    // 3. Container Context Detection
    const container = this.detectContainerContext();
    if (container.isInsideContainer && (container.replitUser || container.replOwner)) {
      return {
        username: container.replitUser || container.replOwner,
        authMethod: 'container',
        apiUrl: config.apiUrl || 'https://replit.com/graphql',
      };
    }

    return {
      authMethod: 'mock',
      apiUrl: config.apiUrl || 'https://replit.com/graphql',
    };
  }

  public saveLogin(params: {
    token?: string;
    connectSid?: string;
    username?: string;
    userId?: string;
    email?: string;
    apiUrl?: string;
  }): void {
    const existing = this.storage.load();
    const uname = params.username || existing.username || 'default';
    const accounts = { ...(existing.accounts || {}) };

    accounts[uname] = {
      username: uname,
      userId: params.userId,
      email: params.email,
      token: params.token,
      connectSid: params.connectSid,
      lastUsed: new Date().toISOString(),
    };

    const updated: AuthConfig = {
      ...existing,
      token: params.token || existing.token,
      connectSid: params.connectSid || existing.connectSid,
      username: params.username || existing.username,
      userId: params.userId || existing.userId,
      email: params.email || existing.email,
      apiUrl: params.apiUrl || existing.apiUrl || 'https://replit.com/graphql',
      lastLogin: new Date().toISOString(),
      activeAccount: uname,
      accounts,
    };

    this.storage.save(updated);
  }

  public listAccounts(): AccountProfile[] {
    const config = this.storage.load();
    return Object.values(config.accounts || {});
  }

  public switchAccount(username: string): boolean {
    const config = this.storage.load();
    const target = config.accounts?.[username];
    if (!target) return false;

    config.activeAccount = username;
    config.username = target.username;
    config.userId = target.userId;
    config.email = target.email;
    config.token = target.token;
    config.connectSid = target.connectSid;

    this.storage.save(config);
    return true;
  }

  public removeAccount(username: string): boolean {
    const config = this.storage.load();
    if (config.accounts && config.accounts[username]) {
      delete config.accounts[username];
      if (config.activeAccount === username) {
        config.activeAccount = undefined;
        config.username = undefined;
        config.token = undefined;
        config.connectSid = undefined;
      }
      this.storage.save(config);
      return true;
    }
    return false;
  }

  public logout(): void {
    this.storage.clear();
  }

  public isAuthenticated(): boolean {
    const creds = this.resolveCredentials();
    return Boolean(creds.connectSid || creds.token || creds.authMethod === 'container');
  }
}

export const defaultAuthManager = new AuthManager();
