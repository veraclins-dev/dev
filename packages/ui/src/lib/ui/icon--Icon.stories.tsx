import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { iconNames } from '../icons';

import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    name: 'add-photo',
    size: 'sm',
    color: 'primary',
  },
  argTypes: {
    name: {
      options: [...iconNames].reverse(),
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Icon!/gi)).toBeTruthy();
  },
};
