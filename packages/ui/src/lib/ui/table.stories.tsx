import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from './box';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  title: 'Base/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Table component provides a responsive and accessible way to display tabular data. It's built with semantic HTML and includes built-in styling and accessibility features.

## Features
- Responsive design with horizontal scrolling
- Semantic HTML structure
- Built-in hover and selected states
- Support for headers, body, footer, and captions
- Customizable styling

## Usage
The Table component is composed of several subcomponents:
- \`Table\`: The main container
- \`TableHeader\`: The header section
- \`TableBody\`: The main content section
- \`TableFooter\`: The footer section
- \`TableRow\`: A row in any section
- \`TableHead\`: A header cell
- \`TableCell\`: A data cell
- \`TableCaption\`: A caption for the table

## Props
All components accept standard HTML table element props plus:
- \`className\`: Additional CSS classes
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Table>
        <TableCaption>A list of users and their roles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Table>
        <TableCaption>Monthly expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Rent</TableCell>
            <TableCell>$1,200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Utilities</TableCell>
            <TableCell>$300</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Groceries</TableCell>
            <TableCell>$400</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>$1,900</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Table>
        <TableCaption className="text-lg font-semibold">
          Team Members
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral/50">
            <TableHead className="text-blue-600">Name</TableHead>
            <TableHead className="text-blue-600">Department</TableHead>
            <TableHead className="text-blue-600">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-blue-50">
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell className="text-green-600">Active</TableCell>
          </TableRow>
          <TableRow className="hover:bg-blue-50">
            <TableCell className="font-medium">Jane Smith</TableCell>
            <TableCell>Design</TableCell>
            <TableCell className="text-green-600">Active</TableCell>
          </TableRow>
          <TableRow className="hover:bg-blue-50">
            <TableCell className="font-medium">Bob Johnson</TableCell>
            <TableCell>Marketing</TableCell>
            <TableCell className="text-yellow-600">On Leave</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  ),
};

export const WithSelectedState: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} p={8}>
      <Table>
        <TableCaption>Selectable items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>Item 1</TableCell>
            <TableCell>$100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item 2</TableCell>
            <TableCell>$200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item 3</TableCell>
            <TableCell>$300</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  ),
};
