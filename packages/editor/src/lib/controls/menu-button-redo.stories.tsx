import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonRedo } from './menu-button-redo';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonRedo> = {
  component: MenuButtonRedo,
  title: 'MenuButtonRedo',
};
export default meta;
type Story = StoryObj<typeof MenuButtonRedo>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonRedo!/gi)).toBeTruthy();
  },
};
