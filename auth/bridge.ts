import * as http from 'http';
import { defaultAuthManager } from './manager.js';
import { defaultApiClient } from '../api/client.js';
import { UI } from '../cli/ui.js';
import chalk from 'chalk';

export interface BridgeSessionResult {
  success: boolean;
  username?: string;
  connectSid?: string;
  token?: string;
  message: string;
}

export class BrowserBridge {
  private port: number;

  constructor(port: number = 8484) {
    this.port = port;
  }

  public async startLoopbackBridge(): Promise<BridgeSessionResult> {
    return new Promise((resolve) => {
      const server = http.createServer(async (req, res) => {
        const url = new URL(req.url || '/', `http://127.0.0.1:${this.port}`);

        if (url.pathname === '/callback') {
          const sid = url.searchParams.get('sid') || url.searchParams.get('connect.sid');
          const token = url.searchParams.get('token');

          if (sid || token) {
            defaultAuthManager.saveLogin({
              connectSid: sid || undefined,
              token: token || undefined,
            });

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body style="font-family: system-ui, sans-serif; background: #0e1525; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                  <div style="text-align: center; padding: 2rem; background: #1c2333; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
                    <h2 style="color: #00d26a; margin-top: 0;">✔ Authentication Successful</h2>
                    <p style="color: #9da7b3;">rsh has securely captured your session. You can return to your terminal.</p>
                  </div>
                </body>
              </html>
            `);

            server.close();

            try {
              const user = await defaultApiClient.getCurrentUser();
              resolve({
                success: true,
                username: user?.username,
                connectSid: sid || undefined,
                token: token || undefined,
                message: `Authenticated as @${user?.username || 'user'}`,
              });
            } catch {
              resolve({
                success: true,
                connectSid: sid || undefined,
                token: token || undefined,
                message: 'Credentials saved securely in encrypted vault.',
              });
            }
            return;
          }
        }

        // Default landing instructions
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body style="font-family: system-ui, sans-serif; background: #0e1525; color: #fff; padding: 2rem;">
              <h2 style="color: #f26207;">rsh Browser Bridge</h2>
              <p>Paste your Replit connect.sid cookie below to complete CLI authentication:</p>
              <form action="/callback" method="GET">
                <input type="password" name="sid" placeholder="connect.sid cookie" style="width: 100%; max-width: 400px; padding: 10px; border-radius: 6px; border: 1px solid #2b3245; background: #1c2333; color: #fff;" required />
                <br/><br/>
                <button type="submit" style="background: #f26207; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">Authorize rsh</button>
              </form>
            </body>
          </html>
        `);
      });

      server.listen(this.port, '127.0.0.1', () => {
        UI.info(`Browser Session Bridge listening at ${chalk.bold.cyan(`http://127.0.0.1:${this.port}/`)}`);
      });

      server.on('error', (err) => {
        resolve({
          success: false,
          message: `Bridge server error: ${err.message}`,
        });
      });
    });
  }

  public async launchAutomatedCapture(): Promise<BridgeSessionResult> {
    const executablePath =
      process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
      process.env.CHROME_PATH ||
      '/usr/bin/chromium-browser';

    try {
      const { chromium } = await import('playwright-core');
      const browser = await chromium.launch({
        executablePath,
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const context = await browser.newContext();
      const page = await context.newPage();

      UI.info('Opening browser window to https://replit.com/login...');
      await page.goto('https://replit.com/login');

      // Wait for login redirection / cookies
      await page.waitForURL((url) => !url.toString().includes('/login'), { timeout: 60000 });

      const cookies = await context.cookies();
      const connectSid = cookies.find((c) => c.name === 'connect.sid')?.value;

      await browser.close();

      if (connectSid) {
        defaultAuthManager.saveLogin({ connectSid });
        return {
          success: true,
          connectSid,
          message: 'Captured live browser session cookie successfully.',
        };
      }

      return {
        success: false,
        message: 'No connect.sid cookie found after login.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Browser capture failed: ${err.message}`,
      };
    }
  }
}

export const defaultBrowserBridge = new BrowserBridge();
