import { pipeHeaders } from '@veraclins-dev/react-utils/server';
import { data } from 'react-router';
import { search, SearchSchema } from '../../utils/search/search.server';
import { type Route } from './+types/_index';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || url.searchParams.get('search');
  const resource = url.searchParams.get('resource') || undefined;
  const skip = url.searchParams.get('skip');
  const take = url.searchParams.get('take');

  if (!query) {
    return data({}, { headers: { 'Cache-Control': 'max-age=60' } });
  }

  const validation = SearchSchema.safeParse({
    search: query,
    resource,
    skip,
    take,
  });

  if (!validation.success) {
    return data(
      { error: 'Invalid search parameters' },
      { status: 400, headers: { 'Cache-Control': 'max-age=60' } },
    );
  }

  const results = await search(validation.data.search, resource, {
    skip: validation.data.skip,
    take: validation.data.take,
  });

  return data(results, { headers: { 'Cache-Control': 'max-age=60' } });
};

export const headers: Route.HeadersFunction = pipeHeaders;
