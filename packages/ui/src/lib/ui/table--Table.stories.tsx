import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Table } from './table';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Base/Table/Main',
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Table!/gi)).toBeTruthy();
  },
};
