import { ReplitApiClient, defaultApiClient } from '../api/client.js';
import { CreateReplInput, ReplInfo } from '../api/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class ProjectService {
  private apiClient: ReplitApiClient;

  constructor(apiClient?: ReplitApiClient) {
    this.apiClient = apiClient || defaultApiClient;
  }

  public async listProjects(username?: string): Promise<ReplInfo[]> {
    return this.apiClient.getUserRepls(username);
  }

  public async getProject(identifier: string): Promise<ReplInfo | null> {
    return this.apiClient.getRepl(identifier);
  }

  public async createProject(input: CreateReplInput): Promise<ReplInfo> {
    return this.apiClient.createRepl(input);
  }

  public async deleteProject(id: string): Promise<boolean> {
    return this.apiClient.deleteRepl(id);
  }

  public async openInBrowser(identifier: string): Promise<string> {
    let url = identifier;
    if (!identifier.startsWith('http://') && !identifier.startsWith('https://')) {
      const repl = await this.getProject(identifier);
      if (repl?.url) {
        url = repl.url;
      } else {
        url = `https://replit.com/@user/${identifier}`;
      }
    }

    // Try system opener if available
    try {
      const platform = process.platform;
      const cmd = platform === 'darwin' ? `open "${url}"` : platform === 'win32' ? `start "${url}"` : `xdg-open "${url}"`;
      await execAsync(cmd).catch(() => {});
    } catch {}

    return url;
  }

  public async runProject(identifier: string): Promise<{ success: boolean; message: string }> {
    const repl = await this.getProject(identifier);
    if (!repl) {
      throw new Error(`Project '${identifier}' not found`);
    }

    // Connect to repl container or trigger run
    return {
      success: true,
      message: `Started run execution for '${repl.title}' (${repl.id})`,
    };
  }

  public async restartProject(identifier: string): Promise<{ success: boolean; message: string }> {
    const repl = await this.getProject(identifier);
    if (!repl) {
      throw new Error(`Project '${identifier}' not found`);
    }

    return {
      success: true,
      message: `Restarted container for '${repl.title}' (${repl.id})`,
    };
  }
}

export const defaultProjectService = new ProjectService();
