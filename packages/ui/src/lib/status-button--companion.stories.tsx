import type { Meta, StoryObj } from '@storybook/react';
import { companion } from './status-button';

import { within, expect } from '@storybook/test';

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
