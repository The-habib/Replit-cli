import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { defaultPlatformDetector } from './platform.js';

export const UserPreferencesSchema = z.object({
  editor: z.string().default('nano'),
  defaultRepl: z.string().optional(),
  autoSync: z.boolean().default(false),
  colorMode: z.enum(['auto', 'always', 'never']).default('auto'),
  telemetry: z.boolean().default(false),
  checkUpdates: z.boolean().default(true),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export class ConfigService {
  private configPath: string;

  constructor(customPath?: string) {
    const configDir = defaultPlatformDetector.getPlatformInfo().configDir;
    this.configPath = customPath || path.join(configDir, 'preferences.json');
  }

  public getPreferences(): UserPreferences {
    if (!fs.existsSync(this.configPath)) {
      return UserPreferencesSchema.parse({});
    }

    try {
      const raw = fs.readFileSync(this.configPath, 'utf8');
      return UserPreferencesSchema.parse(JSON.parse(raw));
    } catch {
      return UserPreferencesSchema.parse({});
    }
  }

  public get<K extends keyof UserPreferences>(key: K): UserPreferences[K] {
    const prefs = this.getPreferences();
    return prefs[key];
  }

  public set<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): void {
    const prefs = this.getPreferences();
    prefs[key] = value;

    const dir = path.dirname(this.configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    }

    fs.writeFileSync(this.configPath, JSON.stringify(prefs, null, 2), { mode: 0o600 });
  }

  public getAll(): Record<string, any> {
    return this.getPreferences();
  }
}

export const defaultConfigService = new ConfigService();
