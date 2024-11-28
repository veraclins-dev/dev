import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonCode } from './menu-button-code';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonCode> = {
  component: MenuButtonCode,
  title: 'MenuButtonCode',
};
export default meta;
type Story = StoryObj<typeof MenuButtonCode>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuButtonCode!/gi)).toBeTruthy();
  },
};
