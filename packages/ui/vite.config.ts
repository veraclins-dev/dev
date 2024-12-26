/// <reference types='vitest' />
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  plugins: [
    react(),
    iconsSpritesheet({
      withTypes: true,
      inputDir: 'svg-icons',
      outputDir: 'src/lib/icons',
      typesOutputFile: 'src/lib/icons/name.ts',
      cwd: process.cwd(),
      iconNameTransformer: (iconName) => iconName,
      formatter: 'prettier',
      pathToFormatterConfig: '../../.prettierrc',
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    libAssetsPlugin({
      include: ['src/lib/icons/**.svg'],
      name: 'sprite.svg',
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/packages/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'ui',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@veraclins-dev/utils',
      ],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/ui',
      provider: 'v8',
    },
  },
});
