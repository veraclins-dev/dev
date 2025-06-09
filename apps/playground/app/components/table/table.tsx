import { Box, DataTable, Icon } from '@veraclins-dev/ui';

import { priorities, statuses } from './data/data';
import data from './data/tasks.json';
import { columns } from './columns';

export const DataTableComponent = () => (
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
  />
);

export const DataTableComponent2 = () => (
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
  />
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
      <DataTableComponent />
      <DataTableComponent2 />
    </Box>
  );
}

export default Page;
