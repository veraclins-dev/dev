import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ButtonBase } from './button';
import { ComposedTooltip } from './tooltip';

const meta: Meta<typeof ComposedTooltip> = {
  component: ComposedTooltip,
  title: 'ComposedTooltip',
};
export default meta;
type Story = StoryObj<typeof ComposedTooltip>;

export const Primary: Story = {
  args: {
    Trigger: ButtonBase,
    content: 'Hello there',
    arrow: true,
    TriggerProps: { children: 'Hover me' },
  },
};

export const Heading: Story = {
  args: {
    Trigger: ButtonBase,
    content: 'The tooltip content',
    TriggerProps: { children: 'Hover me' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedTooltip!/gi)).toBeTruthy();
  },
};
