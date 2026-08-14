import * as fs from 'fs';
import * as path from 'path';

export interface SecretEntry {
  key: string;
  value: string;
  source: 'env' | 'dotenv' | 'replit';
}

export class SecretsService {
  private envFilePath: string;

  constructor(envFilePath?: string) {
    this.envFilePath = envFilePath || path.join(process.cwd(), '.env');
  }

  public listSecrets(): SecretEntry[] {
    const secrets: SecretEntry[] = [];
    const seen = new Set<string>();

    // 1. Check local .env file
    if (fs.existsSync(this.envFilePath)) {
      try {
        const content = fs.readFileSync(this.envFilePath, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const [key, ...rest] = trimmed.split('=');
            const cleanKey = key.trim();
            if (cleanKey && !seen.has(cleanKey)) {
              secrets.push({
                key: cleanKey,
                value: rest.join('=').trim(),
                source: 'dotenv',
              });
              seen.add(cleanKey);
            }
          }
        }
      } catch {}
    }

    // 2. Check process.env for common keys
    const envKeys = Object.keys(process.env).filter(
      (k) =>
        k.includes('KEY') ||
        k.includes('SECRET') ||
        k.includes('TOKEN') ||
        k.includes('DATABASE_URL') ||
        k.startsWith('REPLIT_')
    );

    for (const key of envKeys) {
      if (!seen.has(key)) {
        secrets.push({
          key,
          value: process.env[key] || '',
          source: key.startsWith('REPLIT_') ? 'replit' : 'env',
        });
        seen.add(key);
      }
    }

    return secrets;
  }

  public setSecret(key: string, value: string): void {
    let lines: string[] = [];
    if (fs.existsSync(this.envFilePath)) {
      lines = fs.readFileSync(this.envFilePath, 'utf8').split('\n');
    }

    let found = false;
    const newLines = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k] = trimmed.split('=');
        if (k.trim() === key) {
          found = true;
          return `${key}=${value}`;
        }
      }
      return line;
    });

    if (!found) {
      newLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(this.envFilePath, newLines.join('\n').trim() + '\n', { mode: 0o600 });
    process.env[key] = value;
  }

  public removeSecret(key: string): boolean {
    if (!fs.existsSync(this.envFilePath)) {
      return false;
    }

    const lines = fs.readFileSync(this.envFilePath, 'utf8').split('\n');
    const filtered = lines.filter((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k] = trimmed.split('=');
        return k.trim() !== key;
      }
      return true;
    });

    fs.writeFileSync(this.envFilePath, filtered.join('\n').trim() + '\n', { mode: 0o600 });
    delete process.env[key];
    return true;
  }

  public maskSecret(val: string): string {
    if (!val || val.length <= 4) return '••••';
    return val.slice(0, 3) + '••••' + val.slice(-2);
  }
}

export const defaultSecretsService = new SecretsService();
