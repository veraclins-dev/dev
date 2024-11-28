import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonUndo } from './menu-button-undo';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonUndo> = {
  component: MenuButtonUndo,
  title: 'MenuButtonUndo',
};
export default meta;
type Story = StoryObj<typeof MenuButtonUndo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonUndo!/gi)).toBeTruthy();
  },
};
