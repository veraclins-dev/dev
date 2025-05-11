import { type Config } from '@react-router/dev/config';

const MODE = process.env.NODE_ENV;

export default {
  // Defaults to true. Set to false to enable SPA for all routes.
  ssr: true,

  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
