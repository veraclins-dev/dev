import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonItalic } from './menu-button-italic';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonItalic> = {
  component: MenuButtonItalic,
  title: 'MenuButtonItalic',
};
export default meta;
type Story = StoryObj<typeof MenuButtonItalic>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonItalic!/gi)).toBeTruthy();
  },
};
