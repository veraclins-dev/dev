import { cn, humanize } from '@veraclins-dev/utils';

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
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Switch,
  Typography,
} from '../../ui';

import {
  type DataTableFacetedBooleanFilterProps,
  type DataTableFacetedDropdownFilterOption,
  type DataTableFacetedDropdownFilterProps,
  type DataTableFacetedFilterProps,
} from './types';

function DataTableFacetedDropdownFilter<TData, TValue>({
  column,
  title,
  options: provided,
}: DataTableFacetedDropdownFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const options: DataTableFacetedDropdownFilterOption[] =
    provided ??
    Array.from(facets?.keys() ?? []).map((value) => ({
      label: humanize(value),
      value,
    }));
  const isFiltered = selectedValues.size > 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          color={isFiltered ? 'primary' : 'secondary'}
          className="h-8 items-center border-dashed"
        >
          <Icon name="plus-circle">{title}</Icon>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" />
              <Badge
                color="primary"
                variant="soft"
                className="text-xs rounded-sm py-0.5 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <Box display="hidden" gap={1} className="hidden lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    color="primary"
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
                        color="primary"
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
            wrapperClassName="px-3 w-full py-1 has-focus-visible:ring-0 has-focus-visible:ring-offset-0 border-none"
            className={cn(INPUT_CLASS_OVERRIDES, 'py-1 px-0')}
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
                    <Checkbox checked={isSelected} />
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

function DataTableFacetedBooleanFilter<TData, TValue>({
  column,
  title,
}: DataTableFacetedBooleanFilterProps<TData, TValue>) {
  return (
    <Box display="flex" items="center" gap={2}>
      <Switch
        id={`${column?.id}-switch`}
        checked={(column?.getFilterValue() as boolean) ?? false}
        onCheckedChange={(value) =>
          column?.setFilterValue(value ? true : undefined)
        }
      />
      {title ? <Label htmlFor={`${column?.id}-switch`}>{title}</Label> : null}
    </Box>
  );
}

function DataTableFacetedFilter<TData, TValue>(
  props: DataTableFacetedFilterProps<TData, TValue>,
) {
  if (props.type === 'dropdown') {
    return <DataTableFacetedDropdownFilter {...props} />;
  }

  if (props.type === 'boolean') {
    return <DataTableFacetedBooleanFilter {...props} />;
  }

  // TODO: Add other types of filters
  return null;
}

export { DataTableFacetedFilter };
