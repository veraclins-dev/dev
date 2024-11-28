import type { Meta, StoryObj } from '@storybook/react';
import { MenuSelectFontSize } from './menu-select-font-size';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuSelectFontSize> = {
  component: MenuSelectFontSize,
  title: 'MenuSelectFontSize',
};
export default meta;
type Story = StoryObj<typeof MenuSelectFontSize>;

export const Primary = {
  args: {
    unsetOptionLabel: '',
    hideUnsetOption: false,
    emptyLabel: '',
  },
};

export const Heading: Story = {
  args: {
    unsetOptionLabel: '',
    hideUnsetOption: false,
    emptyLabel: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MenuSelectFontSize!/gi)).toBeTruthy();
  },
};
