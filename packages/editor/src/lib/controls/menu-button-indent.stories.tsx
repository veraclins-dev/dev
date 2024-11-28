import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonIndent } from './menu-button-indent';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonIndent> = {
  component: MenuButtonIndent,
  title: 'MenuButtonIndent',
};
export default meta;
type Story = StoryObj<typeof MenuButtonIndent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonIndent!/gi)).toBeTruthy();
  },
};
