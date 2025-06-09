import {
  Badge,
  Box,
  DataTableColumnHeader,
  type DataTableProps,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

import { labels, priorities, statuses } from './data/data';
import { type Task } from './data/schema';

export const columns: DataTableProps<Task>['columnsConfig'] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <Box className="w-[80px]">{row.getValue('id')}</Box>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <Box className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <Typography
            variant="body2"
            className="max-w-[500px] truncate font-medium"
          >
            {row.getValue('title')}
          </Typography>
        </Box>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status'),
      );

      if (!status) {
        return null;
      }

      return (
        <Box className="flex w-[100px] items-center">
          {status.icon ? (
            <Icon name={status.icon} className="size-4">
              {status.label}
            </Icon>
          ) : (
            <Typography variant="body2">{status.label}</Typography>
          )}
        </Box>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority'),
      );

      if (!priority) {
        return null;
      }

      return (
        <Box className="flex items-center">
          {priority.icon ? (
            <Icon name={priority.icon} className="size-4">
              {priority.label}
            </Icon>
          ) : (
            <Typography variant="body2">{priority.label}</Typography>
          )}
        </Box>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
