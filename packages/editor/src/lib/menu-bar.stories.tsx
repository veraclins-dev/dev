import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar } from './menu-bar';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuBar> = {
  component: MenuBar,
  title: 'MenuBar',
};
export default meta;
type Story = StoryObj<typeof MenuBar>;

export const Primary = {
  args: {
    sticky: false,
    children: '',
    className: '',
  },
};

export const Heading: Story = {
  args: {
    sticky: false,
    children: '',
    className: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuBar!/gi)).toBeTruthy();
  },
};
