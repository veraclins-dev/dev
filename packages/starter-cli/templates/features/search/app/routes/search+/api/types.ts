import { type search } from '#app/utils/search/search.server';
import { type SearchResults } from '#app/utils/search/types';

export type SearchResponse = Awaited<ReturnType<typeof search>>;
export type { SearchResults };
