import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonBlockquote } from './menu-button-blockquote';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonBlockquote> = {
  component: MenuButtonBlockquote,
  title: 'MenuButtonBlockquote',
};
export default meta;
type Story = StoryObj<typeof MenuButtonBlockquote>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonBlockquote!/gi)).toBeTruthy();
  },
};
