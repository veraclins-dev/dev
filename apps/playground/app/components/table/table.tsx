import { DataTable, Icon } from '@veraclins-dev/ui';

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

export function Page() {
  return (
    <div className="container bg-card flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md py-4">
      <DataTableComponent />
    </div>
  );
}

export default Page;
