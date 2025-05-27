import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableHead } from './table';

const meta: Meta<typeof TableHead> = {
  component: TableHead,
  title: 'Base/Table/Head',
};
export default meta;
type Story = StoryObj<typeof TableHead>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableHead!/gi)).toBeTruthy();
  },
};
