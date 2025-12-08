import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icon,
  type ItemOption,
  type TanstackTable,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from '../playground-breadcrumb';

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

// Task Detail Dialog Component
const TaskDetailDialog = ({
  task,
  open,
  onOpenChange,
}: {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!task) return null;

  const status = statuses.find((s) => s.value === task.status);
  const priority = priorities.find((p) => p.value === task.priority);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            View and manage task information
          </DialogDescription>
        </DialogHeader>
        <Box className="space-y-4">
          <Box className="grid grid-cols-2 gap-4">
            <Box>
              <Typography className="text-muted-foreground mb-1">
                Task ID
              </Typography>
              <Typography variant="body1" className="font-mono">
                {task.id}
              </Typography>
            </Box>
            <Box>
              <Typography className="text-muted-foreground mb-1">
                Status
              </Typography>
              <Box className="flex items-center gap-2">
                {status?.icon && <Icon name={status.icon} className="size-4" />}
                <Typography variant="body1">{status?.label}</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography className="text-muted-foreground mb-1">
              Title
            </Typography>
            <Typography variant="body1">{task.title}</Typography>
          </Box>

          <Box className="grid grid-cols-2 gap-4">
            <Box>
              <Typography className="text-muted-foreground mb-1">
                Priority
              </Typography>
              <Box className="flex items-center gap-2">
                {priority?.icon && (
                  <Icon name={priority.icon} className="size-4" />
                )}
                <Typography variant="body1">{priority?.label}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography className="text-muted-foreground mb-1">
                Archived
              </Typography>
              <Typography variant="body1">
                {task.archived ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

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
            status: { options: statuses, type: 'dropdown' },
            priority: { options: priorities, type: 'dropdown' },
            archived: { title: 'Show Archived', type: 'boolean' },
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
        This example showcases a standard data table with column sorting.
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
            status: { options: statuses, type: 'dropdown' },
            priority: { options: priorities, type: 'dropdown' },
            archived: { title: 'Show Archived', type: 'boolean' },
          },
        }}
        bulkActions={bulkActions}
      />
    </CardContent>
  </Card>
);

export const DataTableWithInteractiveActions = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>DataTable with Interactive Actions</CardTitle>
          <CardDescription>
            This example demonstrates interactive row actions with a detail
            dialog that opens when viewing a task.
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
                    key: 'view',
                    onActionClick: (row) => handleViewTask(row.original),
                    label: (
                      <Icon name="eye-open" className="size-4">
                        View
                      </Icon>
                    ),
                  },
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
                status: { options: statuses, type: 'dropdown' },
                priority: { options: priorities, type: 'dropdown' },
                archived: { title: 'Show Archived', type: 'boolean' },
              },
            }}
            bulkActions={bulkActions}
          />
        </CardContent>
      </Card>

      <TaskDetailDialog
        task={selectedTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export function Page() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Table" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Data Table Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Advanced data table components with sorting, filtering, and
          interactive features.
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={6}>
        <DataTableWithDnd />
        <DataTableStandard />
        <DataTableWithInteractiveActions />
      </Box>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Use Cases</CardTitle>
          <CardDescription>
            Common scenarios where data tables are used in real applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid gap-6 md:grid-cols-2">
            <Box className="space-y-3">
              <Typography variant="h4" className="flex items-center gap-2">
                <Icon name="users" className="size-5" />
                User Management
              </Typography>
              <Typography className="text-muted-foreground">
                Manage users with bulk actions, filtering by role, status, and
                department. Interactive actions for editing profiles, resetting
                passwords, and managing permissions.
              </Typography>
            </Box>

            <Box className="space-y-3">
              <Typography variant="h4" className="flex items-center gap-2">
                <Icon name="shopping-cart" className="size-5" />
                E-commerce Orders
              </Typography>
              <Typography className="text-muted-foreground">
                Track orders with status filtering, customer information, and
                order details. Bulk actions for processing, shipping, and
                customer communication.
              </Typography>
            </Box>

            <Box className="space-y-3">
              <Typography variant="h4" className="flex items-center gap-2">
                <Icon name="chart-bar" className="size-5" />
                Analytics Dashboard
              </Typography>
              <Typography className="text-muted-foreground">
                Display metrics and KPIs with sorting, filtering by date ranges,
                and export functionality. Interactive drill-down capabilities
                for detailed analysis.
              </Typography>
            </Box>

            <Box className="space-y-3">
              <Typography variant="h4" className="flex items-center gap-2">
                <Icon name="document-text" className="size-5" />
                Content Management
              </Typography>
              <Typography className="text-muted-foreground">
                Manage articles, pages, and media with status tracking, author
                information, and publishing workflows. Bulk publishing and
                content scheduling.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility Information */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>
            Built-in accessibility features and best practices for data tables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box className="grid gap-4 md:grid-cols-2">
              <Box className="space-y-2">
                <Typography variant="h4" className="text-sm font-medium">
                  Keyboard Navigation
                </Typography>
                <Typography className="text-muted-foreground">
                  Full keyboard support for navigating rows, selecting items,
                  and triggering actions. Tab navigation through interactive
                  elements and arrow key navigation between cells.
                </Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="h4" className="text-sm font-medium">
                  Screen Reader Support
                </Typography>
                <Typography className="text-muted-foreground">
                  Proper ARIA labels and roles for table structure, row
                  selection, and action buttons. Announcements for sorting,
                  filtering, and bulk actions.
                </Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="h4" className="text-sm font-medium">
                  Focus Management
                </Typography>
                <Typography className="text-muted-foreground">
                  Logical focus order and visible focus indicators. Focus
                  trapping in modals and proper focus restoration when dialogs
                  close.
                </Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="h4" className="text-sm font-medium">
                  High Contrast Support
                </Typography>
                <Typography className="text-muted-foreground">
                  Compatible with high contrast themes and color schemes. Clear
                  visual indicators for interactive states and selection
                  feedback.
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing data tables in your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box className="space-y-2">
              <Typography variant="h4" className="text-sm font-medium">
                Performance Considerations
              </Typography>
              <Typography className="text-muted-foreground">
                For large datasets, consider implementing virtual scrolling or
                pagination. Use memoization for expensive computations and
                optimize re-renders with React.memo for custom cell components.
              </Typography>
            </Box>

            <Box className="space-y-2">
              <Typography variant="h4" className="text-sm font-medium">
                Data Structure
              </Typography>
              <Typography className="text-muted-foreground">
                Ensure each row has a unique identifier for proper selection and
                drag-and-drop functionality. Structure your data to support
                efficient filtering and sorting operations.
              </Typography>
            </Box>

            <Box className="space-y-2">
              <Typography variant="h4" className="text-sm font-medium">
                User Experience
              </Typography>
              <Typography className="text-muted-foreground">
                Provide clear feedback for user actions, loading states for
                async operations, and confirmation dialogs for destructive
                actions. Consider the context and frequency of use when choosing
                between different table configurations.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Page;
