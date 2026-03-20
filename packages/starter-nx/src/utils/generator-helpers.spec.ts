import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';

import { addPostInstallTasks } from './generator-helpers.js';

vi.mock('node:child_process', () => ({
  execSync: vi.fn(),
}));

vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs');
  return {
    ...actual,
    existsSync: vi.fn(),
  };
});

describe('addPostInstallTasks', () => {
  it('skips prisma generation when prisma CLI binary is unavailable', async () => {
    vi.mocked(existsSync).mockImplementation((path) => {
      const value = String(path);
      if (value.endsWith('prisma/schema.prisma')) return true;
      if (value.endsWith('node_modules/.bin/prisma')) return false;
      return false;
    });

    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    const tasks = await addPostInstallTasks({} as never, 'apps/demo', {
      database: 'sqlite',
      deploymentTarget: 'none',
      description: '',
      emailProvider: 'none',
      features: [],
      monitoringProvider: 'none',
      projectName: 'demo',
      storageProvider: 'local',
    });

    expect(tasks).toHaveLength(1);
    tasks[0]();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Skipping Prisma client generation'),
    );
    expect(execSync).not.toHaveBeenCalled();
  });

  it('handles missing prisma/config module error gracefully', async () => {
    vi.mocked(existsSync).mockImplementation((path) => {
      const value = String(path);
      if (value.endsWith('prisma/schema.prisma')) return true;
      if (value.endsWith('node_modules/.bin/prisma')) return true;
      return false;
    });
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error("Cannot find module 'prisma/config'");
    });

    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    const tasks = await addPostInstallTasks({} as never, 'apps/demo', {
      database: 'sqlite',
      deploymentTarget: 'none',
      description: '',
      emailProvider: 'none',
      features: [],
      monitoringProvider: 'none',
      projectName: 'demo',
      storageProvider: 'local',
    });

    tasks[0]();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("required Prisma runtime module 'prisma/config'"),
    );
  });
});
