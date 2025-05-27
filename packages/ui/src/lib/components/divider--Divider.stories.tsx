import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Components/Divider/Main',
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  args: {
    opaque: false,
    className: '',
  },
};

export const Heading: Story = {
  args: {
    orientation: 'horizontal',
    opaque: false,
    variant: 'full',
    className: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Divider!/gi)).toBeTruthy();
  },
};
