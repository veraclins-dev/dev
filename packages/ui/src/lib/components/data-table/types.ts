import { type UniqueIdentifier } from '@dnd-kit/core';
import { type Column } from '@tanstack/react-table';

import { type IconName } from '../../icons';

type DataTableFacetedDropdownFilterOption = {
  label: string;
  value: string;
  icon?: IconName;
};

type BaseDataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  type: 'boolean' | 'dropdown' | 'dateRange' | 'numberRange';
  title?: string;
  options?: DataTableFacetedDropdownFilterOption[];
};

type DataTableFacetedBooleanFilterProps<TData, TValue> =
  BaseDataTableFacetedFilterProps<TData, TValue> & {
    type: 'boolean';
    options?: never;
  };

type DataTableFacetedRangeFilterProps<TData, TValue> =
  BaseDataTableFacetedFilterProps<TData, TValue> & {
    type: 'dateRange' | 'numberRange';
    options?: never;
  };

type DataTableFacetedDropdownFilterProps<TData, TValue> =
  BaseDataTableFacetedFilterProps<TData, TValue> & {
    type: 'dropdown';
    options?: DataTableFacetedDropdownFilterOption[];
  };

type DataTableFacetedFilterProps<TData, TValue> =
  | DataTableFacetedBooleanFilterProps<TData, TValue>
  | DataTableFacetedRangeFilterProps<TData, TValue>
  | DataTableFacetedDropdownFilterProps<TData, TValue>;

interface WithId {
  id: UniqueIdentifier;
}

export type {
  DataTableFacetedBooleanFilterProps,
  DataTableFacetedDropdownFilterOption,
  DataTableFacetedDropdownFilterProps,
  DataTableFacetedFilterProps,
  DataTableFacetedRangeFilterProps,
  WithId,
};
