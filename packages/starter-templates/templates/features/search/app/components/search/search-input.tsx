import { useForm } from '@conform-to/react';
import { Box, TextField } from '@veraclins-dev/ui';
import { useNavigate, useSearchParams } from 'react-router';
import { SearchSchema } from '../../utils/search/search.server';

interface SearchInputProps {
  placeholder?: string;
  resource?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function SearchInput({
  placeholder = 'Search...',
  resource,
  className,
  onSearch,
}: SearchInputProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, fields] = useForm({
    id: 'search-form',
    defaultValue: {
      search: searchParams.get('q') || searchParams.get('search') || '',
    },
    onValidate: ({ formData }) => {
      return SearchSchema.parse(formData);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;

    if (onSearch) {
      onSearch(query);
    } else {
      const params = new URLSearchParams();
      params.set('q', query);
      if (resource) {
        params.set('resource', resource);
      }
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={className}>
      <TextField
        field={fields.search}
        placeholder={placeholder}
        type="search"
        autoComplete="off"
      />
    </Box>
  );
}
