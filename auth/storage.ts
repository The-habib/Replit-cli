import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import { AuthConfig, AuthConfigSchema } from './types.js';
import { defaultPlatformDetector } from '../core/platform.js';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT = 'replit-shell-rsh-salt-v1';

export class AuthStorage {
  private configDir: string;
  private configFile: string;
  private memoryConfig: AuthConfig | null = null;
  private useMemoryOnly: boolean = false;

  constructor(customDir?: string) {
    this.configDir = customDir || defaultPlatformDetector.getPlatformInfo().configDir;
    this.configFile = path.join(this.configDir, 'config.json');
  }

  public setMemoryOnly(enabled: boolean): void {
    this.useMemoryOnly = enabled;
  }

  public getConfigPath(): string {
    return this.configFile;
  }

  private deriveKey(): Buffer {
    const machineIdentifier = `${os.hostname()}-${os.userInfo().username}-${SALT}`;
    return crypto.scryptSync(machineIdentifier, SALT, 32);
  }

  public encrypt(plainText: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = this.deriveKey();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${tag}:${encrypted}`;
  }

  public decrypt(cipherPayload: string): string {
    try {
      const parts = cipherPayload.split(':');
      if (parts.length !== 3) {
        return cipherPayload;
      }
      const [ivHex, tagHex, encryptedHex] = parts;
      const iv = Buffer.from(ivHex, 'hex');
      const tag = Buffer.from(tagHex, 'hex');
      const key = this.deriveKey();
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(tag);
      let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch {
      return cipherPayload;
    }
  }

  public load(): AuthConfig {
    if (this.useMemoryOnly && this.memoryConfig) {
      return this.memoryConfig;
    }

    const envToken = process.env.REPLIT_TOKEN || process.env.REPLIT_API_KEY;
    const envSid = process.env.REPLIT_CONNECT_SID;
    const envApiUrl = process.env.REPLIT_API_URL || 'https://replit.com/graphql';

    if (!fs.existsSync(this.configFile)) {
      const initial: AuthConfig = {
        token: envToken,
        connectSid: envSid,
        apiUrl: envApiUrl,
        accounts: {},
      };
      return initial;
    }

    try {
      const raw = fs.readFileSync(this.configFile, 'utf8');
      const parsed = JSON.parse(raw);

      if (parsed.connectSid && parsed.connectSid.includes(':')) {
        parsed.connectSid = this.decrypt(parsed.connectSid);
      }
      if (parsed.token && parsed.token.includes(':')) {
        parsed.token = this.decrypt(parsed.token);
      }

      const validated = AuthConfigSchema.parse(parsed);

      if (envToken) validated.token = envToken;
      if (envSid) validated.connectSid = envSid;
      if (envApiUrl) validated.apiUrl = envApiUrl;

      return validated;
    } catch {
      return {
        token: envToken,
        connectSid: envSid,
        apiUrl: envApiUrl,
        accounts: {},
      };
    }
  }

  public save(config: AuthConfig): void {
    if (this.useMemoryOnly) {
      this.memoryConfig = { ...config };
      return;
    }

    const validated = AuthConfigSchema.parse(config);

    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true, mode: 0o700 });
    }

    const toStore = { ...validated };
    if (toStore.connectSid) {
      toStore.connectSid = this.encrypt(toStore.connectSid);
    }
    if (toStore.token) {
      toStore.token = this.encrypt(toStore.token);
    }

    fs.writeFileSync(this.configFile, JSON.stringify(toStore, null, 2), {
      encoding: 'utf8',
      mode: 0o600,
    });
  }

  public clear(): void {
    this.memoryConfig = null;
    if (fs.existsSync(this.configFile)) {
      fs.unlinkSync(this.configFile);
    }
  }
}

export const defaultStorage = new AuthStorage();
