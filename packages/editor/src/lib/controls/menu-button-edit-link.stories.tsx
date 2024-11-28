import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonEditLink } from './menu-button-edit-link';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonEditLink> = {
  component: MenuButtonEditLink,
  title: 'MenuButtonEditLink',
};
export default meta;
type Story = StoryObj<typeof MenuButtonEditLink>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonEditLink!/gi)).toBeTruthy();
  },
};
