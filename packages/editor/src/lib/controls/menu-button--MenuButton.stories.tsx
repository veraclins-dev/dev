import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton } from './menu-button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
  title: 'MenuButton',
};
export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButton!/gi)).toBeTruthy();
  },
};
