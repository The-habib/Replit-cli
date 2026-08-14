import * as fs from 'fs';
import * as path from 'path';
import { ReplitApiClient, defaultApiClient } from '../api/client.js';
import { SyncResult } from './types.js';

export class SyncService {
  private apiClient: ReplitApiClient;

  constructor(apiClient?: ReplitApiClient) {
    this.apiClient = apiClient || defaultApiClient;
  }

  public async clone(identifier: string, targetDir?: string): Promise<{ dir: string; title: string }> {
    const repl = await this.apiClient.getRepl(identifier);
    const folderName = targetDir || repl?.slug || identifier.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullPath = path.resolve(process.cwd(), folderName);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    // Write initial project metadata & files
    const replMeta = {
      id: repl?.id || `repl-${Date.now()}`,
      title: repl?.title || identifier,
      slug: repl?.slug || folderName,
      url: repl?.url || `https://replit.com/@user/${folderName}`,
      language: repl?.language || 'nodejs',
    };

    fs.writeFileSync(
      path.join(fullPath, '.replit.json'),
      JSON.stringify(replMeta, null, 2)
    );

    // Initial starter files if empty
    const mainFile = path.join(fullPath, repl?.language === 'python3' ? 'main.py' : 'index.js');
    if (!fs.existsSync(mainFile)) {
      const initialCode = repl?.language === 'python3'
        ? `# ${replMeta.title}\n\ndef main():\n    print("Hello from ${replMeta.title} via rsh!")\n\nif __name__ == "__main__":\n    main()\n`
        : `// ${replMeta.title}\nconsole.log("Hello from ${replMeta.title} via rsh!");\n`;
      fs.writeFileSync(mainFile, initialCode);
    }

    return {
      dir: fullPath,
      title: replMeta.title,
    };
  }

  public async pull(identifier?: string, localDir: string = process.cwd()): Promise<SyncResult> {
    const repl = identifier ? await this.apiClient.getRepl(identifier) : null;
    const files: SyncResult = {
      added: [],
      updated: [],
      deleted: [],
      totalFiles: 0,
    };

    // Check if .replit.json exists
    const metaPath = path.join(localDir, '.replit.json');
    if (!fs.existsSync(metaPath)) {
      const meta = {
        id: repl?.id || 'current-workspace',
        title: repl?.title || 'Workspace',
        slug: repl?.slug || 'workspace',
        syncedAt: new Date().toISOString(),
      };
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      files.added.push('.replit.json');
    } else {
      files.updated.push('.replit.json');
    }

    files.totalFiles = files.added.length + files.updated.length;
    return files;
  }

  public async push(identifier?: string, localDir: string = process.cwd()): Promise<SyncResult> {
    const files: SyncResult = {
      added: [],
      updated: [],
      deleted: [],
      totalFiles: 0,
    };

    const scanDir = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      let results: string[] = [];
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.cache') {
          continue;
        }
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(scanDir(res));
        } else {
          results.push(res);
        }
      }
      return results;
    };

    const scanned = scanDir(localDir);
    for (const file of scanned) {
      const relative = path.relative(localDir, file);
      files.updated.push(relative);
    }

    files.totalFiles = files.updated.length;
    return files;
  }
}

export const defaultSyncService = new SyncService();
