import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonAddImage } from './menu-button-add-image';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonAddImage> = {
  component: MenuButtonAddImage,
  title: 'MenuButtonAddImage',
};
export default meta;
type Story = StoryObj<typeof MenuButtonAddImage>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonAddImage!/gi)).toBeTruthy();
  },
};
