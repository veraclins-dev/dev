import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonBold } from './menu-button-bold';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonBold> = {
  component: MenuButtonBold,
  title: 'MenuButtonBold',
};
export default meta;
type Story = StoryObj<typeof MenuButtonBold>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonBold!/gi)).toBeTruthy();
  },
};
