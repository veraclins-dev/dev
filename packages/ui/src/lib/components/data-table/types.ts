import { type UniqueIdentifier } from '@dnd-kit/core';
import { type Column } from '@tanstack/react-table';

import { type IconName } from '../../icons';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: IconName;
  }[];
}

interface WithId {
  id: UniqueIdentifier;
}

export type { DataTableFacetedFilterProps, WithId };
