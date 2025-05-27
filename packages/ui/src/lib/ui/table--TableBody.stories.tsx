import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableBody } from './table';

const meta: Meta<typeof TableBody> = {
  component: TableBody,
  title: 'Base/Table/Body',
};
export default meta;
type Story = StoryObj<typeof TableBody>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableBody!/gi)).toBeTruthy();
  },
};
