import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export interface DbInfo {
  type: 'postgres' | 'sqlite' | 'none';
  url?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  sqlitePath?: string;
  status: 'connected' | 'available' | 'not_configured';
}

export class DbService {
  public detectDatabase(): DbInfo {
    const dbUrl = process.env.DATABASE_URL || process.env.PGDATABASE_URL || process.env.REPLIT_DB_URL;
    const pgHost = process.env.PGHOST || 'helium';
    const pgPort = process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432;
    const pgDatabase = process.env.PGDATABASE || 'helium';
    const pgUser = process.env.PGUSER || 'runner';

    // 1. PostgreSQL check
    if (dbUrl && dbUrl.startsWith('postgres')) {
      return {
        type: 'postgres',
        url: dbUrl,
        host: pgHost,
        port: pgPort,
        database: pgDatabase,
        user: pgUser,
        status: 'connected',
      };
    }

    if (process.env.REPLIT_HELIUM_ENABLED === 'true' || process.env.PGHOST) {
      return {
        type: 'postgres',
        url: `postgresql://${pgUser}@${pgHost}:${pgPort}/${pgDatabase}`,
        host: pgHost,
        port: pgPort,
        database: pgDatabase,
        user: pgUser,
        status: 'available',
      };
    }

    // 2. SQLite check in workspace
    const sqliteCandidates = ['database.sqlite', 'sqlite.db', 'dev.db', 'local.db'];
    for (const cand of sqliteCandidates) {
      const p = path.join(process.cwd(), cand);
      if (fs.existsSync(p)) {
        return {
          type: 'sqlite',
          sqlitePath: p,
          status: 'connected',
        };
      }
    }

    return {
      type: 'none',
      status: 'not_configured',
    };
  }

  public async runQuery(sql: string): Promise<string> {
    const db = this.detectDatabase();
    if (db.type === 'postgres') {
      const psqlCmd = db.url
        ? `psql "${db.url}" -c "${sql.replace(/"/g, '\\"')}"`
        : `psql -h ${db.host} -p ${db.port} -U ${db.user} -d ${db.database} -c "${sql.replace(/"/g, '\\"')}"`;
      try {
        const { stdout, stderr } = await execAsync(psqlCmd);
        return stdout || stderr;
      } catch (err: any) {
        return `SQL Error: ${err.message}`;
      }
    } else if (db.type === 'sqlite' && db.sqlitePath) {
      try {
        const { stdout, stderr } = await execAsync(`sqlite3 "${db.sqlitePath}" "${sql.replace(/"/g, '\\"')}"`);
        return stdout || stderr;
      } catch (err: any) {
        return `SQL Error: ${err.message}`;
      }
    }

    return 'No active PostgreSQL or SQLite database detected.';
  }
}

export const defaultDbService = new DbService();
