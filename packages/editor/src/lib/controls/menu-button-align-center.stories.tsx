import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAlignCenter } from './menu-button-align-center';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAlignCenter> = {
  component: MenuButtonAlignCenter,
  title: 'MenuButtonAlignCenter',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAlignCenter>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonAlignCenter!/gi),
    ).toBeTruthy();
  },
};
