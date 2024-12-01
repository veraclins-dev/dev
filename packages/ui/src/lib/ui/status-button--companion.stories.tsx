import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { companion } from './status-button';

const meta: Meta<typeof companion> = {
  component: companion,
  title: 'companion',
};
export default meta;
type Story = StoryObj<typeof companion>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to companion!/gi)).toBeTruthy();
  },
};
