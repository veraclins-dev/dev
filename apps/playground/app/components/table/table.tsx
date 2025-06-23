import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  Icon,
  type ItemOption,
  type TanstackTable,
} from '@veraclins-dev/ui';

import { priorities, statuses } from './data/data';
import { type Task } from './data/schema';
import data from './data/tasks.json';
import { columns } from './columns';

const bulkActions = (table: TanstackTable<Task>): ItemOption[] => [
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: 'trash-can',
    onClick: () => {
      const selectedRows = table.getFilteredSelectedRowModel().rows;
      console.log(
        'Delete',
        selectedRows.map((r) => r.original),
      );
      // setData((prev) => prev.filter((row) => !selectedRows.find((r) => r.id === row.id)));
      table.resetRowSelection();
    },
  },
  {
    key: 'download',
    label: 'Download Selected',
    icon: 'download',
    onClick: () => {
      console.log('Download', table.getFilteredSelectedRowModel().rows);
    },
  },
];

export const DataTableWithDnd = () => (
  <Card>
    <CardHeader>
      <CardTitle>DataTable with Drag-and-Drop</CardTitle>
      <CardDescription>
        This example demonstrates a data table with draggable rows, row
        selection, and faceted filtering.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable
        columnsConfig={[
          { type: 'drag' },
          { type: 'select' },
          ...columns,
          {
            type: 'actions',
            actions: [
              {
                key: 'edit',
                onActionClick: (row) => {
                  console.log('Edit', row.original);
                },
                label: (
                  <Icon name="pencil-square" className="size-4">
                    Edit
                  </Icon>
                ),
              },
              {
                key: 'delete',
                onActionClick: (row) => {
                  console.log('Delete', row);
                },
                label: (
                  <Icon name="trash-can" className="size-4">
                    Delete
                  </Icon>
                ),
              },
            ],
          },
        ]}
        data={data}
        filters={{
          faceted: {
            status: { options: statuses },
            priority: { options: priorities },
          },
        }}
        bulkActions={bulkActions}
      />
    </CardContent>
  </Card>
);

export const DataTableStandard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Standard DataTable</CardTitle>
      <CardDescription>
        This example showcases a standard data table without drag-and-drop
        functionality.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable
        columnsConfig={[
          { type: 'select' },
          ...columns,
          {
            type: 'actions',
            actions: [
              {
                key: 'edit',
                onActionClick: (row) => {
                  console.log('Edit', row.original);
                },
                label: (
                  <Icon name="pencil-square" className="size-4">
                    Edit
                  </Icon>
                ),
              },
              {
                key: 'delete',
                onActionClick: (row) => {
                  console.log('Delete', row);
                },
                label: (
                  <Icon name="trash-can" className="size-4">
                    Delete
                  </Icon>
                ),
              },
            ],
          },
        ]}
        data={data}
        filters={{
          faceted: {
            status: { options: statuses },
            priority: { options: priorities },
          },
        }}
        bulkActions={bulkActions}
      />
    </CardContent>
  </Card>
);

export function Page() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      my={8}
      py={4}
      className="container bg-card w-full h-full overflow-auto rounded-md"
    >
      <DataTableWithDnd />
      <DataTableStandard />
    </Box>
  );
}

export default Page;
