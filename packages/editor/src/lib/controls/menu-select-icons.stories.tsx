import type { Meta, StoryObj } from '@storybook/react';
import { MenuSelectIcons } from './menu-select-icons';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuSelectIcons> = {
  component: MenuSelectIcons,
  title: 'MenuSelectIcons',
};
export default meta;
type Story = StoryObj<typeof MenuSelectIcons>;

export const Primary = {
  args: {
    options: '',
    className: '',
    defaultLabel: '',
    tooltip: '',
  },
};

export const Heading: Story = {
  args: {
    options: '',
    className: '',
    defaultLabel: '',
    tooltip: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuSelectIcons!/gi)).toBeTruthy();
  },
};
