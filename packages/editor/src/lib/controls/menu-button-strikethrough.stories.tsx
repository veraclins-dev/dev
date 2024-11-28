import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonStrikethrough } from './menu-button-strikethrough';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonStrikethrough> = {
  component: MenuButtonStrikethrough,
  title: 'MenuButtonStrikethrough',
};
export default meta;
type Story = StoryObj<typeof MenuButtonStrikethrough>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonStrikethrough!/gi),
    ).toBeTruthy();
  },
};
