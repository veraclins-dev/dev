import { Box, Typography } from '@veraclins-dev/ui';
import { type SearchResults } from '../../utils/search/types';

interface SearchResultsProps {
  results: SearchResults;
  query: string;
  resource?: string;
  className?: string;
}

export function SearchResults({
  results,
  query,
  resource,
  className,
}: SearchResultsProps) {
  const hasResults = Object.values(results).some((result) => result.count > 0);

  if (!hasResults) {
    return (
      <Box className={className}>
        <Typography variant="h6">No results found</Typography>
        <Typography className="text-foreground/80">
          Try adjusting your search query
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={4} className={className}>
      {Object.entries(results).map(([resourceType, result]) => {
        if (result.count === 0) return null;

        return (
          <Box key={resourceType} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5">
              {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} (
              {result.count})
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {result.items.map((item: any) => (
                <Box
                  key={item.id}
                  className="p-4 rounded-lg border border-border hover:bg-card-inner transition-colors"
                >
                  <Typography variant="subtitle2">
                    {item.name || item.title || item.username || item.id}
                  </Typography>
                  {item.description && (
                    <Typography className="text-foreground/80 text-sm">
                      {item.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
