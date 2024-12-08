import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Icon!/gi)).toBeTruthy();
  },
};
