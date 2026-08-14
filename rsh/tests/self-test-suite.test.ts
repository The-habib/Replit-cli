import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

const execAsync = promisify(exec);
const cliPath = path.resolve(__dirname, '../dist/cli/index.js');

describe('Exhaustive Autonomous Self-Testing Suite', () => {
  it('1. rsh whoami & whoami --json', async () => {
    const res1 = await execAsync(`node "${cliPath}" whoami`);
    expect(res1.stdout).toContain('User:');

    const res2 = await execAsync(`node "${cliPath}" whoami --json`);
    const parsed = JSON.parse(res2.stdout);
    expect(parsed.user).toBeDefined();
    expect(parsed.authMethod).toBeDefined();
  });

  it('2. rsh doctor', async () => {
    const res = await execAsync(`node "${cliPath}" doctor`);
    expect(res.stdout).toContain('rsh System Diagnostics');
    expect(res.stdout).toContain('Environment:');
    expect(res.stdout).toContain('Runtime:');
    expect(res.stdout).toContain('Authentication:');
    expect(res.stdout).toContain('Database Connectors:');
  });

  it('3. rsh update', async () => {
    const res = await execAsync(`node "${cliPath}" update`);
    expect(res.stdout).toContain('Current Version:');
    expect(res.stdout).toContain('Latest Version:');
  });

  it('4. rsh ls & rsh ls --json', async () => {
    const res1 = await execAsync(`node "${cliPath}" --mock ls`);
    expect(res1.stdout + res1.stderr).toContain('Replit Projects');

    const res2 = await execAsync(`node "${cliPath}" --mock ls --json`);
    const parsed = JSON.parse(res2.stdout);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThanOrEqual(1);
  });

  it('5. rsh new, duplicate, rename & delete', async () => {
    // New
    const resNew = await execAsync(`node "${cliPath}" --mock new "Self Test Microservice" --lang python3`);
    expect(resNew.stdout + resNew.stderr).toContain('self-test-microservice');

    // Duplicate
    const resDup = await execAsync(`node "${cliPath}" --mock duplicate "self-test-microservice" "Self Test Duplicate"`);
    expect(resDup.stdout + resDup.stderr).toContain('self-test-duplicate');

    // Rename
    const resRename = await execAsync(`node "${cliPath}" --mock rename "self-test-microservice" "Renamed Microservice"`);
    expect(resRename.stdout + resRename.stderr).toContain('Renamed Microservice');

    // Delete
    const resDel = await execAsync(`node "${cliPath}" --mock delete "self-test-duplicate" --yes`);
    expect(resDel.stdout + resDel.stderr).toContain('Deleted Repl');
  });

  it('6. rsh clone, pull, push', async () => {
    const cloneDir = path.join(os.tmpdir(), `rsh-clone-test-${Date.now()}`);
    const resClone = await execAsync(`node "${cliPath}" clone "self-test-microservice" "${cloneDir}"`);
    expect(resClone.stdout + resClone.stderr).toContain('Cloned');

    const resPull = await execAsync(`cd "${cloneDir}" && node "${cliPath}" pull`);
    expect(resPull.stdout + resPull.stderr).toContain('Synchronized');

    const resPush = await execAsync(`cd "${cloneDir}" && node "${cliPath}" push`);
    expect(resPush.stdout + resPush.stderr).toContain('Pushed');
  });

  it('7. rsh exec', async () => {
    const res = await execAsync(`node "${cliPath}" exec current "echo 'EXEC_OK_VERIFIED'"`);
    expect(res.stdout).toContain('EXEC_OK_VERIFIED');
  });

  it('8. rsh run & rsh restart', async () => {
    const resRun = await execAsync(`node "${cliPath}" --mock run "self-test-microservice"`);
    expect(resRun.stdout + resRun.stderr).toContain('Started run execution');

    const resRestart = await execAsync(`node "${cliPath}" --mock restart "self-test-microservice"`);
    expect(resRestart.stdout + resRestart.stderr).toContain('Restarted container');
  });

  it('9. rsh deploy status & deploy logs', async () => {
    const resStatus = await execAsync(`node "${cliPath}" deploy status "workspace"`);
    expect(resStatus.stdout + resStatus.stderr).toContain('Deployment Status:');

    const resLogs = await execAsync(`node "${cliPath}" deploy logs "workspace"`);
    expect(resLogs.stdout + resLogs.stderr).toContain('Streaming production logs');
  });

  it('10. rsh logs', async () => {
    const res = await execAsync(`node "${cliPath}" logs "workspace"`);
    expect(res.stdout + res.stderr).toContain('Streaming container execution logs');
  });

  it('11. rsh secrets set, ls, ls --show-values, rm', async () => {
    await execAsync(`node "${cliPath}" secrets set TEST_KEY_1 "val_abc_123"`);

    const resLs = await execAsync(`node "${cliPath}" secrets ls`);
    expect(resLs.stdout).toContain('TEST_KEY_1');
    expect(resLs.stdout).toContain('••••');

    const resShow = await execAsync(`node "${cliPath}" secrets ls --show-values`);
    expect(resShow.stdout).toContain('val_abc_123');

    const resRm = await execAsync(`node "${cliPath}" secrets rm TEST_KEY_1`);
    expect(resRm.stdout).toContain('removed');
  });

  it('12. rsh db info & query', async () => {
    const resInfo = await execAsync(`node "${cliPath}" db info`);
    expect(resInfo.stdout).toContain('Database Information:');

    const resQuery = await execAsync(`node "${cliPath}" db query "SELECT 12345 AS test_num;"`);
    expect(resQuery.stdout).toContain('12345');
  });

  it('13. rsh env & env --all', async () => {
    const resEnv = await execAsync(`node "${cliPath}" env`);
    expect(resEnv.stdout).toContain('Environment Variables');

    const resAll = await execAsync(`node "${cliPath}" env --all`);
    expect(resAll.stdout).toContain('PATH');
  });

  it('14. rsh config ls, set, get', async () => {
    await execAsync(`node "${cliPath}" config set editor nano`);
    const resGet = await execAsync(`node "${cliPath}" config get editor`);
    expect(resGet.stdout).toContain('editor = nano');

    const resLs = await execAsync(`node "${cliPath}" config ls`);
    expect(resLs.stdout).toContain('editor');
  });

  it('15. rsh completions', async () => {
    const resBash = await execAsync(`node "${cliPath}" completions bash`);
    expect(resBash.stdout).toContain('_rsh_completions');

    const resZsh = await execAsync(`node "${cliPath}" completions zsh`);
    expect(resZsh.stdout).toContain('#compdef rsh');

    const resFish = await execAsync(`node "${cliPath}" completions fish`);
    expect(resFish.stdout).toContain('complete -c rsh');
  });

  it('16. rsh ask & agent', async () => {
    const resAsk = await execAsync(`node "${cliPath}" ask "How to deploy?"`);
    expect(resAsk.stdout).toContain('rsh AI Response');

    const resAgent = await execAsync(`node "${cliPath}" agent "Build health utility"`);
    expect(resAgent.stdout + resAgent.stderr).toContain('Agent workflow completed successfully');
  });

  it('17. rsh accounts & switch', async () => {
    const res = await execAsync(`node "${cliPath}" accounts ls`);
    expect(res.stdout).toMatch(/(Accounts|accounts stored)/i);
  });

  it('18. Typo suggestions', async () => {
    try {
      await execAsync(`node "${cliPath}" deploi`);
    } catch (err: any) {
      expect(err.message).toContain('Did you mean:');
      expect(err.message).toContain('deploy');
    }
  });

  it('19. Global flags: --monochrome and --debug', async () => {
    const resMono = await execAsync(`node "${cliPath}" --monochrome doctor`);
    expect(resMono.stdout).toContain('rsh System Diagnostics');

    const resDebug = await execAsync(`node "${cliPath}" --debug whoami`);
    expect(resDebug.stdout).toContain('User:');
  });
});
