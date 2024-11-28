import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonHorizontalRule } from './menu-button-horizontal-rule';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonHorizontalRule> = {
  component: MenuButtonHorizontalRule,
  title: 'MenuButtonHorizontalRule',
};
export default meta;
type Story = StoryObj<typeof MenuButtonHorizontalRule>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonHorizontalRule!/gi),
    ).toBeTruthy();
  },
};
