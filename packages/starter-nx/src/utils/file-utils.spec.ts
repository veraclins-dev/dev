import { describe, expect, test } from 'vitest';

import { getBundledTemplatePathFromDir } from './file-utils.js';

describe('getBundledTemplatePathFromDir', () => {
  test('resolves package root from dist src/utils path', () => {
    const currentDir = '/repo/dist/packages/starter-nx/src/utils';
    const result = getBundledTemplatePathFromDir(currentDir);

    expect(result).toBe('/repo/dist/packages/starter-nx/templates');
  });
});
