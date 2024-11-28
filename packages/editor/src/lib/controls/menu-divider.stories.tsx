import type { Meta, StoryObj } from '@storybook/react';
import { MenuDivider } from './menu-divider';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuDivider> = {
  component: MenuDivider,
  title: 'MenuDivider',
};
export default meta;
type Story = StoryObj<typeof MenuDivider>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuDivider!/gi)).toBeTruthy();
  },
};
