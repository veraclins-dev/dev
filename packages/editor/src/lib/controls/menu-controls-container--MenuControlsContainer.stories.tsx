import type { Meta, StoryObj } from '@storybook/react';
import { MenuControlsContainer } from './menu-controls-container';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuControlsContainer> = {
  component: MenuControlsContainer,
  title: 'MenuControlsContainer',
};
export default meta;
type Story = StoryObj<typeof MenuControlsContainer>;

export const Primary = {
  args: {
    children: '',
    className: '',
    debounced: false,
    DebounceProps: '',
  },
};

export const Heading: Story = {
  args: {
    children: '',
    className: '',
    debounced: false,
    DebounceProps: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuControlsContainer!/gi),
    ).toBeTruthy();
  },
};
