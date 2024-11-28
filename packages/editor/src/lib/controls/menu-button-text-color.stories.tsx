import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonTextColor } from './menu-button-text-color';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonTextColor> = {
  component: MenuButtonTextColor,
  title: 'MenuButtonTextColor',
};
export default meta;
type Story = StoryObj<typeof MenuButtonTextColor>;

export const Primary = {
  args: {
    defaultTextColor: '',
  },
};

export const Heading: Story = {
  args: {
    defaultTextColor: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonTextColor!/gi)).toBeTruthy();
  },
};
