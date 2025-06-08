import { cn } from '@veraclins-dev/utils';

import {
  Badge,
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
              <div className="hidden space-x-1 lg:flex">
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
              </div>
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
                      <span>{option.label}</span>
                    )}

                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
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
                    Clear filters
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
