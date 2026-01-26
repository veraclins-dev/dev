import type { Tree } from '@nx/devkit';
import {
  addProjectConfiguration,
  joinPathFragments,
  type ProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedSchema } from '../schema.js';

/**
 * Add project configuration to the Nx workspace
 */
export function addProject(tree: Tree, options: NormalizedSchema): void {
  const project: ProjectConfiguration = {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(options.projectRoot, 'app'),
    tags: [],
    targets: {
      build: {
        executor: '@nx/vite:build',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: joinPathFragments('dist', options.projectRoot),
        },
      },
      serve: {
        executor: '@nx/vite:dev-server',
        options: {},
      },
      test: {
        executor: '@nx/vitest:vitest',
        outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
        options: {
          passWithNoTests: true,
        },
      },
      lint: {
        executor: '@nx/eslint:lint',
        outputs: ['{options.outputFile}'],
      },
    },
  };

  addProjectConfiguration(tree, options.projectName, project);
}
