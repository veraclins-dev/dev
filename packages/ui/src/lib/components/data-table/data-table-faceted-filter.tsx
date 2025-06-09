import { cn } from '@veraclins-dev/utils';

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Icon,
  INPUT_CLASS_OVERRIDES,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Typography,
} from '../../ui';

import { type DataTableFacetedFilterProps } from './types';

function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 items-center border-dashed"
        >
          <Icon name="plus-circle">{title}</Icon>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" />
              <Badge
                color="neutral"
                variant="soft"
                className="text-xs rounded-sm py-0.5 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <Box display="hidden" gap={1} className="hidden lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    color="neutral"
                    variant="soft"
                    className="text-xs rounded-sm py-0.5 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        color="neutral"
                        variant="soft"
                        key={option.value}
                        className="text-xs rounded-sm py-0.5 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </Box>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            withIcon
            placeholder={title}
            wrapperClassName="px-3 w-full py-1"
            className={cn(INPUT_CLASS_OVERRIDES, 'py-1 px-2')}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <Checkbox checked={isSelected} className="size-4" />
                    {option.icon ? (
                      <Icon name={option.icon} className="size-4">
                        {option.label}
                      </Icon>
                    ) : (
                      <Typography variant="body2">{option.label}</Typography>
                    )}

                    {facets?.get(option.value) && (
                      <Box
                        display="flex"
                        items="center"
                        justify="center"
                        className="ml-auto h-4 w-4 font-mono text-xs"
                      >
                        {facets.get(option.value)}
                      </Box>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    <Typography variant="body2">Clear filters</Typography>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { DataTableFacetedFilter };
