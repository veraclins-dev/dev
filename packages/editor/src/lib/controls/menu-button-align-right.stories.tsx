import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAlignRight } from './menu-button-align-right';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAlignRight> = {
  component: MenuButtonAlignRight,
  title: 'MenuButtonAlignRight',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAlignRight>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonAlignRight!/gi)).toBeTruthy();
  },
};
