import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CommandList } from './command';

const meta: Meta<typeof CommandList> = {
  component: CommandList,
  title: 'Base/Command/List',
};
export default meta;
type Story = StoryObj<typeof CommandList>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CommandList!/gi)).toBeTruthy();
  },
};
