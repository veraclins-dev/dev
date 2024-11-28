import type { Meta, StoryObj } from '@storybook/react';
import { ControlledBubbleMenu } from './controlled-bubble-menu';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ControlledBubbleMenu> = {
  component: ControlledBubbleMenu,
  title: 'ControlledBubbleMenu',
};
export default meta;
type Story = StoryObj<typeof ControlledBubbleMenu>;

export const Primary = {
  args: {
    editor: '',
    open: false,
    children: '',
    className: '',
    anchorEl: '',
  },
};

export const Heading: Story = {
  args: {
    editor: '',
    open: false,
    children: '',
    className: '',
    anchorEl: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ControlledBubbleMenu!/gi)).toBeTruthy();
  },
};
