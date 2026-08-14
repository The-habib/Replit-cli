import { describe, it, expect } from 'vitest';
import { withRetry } from '../core/retry.js';

describe('Retry Engine', () => {
  it('should resolve immediately if operation succeeds', async () => {
    const res = await withRetry(async () => 'success', { maxRetries: 3 });
    expect(res).toBe('success');
  });

  it('should retry failed operations up to maxRetries', async () => {
    let attempts = 0;
    const res = await withRetry(
      async () => {
        attempts++;
        if (attempts < 3) throw new Error('Temporary failure');
        return 'recovered';
      },
      { maxRetries: 3, baseDelayMs: 10 }
    );

    expect(res).toBe('recovered');
    expect(attempts).toBe(3);
  });
});
