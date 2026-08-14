import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);
const cliPath = path.resolve(__dirname, '../dist/cli/index.js');

describe('CLI End-to-End Execution', () => {
  it('should display help when run with --help', async () => {
    const { stdout } = await execAsync(`node "${cliPath}" --help`);
    expect(stdout).toContain('Replit Terminal CLI');
    expect(stdout).toContain('login');
    expect(stdout).toContain('whoami');
    expect(stdout).toContain('shell');
    expect(stdout).toContain('exec');
  });

  it('should execute whoami with --json flag', async () => {
    const { stdout } = await execAsync(`node "${cliPath}" --mock whoami --json`);
    const parsed = JSON.parse(stdout);
    expect(parsed).toBeDefined();
    expect(parsed.authMethod).toBeDefined();
  });

  it('should list projects with --mock flag', async () => {
    const { stdout, stderr } = await execAsync(`node "${cliPath}" --mock ls`);
    const combined = stdout + stderr;
    expect(combined).toContain('Replit Projects');
    expect(combined).toContain('My Express API');
  });

  it('should create project with --mock flag', async () => {
    const { stdout, stderr } = await execAsync(`node "${cliPath}" --mock new "E2E Test Repl" --lang python3`);
    const combined = stdout + stderr;
    expect(combined).toContain('e2e-test-repl');
    expect(combined).toContain('python3');
  });

  it('should execute command in container via exec', async () => {
    const { stdout, stderr } = await execAsync(`node "${cliPath}" --mock exec current "echo 'E2E PTY Test Passed'"`);
    const combined = stdout + stderr;
    expect(combined).toContain('E2E PTY Test Passed');
  });

  it('should answer AI ask query', async () => {
    const { stdout } = await execAsync(`node "${cliPath}" ask "How to check project list?"`);
    expect(stdout).toContain('rsh AI Response');
  });

  it('should run AI agent goal execution', async () => {
    const { stdout, stderr } = await execAsync(`node "${cliPath}" agent "Build hello world utility"`);
    const combined = stdout + stderr;
    expect(combined).toContain('Starting autonomous AI agent');
    expect(combined).toContain('Agent workflow completed successfully');
  });
});
