import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAlignLeft } from './menu-button-align-left';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAlignLeft> = {
  component: MenuButtonAlignLeft,
  title: 'MenuButtonAlignLeft',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAlignLeft>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonAlignLeft!/gi)).toBeTruthy();
  },
};
