import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableHeader } from './table';

const meta: Meta<typeof TableHeader> = {
  component: TableHeader,
  title: 'Base/Table/Header',
};
export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableHeader!/gi)).toBeTruthy();
  },
};
