import type { Meta, StoryObj } from '@storybook/react';
import { MenuSelect } from './menu-select';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuSelect> = {
  component: MenuSelect,
  title: 'MenuSelect',
};
export default meta;
type Story = StoryObj<typeof MenuSelect>;

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
    expect(canvas.getByText(/Welcome to MenuSelect!/gi)).toBeTruthy();
  },
};
