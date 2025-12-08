import {
  type AccessorKeyColumnDef,
  type ColumnDef,
} from '@tanstack/react-table';

import { Box, type BoxProps } from '../../ui/box';
import { Checkbox } from '../../ui/checkbox';
import { Typography } from '../../ui/typography';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableDragHandle } from './data-table-drag-handle';
import {
  type Actions,
  DataTableRowActions,
  type DataTableRowActionsProps,
} from './data-table-row-actions';
import { type WithId } from './types';

type ControlColumn<TData extends WithId> =
  | {
      type: 'select' | 'drag';
      actions?: Actions<TData>;
    }
  | {
      type: 'actions';
      actions: Actions<TData>;
    };

// Define the type for column configuration
type ColumnConfig<TData extends WithId, TValue = unknown> = Omit<
  AccessorKeyColumnDef<TData, TValue>,
  'accessorKey'
> & {
  accessorKey?: AccessorKeyColumnDef<TData, TValue>['accessorKey'];
  width?: string | number;
  align?: BoxProps['justify'];
  // For control columns
  actions?: DataTableRowActionsProps<TData>['actions'];
} & (
    | {
        accessorKey: AccessorKeyColumnDef<TData, TValue>['accessorKey'];
        type?: never;
      }
    | ControlColumn<TData>
  );

// Helper function to get default control columns
const getControlColumn = <TData extends WithId, TValue>(
  config: ControlColumn<TData>,
): ColumnDef<TData, TValue> => {
  switch (config.type) {
    case 'select':
      return {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
        meta: { hasExplicitWidth: true },
      };
    case 'drag':
      return {
        id: 'drag',
        header: () => <Box />,
        cell: ({ row }) => <DataTableDragHandle id={row.original.id} />,
        enableSorting: false,
        enableHiding: false,
        size: 40,
        meta: { hasExplicitWidth: true },
      };
    case 'actions':
      return {
        id: 'actions',
        cell: ({ row }) => (
          <DataTableRowActions actions={config.actions} row={row} />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 80,
        meta: { hasExplicitWidth: true },
      };
    default:
      // @ts-expect-error This should never happen unless type check is disabled
      throw new Error(`Unsupported control column type: ${config.type}`);
  }
};

type Config<TData extends WithId, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  draggable: boolean;
  selectable: boolean;
};

// Main function to generate columns from config
function generateColumnsConfig<TData extends WithId, TValue>(
  configs: ColumnConfig<TData, TValue>[],
): Config<TData, TValue> {
  let draggable = false;
  let selectable = false;
  const columns = configs.map(({ accessorKey, ...config }) => {
    // Handle control columns
    if (config.type) {
      if (config.type === 'drag') {
        draggable = true;
      } else if (config.type === 'select') {
        selectable = true;
      }
      if (config.type === 'actions' && !config.actions) {
        throw new Error("Actions column must have an 'actions' property");
      }
      return getControlColumn({
        type: config.type,
        actions: config.type === 'actions' ? config.actions : config.actions,
      } as ControlColumn<TData>);
    }

    // Ensure accessorKey is defined for non-control columns
    if (!accessorKey) {
      throw new Error("Data columns must have an 'accessorKey' property");
    }
    // Default column configuration
    const column: ColumnDef<TData, TValue> = {
      accessorKey: accessorKey,
      header:
        config.header ??
        (({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={
              typeof config.header === 'string'
                ? config.header
                : (accessorKey?.toString() ?? 'Column')
            }
          />
        )),

      cell:
        config.cell ??
        (({ row }) => (
          <Typography>{row.getValue(String(accessorKey))}</Typography>
        )),
      enableSorting: config.enableSorting ?? true,
      enableHiding: config.enableHiding ?? true,
      ...config, // Spread other ColumnDef properties from config
    };

    // Apply custom styling if provided
    if (config.width) {
      column.size =
        typeof config.width === 'string'
          ? parseInt(config.width)
          : config.width;
      column.meta = {
        ...column.meta,
        hasExplicitWidth: true,
      };
    }

    if (config.align) {
      column.cell = (props) => (
        <Box display="flex" items="center" justify={config.align}>
          {column.cell
            ? typeof column.cell === 'function'
              ? column.cell(props)
              : column.cell
            : props.row.getValue(String(accessorKey))}
        </Box>
      );
    }

    return column;
  }) as ColumnDef<TData, TValue>[];
  return {
    columns,
    draggable,
    selectable,
  };
}

export { type ColumnConfig, generateColumnsConfig };
