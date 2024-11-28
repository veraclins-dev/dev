import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonSuperscript } from './menu-button-superscript';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonSuperscript> = {
  component: MenuButtonSuperscript,
  title: 'MenuButtonSuperscript',
};
export default meta;
type Story = StoryObj<typeof MenuButtonSuperscript>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonSuperscript!/gi),
    ).toBeTruthy();
  },
};
