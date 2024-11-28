import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonRemoveFormatting } from './menu-button-remove-formatting';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonRemoveFormatting> = {
  component: MenuButtonRemoveFormatting,
  title: 'MenuButtonRemoveFormatting',
};
export default meta;
type Story = StoryObj<typeof MenuButtonRemoveFormatting>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonRemoveFormatting!/gi),
    ).toBeTruthy();
  },
};
