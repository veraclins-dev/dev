import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonSubscript } from './menu-button-subscript';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonSubscript> = {
  component: MenuButtonSubscript,
  title: 'MenuButtonSubscript',
};
export default meta;
type Story = StoryObj<typeof MenuButtonSubscript>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonSubscript!/gi)).toBeTruthy();
  },
};
