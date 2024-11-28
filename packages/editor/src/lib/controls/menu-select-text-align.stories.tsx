import type { Meta, StoryObj } from '@storybook/react';
import { MenuSelectTextAlign } from './menu-select-text-align';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuSelectTextAlign> = {
  component: MenuSelectTextAlign,
  title: 'MenuSelectTextAlign',
};
export default meta;
type Story = StoryObj<typeof MenuSelectTextAlign>;

export const Primary = {
  args: {
    emptyLabel: '',
  },
};

export const Heading: Story = {
  args: {
    emptyLabel: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuSelectTextAlign!/gi)).toBeTruthy();
  },
};
