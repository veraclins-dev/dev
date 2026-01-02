# Search Feature Module

Flexible search system that allows registering custom search handlers for different resource types.

## Features

- **Generic Search Interface**: Register search handlers for any resource type
- **Built-in User Search**: Pre-configured user search handler
- **Extensible**: Easy to add custom search handlers
- **Caching**: Search results are cached for 60 seconds
- **Pagination**: Support for skip/take parameters
- **Resource Filtering**: Search specific resource types or all resources

## Usage

### Basic Search

```typescript
import { search } from '#app/utils/search/search.server';

// Search all resources
const results = await search('query');

// Search specific resource
const userResults = await search('query', 'users');
```

### Register Custom Search Handler

```typescript
import { registerSearchHandler } from '#app/utils/search/search.server';
import { db } from '#app/utils/db/db.server';

registerSearchHandler({
  resource: 'posts',
  handler: async (query, options) => {
    const where = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    };

    const [items, count] = await Promise.all([
      db.post.findMany({
        where,
        take: options?.take ?? 50,
        skip: options?.skip,
        orderBy: { createdAt: 'desc' },
      }),
      db.post.count({ where }),
    ]);

    return {
      items,
      count,
      resource: 'posts',
    };
  },
  minLength: 3,
  maxResults: 50,
});
```

### Search Route

The search route is available at `/search` and accepts the following query parameters:

- `q` or `search`: The search query (required)
- `resource`: Resource type to search (optional, searches all if not provided)
- `skip`: Number of results to skip (optional)
- `take`: Number of results to return (optional, max 100)

Example:
```
/search?q=john&resource=users&take=20
```

### Search Input Component

```tsx
import { SearchInput } from '#app/components/search/search-input';

<SearchInput
  placeholder="Search users..."
  resource="users"
  onSearch={(query) => {
    // Handle search
  }}
/>
```

### Search Results Component

```tsx
import { SearchResults } from '#app/components/search/search-results';

<SearchResults
  results={searchResults}
  query="john"
  resource="users"
/>
```

## Built-in Handlers

### User Search

The `users` resource is pre-registered and searches:
- User name
- Username
- Email

## Dependencies

- Base template (User model, database utilities)
- UI components (TextField, Box, Typography)

## Feature Flag

Enable with: `features.search = true`

## Notes

- Minimum search query length is 3 characters by default (configurable per handler)
- Search results are cached for 60 seconds
- Maximum results per resource is 50 by default (configurable per handler)
- Handlers can define custom filters via the `options.filters` parameter
- Search is case-insensitive by default

## Extending Search

To add search for a new resource type:

1. Create a search handler function
2. Register it with `registerSearchHandler`
3. The handler will automatically be available in search results

Example for a custom "products" resource:

```typescript
import { registerSearchHandler } from '#app/utils/search/search.server';
import { db } from '#app/utils/db/db.server';

registerSearchHandler({
  resource: 'products',
  handler: async (query, options) => {
    const where = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
      // Add custom filters
      ...(options?.filters?.category && {
        category: options.filters.category,
      }),
    };

    const [items, count] = await Promise.all([
      db.product.findMany({
        where,
        take: options?.take ?? 50,
        skip: options?.skip,
        orderBy: { createdAt: 'desc' },
      }),
      db.product.count({ where }),
    ]);

    return {
      items,
      count,
      resource: 'products',
    };
  },
  minLength: 2,
  maxResults: 100,
});
```
