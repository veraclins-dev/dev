import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Box } from './box';
import { Pagination } from './pagination';
import { Typography } from './typography';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Base/Pagination',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Pagination component provides a flexible and accessible way to navigate through paginated content. It supports responsive design with different visible page counts for mobile, tablet, and desktop views.

## Features
- Responsive design (mobile, tablet, desktop)
- Ellipsis dropdown for hidden pages
- First/Last page navigation
- Customizable visible page count
- Accessible with proper ARIA labels
- Smooth scroll-to-active-page in ellipsis dropdown

## Usage
The component automatically handles page item generation and ellipsis placement based on the current page and total pages.
        `,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'The currently active page number (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'The total number of pages available',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first and last page navigation buttons',
    },
    showPageNumbers: {
      control: 'boolean',
      description: 'Show page number buttons',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 9 },
      description:
        'Maximum number of page buttons to display (excluding ellipsis)',
    },
    buttonSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination buttons',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
        'neutral',
        'info',
      ],
      description: 'Color theme for the pagination buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

interface PaginationWrapperProps extends Omit<
  React.ComponentProps<typeof Pagination>,
  'currentPage' | 'onPageChange' | 'totalPages'
> {
  initialPage?: number;
  totalPages?: number;
}

function PaginationWrapper({
  initialPage = 1,
  totalPages = 20,
  ...props
}: PaginationWrapperProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <Box display="flex" flexDirection="column" gap={4} items="center" p={8}>
      <Typography className="text-foreground/80">
        Page {currentPage} of {totalPages}
      </Typography>
      <Pagination
        {...props}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
}

export const Basic: Story = {
  render: () => <PaginationWrapper totalPages={10} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pagination = canvas.getByRole('navigation', { name: /pagination/i });
    expect(pagination).toBeInTheDocument();
  },
};

export const ManyPages: Story = {
  render: () => <PaginationWrapper totalPages={50} initialPage={25} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const currentPageButton = canvas.getByRole('button', {
      name: /current page, page 25/i,
    });
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  },
};

export const FirstPage: Story = {
  render: () => <PaginationWrapper totalPages={20} initialPage={1} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByRole('button', {
      name: /go to previous page/i,
    });
    const firstButton = canvas.getByRole('button', {
      name: /go to first page/i,
    });
    expect(prevButton).toBeDisabled();
    expect(firstButton).toBeDisabled();
  },
};

export const LastPage: Story = {
  render: () => <PaginationWrapper totalPages={20} initialPage={20} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByRole('button', {
      name: /go to next page/i,
    });
    const lastButton = canvas.getByRole('button', {
      name: /go to last page/i,
    });
    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  },
};

export const MiddlePage: Story = {
  render: () => <PaginationWrapper totalPages={20} initialPage={10} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const currentPageButton = canvas.getByRole('button', {
      name: /current page, page 10/i,
    });
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  },
};

export const SmallPageCount: Story = {
  render: () => <PaginationWrapper totalPages={5} initialPage={3} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // All pages should be visible, no ellipsis
    const pageButtons = canvas.getAllByRole('button', {
      name: /^(go to|current) page \d+$/i,
    });
    expect(pageButtons.length).toBeGreaterThanOrEqual(5);
  },
};

export const WithoutFirstLast: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} showFirstLast={false} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstButton = canvas.queryByRole('button', {
      name: /go to first page/i,
    });
    const lastButton = canvas.queryByRole('button', {
      name: /go to last page/i,
    });
    expect(firstButton).not.toBeInTheDocument();
    expect(lastButton).not.toBeInTheDocument();
  },
};

export const WithoutPageNumbers: Story = {
  render: () => (
    <PaginationWrapper
      totalPages={20}
      initialPage={10}
      showPageNumbers={false}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pageButtons = canvas.queryAllByRole('button', {
      name: /^(go to|current) page \d+$/i,
    });
    expect(pageButtons.length).toBe(0);
  },
};

export const CustomMaxVisiblePages: Story = {
  render: () => (
    <PaginationWrapper totalPages={30} initialPage={15} maxVisiblePages={5} />
  ),
};

export const SmallButtons: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} buttonSize="sm" />
  ),
};

export const LargeButtons: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} buttonSize="lg" />
  ),
};

export const PrimaryColor: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} color="primary" />
  ),
};

export const SecondaryColor: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} color="secondary" />
  ),
};

export const DestructiveColor: Story = {
  render: () => (
    <PaginationWrapper totalPages={20} initialPage={10} color="destructive" />
  ),
};

export const Interactive: Story = {
  render: () => <PaginationWrapper totalPages={20} initialPage={5} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByRole('button', {
      name: /go to next page/i,
    });

    await userEvent.click(nextButton);

    const currentPageButton = canvas.getByRole('button', {
      name: /current page, page 6/i,
    });
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  },
};

export const EllipsisDropdown: Story = {
  render: () => <PaginationWrapper totalPages={50} initialPage={25} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ellipsisButton = canvas.getByRole('button', {
      name: /jump to page/i,
    });

    await userEvent.click(ellipsisButton);

    const dropdown = canvas.getByRole('menu');
    expect(dropdown).toBeInTheDocument();

    const pageItems = canvas.getAllByRole('menuitem');
    expect(pageItems.length).toBeGreaterThan(0);
  },
};

export const SinglePage: Story = {
  render: () => <PaginationWrapper totalPages={1} initialPage={1} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByRole('button', {
      name: /go to previous page/i,
    });
    const nextButton = canvas.getByRole('button', {
      name: /go to next page/i,
    });
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  },
};

export const VeryLargePageCount: Story = {
  render: () => <PaginationWrapper totalPages={1000} initialPage={500} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pagination = canvas.getByRole('navigation', { name: /pagination/i });
    expect(pagination).toBeInTheDocument();
  },
};
