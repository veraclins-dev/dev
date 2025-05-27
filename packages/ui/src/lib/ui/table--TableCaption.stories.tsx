import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TableCaption } from './table';

const meta: Meta<typeof TableCaption> = {
  component: TableCaption,
  title: 'Base/Table/Caption',
};
export default meta;
type Story = StoryObj<typeof TableCaption>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TableCaption!/gi)).toBeTruthy();
  },
};
