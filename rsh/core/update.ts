import * as https from 'https';

export interface VersionCheckResult {
  currentVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
  publishedDate?: string;
}

export class UpdateChecker {
  private currentVersion: string = '1.0.0';
  private packageName: string = 'rsh';

  public async checkForUpdate(): Promise<VersionCheckResult> {
    return new Promise((resolve) => {
      const req = https.get(
        `https://registry.npmjs.org/${this.packageName}/latest`,
        {
          headers: { 'User-Agent': `rsh/${this.currentVersion}` },
          timeout: 3000,
        },
        (res) => {
          if (res.statusCode !== 200) {
            resolve({
              currentVersion: this.currentVersion,
              latestVersion: this.currentVersion,
              hasUpdate: false,
            });
            return;
          }

          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              const latest = json.version || this.currentVersion;
              resolve({
                currentVersion: this.currentVersion,
                latestVersion: latest,
                hasUpdate: latest !== this.currentVersion,
                publishedDate: json.time?.[latest],
              });
            } catch {
              resolve({
                currentVersion: this.currentVersion,
                latestVersion: this.currentVersion,
                hasUpdate: false,
              });
            }
          });
        }
      );

      req.on('error', () => {
        resolve({
          currentVersion: this.currentVersion,
          latestVersion: this.currentVersion,
          hasUpdate: false,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          currentVersion: this.currentVersion,
          latestVersion: this.currentVersion,
          hasUpdate: false,
        });
      });
    });
  }
}

export const defaultUpdateChecker = new UpdateChecker();
