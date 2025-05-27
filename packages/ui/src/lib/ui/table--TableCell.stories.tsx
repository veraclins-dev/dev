import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableCell } from './table';

const meta: Meta<typeof TableCell> = {
  component: TableCell,
  title: 'Base/Table/Cell',
};
export default meta;
type Story = StoryObj<typeof TableCell>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableCell!/gi)).toBeTruthy();
  },
};
