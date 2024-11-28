import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonHighlightColor } from './menu-button-highlight-color';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonHighlightColor> = {
  component: MenuButtonHighlightColor,
  title: 'MenuButtonHighlightColor',
};
export default meta;
type Story = StoryObj<typeof MenuButtonHighlightColor>;

export const Primary = {
  args: {
    defaultMarkColor: '',
  },
};

export const Heading: Story = {
  args: {
    defaultMarkColor: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonHighlightColor!/gi),
    ).toBeTruthy();
  },
};
