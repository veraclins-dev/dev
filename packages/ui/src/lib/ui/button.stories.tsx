import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import Button from './button';
import { Icon } from './icon';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Base/Button',
  args: {
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimarySolid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('bg-primary text-primary-foreground');
  },
};

export const OutlineDestructive: Story = {
  args: {
    variant: 'outline',
    color: 'destructive',
    size: 'lg',
    children: 'Delete',
    leadingIcon: 'trash',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('border-destructive text-destructive');
    expect(canvas.getByTestId('svg')).toBeInTheDocument();
  },
};

export const TextInfo: Story = {
  args: {
    variant: 'text',
    color: 'info',
    size: 'md',
    children: 'Learn More',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /learn more/i });
    expect(button).toHaveClass('text-info');
  },
};

export const SoftSuccess: Story = {
  args: {
    variant: 'soft',
    color: 'success',
    size: 'lg',
    children: 'Save',
    trailingIcon: 'check',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /save/i });
    expect(button).toHaveClass('bg-success/20 text-success rounded-full');
    expect(canvas.getByTestId('svg')).toBeInTheDocument();
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'solid',
    color: 'secondary',
    size: 'icon',
    'aria-label': 'Add item',
    children: <Icon name="plus" data-testid="svg" />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text', 'soft'],
      description:
        'Structural style of the button (solid, outline, text, soft)',
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
      description: 'Semantic color of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'pill', 'icon'],
      description: 'Size of the button',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /add item/i });
    expect(button).toHaveClass('bg-neutral text-neutral-foreground size-9');
    expect(canvas.getByTestId('svg')).toBeInTheDocument();
  },
};

export const LoadingPrimary: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    loading: true,
    children: 'Submitting',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /submitting/i });
    const spinner = canvas.getByRole('status', { name: /loading/i });
    expect(button).toHaveClass('bg-primary/50 text-primary-foreground/70');
    expect(spinner).toBeInTheDocument();
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: 'outline',
    color: 'secondary',
    size: 'lg',
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveClass('disabled:opacity-50');
  },
};
