import type { Meta, StoryObj } from '@storybook/react';
import { MenuSelectHeading } from './menu-select-heading';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuSelectHeading> = {
  component: MenuSelectHeading,
  title: 'MenuSelectHeading',
};
export default meta;
type Story = StoryObj<typeof MenuSelectHeading>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuSelectHeading!/gi)).toBeTruthy();
  },
};
