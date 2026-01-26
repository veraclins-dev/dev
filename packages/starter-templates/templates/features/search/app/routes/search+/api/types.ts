import { type search } from '../../../utils/search/search.server';
import { type SearchResults } from '../../../utils/search/types';

export type SearchResponse = Awaited<ReturnType<typeof search>>;
export type { SearchResults };
