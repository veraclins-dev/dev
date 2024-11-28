import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonCodeBlock } from './menu-button-code-block';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonCodeBlock> = {
  component: MenuButtonCodeBlock,
  title: 'MenuButtonCodeBlock',
};
export default meta;
type Story = StoryObj<typeof MenuButtonCodeBlock>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonCodeBlock!/gi)).toBeTruthy();
  },
};
