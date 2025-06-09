import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import ListItem from './list-item';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  title: 'Base/ListItem',
};
export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    children: 'Default list item',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Default list item')).toBeTruthy();
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: 'Interactive list item',
  },
};

export const Selected: Story = {
  args: {
    variant: 'selected',
    children: 'Selected list item',
  },
};

export const Sizes: Story = {
  render: () => (
    <ul className="space-y-4">
      <ListItem size="sm">Small list item</ListItem>
      <ListItem size="md">Medium list item</ListItem>
      <ListItem size="lg">Large list item</ListItem>
      <ListItem size="xl">Extra large list item</ListItem>
    </ul>
  ),
};

export const Weights: Story = {
  render: () => (
    <ul className="space-y-4">
      <ListItem weight="normal">Normal weight</ListItem>
      <ListItem weight="medium">Medium weight</ListItem>
      <ListItem weight="semibold">Semibold weight</ListItem>
      <ListItem weight="bold">Bold weight</ListItem>
    </ul>
  ),
};

export const Colors: Story = {
  render: () => (
    <ul className="space-y-4">
      <ListItem color="default">Default color</ListItem>
      <ListItem color="primary">Primary color</ListItem>
      <ListItem color="secondary">Secondary color</ListItem>
      <ListItem color="destructive">Destructive color</ListItem>
      <ListItem color="success">Success color</ListItem>
      <ListItem color="warning">Warning color</ListItem>
      <ListItem color="info">Info color</ListItem>
      <ListItem color="neutral">Neutral color</ListItem>
    </ul>
  ),
};
