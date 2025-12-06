import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Icon } from '../../ui/icon';

import { priorities, statuses } from './data/data';
import { type Task } from './data/schema';
import data from './data/tasks.json';
import { columns } from './columns';
import { DataTable } from './data-table';
import { type ColumnConfig } from './utils';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: 'Components/DataTable',
};
export default meta;
type Story = StoryObj<typeof DataTable<Task>>;

export const Primary: Story = {
  args: {
    columnsConfig: [
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
    ] as ColumnConfig<Task>[],
    data: data,
    filters: {
      faceted: {
        status: { type: 'dropdown', options: statuses },
        priority: { type: 'dropdown', options: priorities },
      },
    },
  },
};

export const Heading: Story = {
  args: {
    columnsConfig: [
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
    ] as ColumnConfig<Task>[],
    data: data.slice(0, 10),
    filters: {
      faceted: {
        status: { type: 'dropdown', options: statuses },
        priority: { type: 'dropdown', options: priorities },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DataTable!/gi)).toBeTruthy();
  },
};
