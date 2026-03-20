import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateProject } from '../generator.js';
import type { TemplateConfig } from '../types.js';

vi.mock('execa', () => ({
  execa: vi.fn(async (command: string) => {
    if (command === 'git') {
      return { exitCode: 1 };
    }
    return { exitCode: 0 };
  }),
}));

vi.mock('ora', () => ({
  default: () => ({
    start: () => ({
      text: '',
      fail: vi.fn(),
      succeed: vi.fn(),
    }),
  }),
}));

const baseConfig: TemplateConfig = {
  authProviders: [],
  database: 'sqlite',
  deploymentTarget: 'none',
  description: 'Test app',
  emailProvider: 'none',
  features: [],
  packageManager: 'npm',
  projectName: 'test-app',
  skipInstall: true,
  storageProvider: 'local',
};

describe('starter-cli generateProject flows', () => {
  let workDir = '';
  let initialCwd = '';

  beforeEach(async () => {
    initialCwd = process.cwd();
    workDir = await mkdtemp(join(tmpdir(), 'starter-cli-test-'));
    process.chdir(workDir);
  });

  afterEach(async () => {
    process.chdir(initialCwd);
    if (workDir) {
      await rm(workDir, { force: true, recursive: true });
    }
    vi.restoreAllMocks();
  });

  it('creates a sqlite project with local providers and no install', async () => {
    await generateProject(baseConfig);

    const envContent = await readFile(join(workDir, 'test-app/.env'), 'utf-8');
    expect(envContent).toContain('DATABASE_URL=file:./dev.db');
    expect(envContent).not.toContain('RESEND_API_KEY');
    expect(envContent).not.toContain('SENDGRID_API_KEY');
  });

  it('includes selected feature files and provider env variables', async () => {
    await generateProject({
      ...baseConfig,
      emailProvider: 'resend',
      features: ['notifications'],
      projectName: 'feature-app',
      storageProvider: 'firebase',
    });

    const envContent = await readFile(
      join(workDir, 'feature-app/.env'),
      'utf-8',
    );
    expect(envContent).toContain('RESEND_API_KEY=');
    expect(envContent).toContain('FIREBASE_PROJECT_ID=');
    expect(envContent).not.toContain('AWS_ACCESS_KEY_ID=');

    const prismaContent = await readFile(
      join(workDir, 'feature-app/prisma/schema.prisma'),
      'utf-8',
    );
    expect(prismaContent).toContain('model Notification');
  });

  it('fails when target directory already exists', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as never);

    await generateProject(baseConfig);
    await expect(generateProject(baseConfig)).rejects.toThrow(
      'process.exit called',
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
