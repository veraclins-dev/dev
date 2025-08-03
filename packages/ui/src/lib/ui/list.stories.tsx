import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import List from './list';
import ListItem from './list-item';

const meta: Meta<typeof List> = {
  component: List,
  title: 'Base/List',
};
export default meta;
type Story = StoryObj<typeof List>;

export const Unordered: Story = {
  args: {
    component: 'ul',
    variant: 'ul',
    pl: 6,
    my: 4,
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('First item')).toBeTruthy();
    expect(canvas.getByText('Second item')).toBeTruthy();
    expect(canvas.getByText('Third item')).toBeTruthy();
  },
};

export const Ordered: Story = {
  args: {
    component: 'ol',
    variant: 'ol',
    marker: 'decimal',
    pl: 6,
    my: 4,
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
};

export const Roman: Story = {
  args: {
    component: 'ol',
    variant: 'ol',
    marker: 'roman',
    pl: 6,
    my: 4,
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
};

export const Alpha: Story = {
  args: {
    component: 'ol',
    variant: 'ol',
    marker: 'alpha',
    pl: 6,
    my: 4,
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
};

export const NoMarker: Story = {
  args: {
    component: 'ul',
    variant: 'none',
    pl: 6,
    my: 4,
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
};
