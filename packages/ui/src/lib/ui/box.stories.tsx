import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Box from './box';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Base/Box',
};
export default meta;
type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    className: '',
    children: 'This is a Box component!',
  },
};

export const Heading: Story = {
  args: {
    component: 'span',
    className: '',
    children: 'Welcome to Box!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Box!/gi)).toBeTruthy();
  },
};
