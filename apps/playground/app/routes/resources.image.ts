import { imageLoader } from '@veraclins-dev/image/server';

import { type Route } from './+types/resources.image';

export const loader = async ({ request }: Route.LoaderArgs) => {
  return imageLoader(request, {
    cacheDir: '.cache/images',
    isDev: process.env.NODE_ENV === 'development',
  });
};
