import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAlignJustify } from './menu-button-align-justify';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAlignJustify> = {
  component: MenuButtonAlignJustify,
  title: 'MenuButtonAlignJustify',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAlignJustify>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonAlignJustify!/gi),
    ).toBeTruthy();
  },
};
