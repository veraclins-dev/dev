import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { ComposedTooltip } from './tooltip';

const meta: Meta<typeof ComposedTooltip> = {
  component: ComposedTooltip,
  title: 'ComposedTooltip',
};
export default meta;
type Story = StoryObj<typeof ComposedTooltip>;

export const Primary = {
  args: {
    trigger: '',
    content: '',
    arrow: false,
  },
};

export const Heading: Story = {
  args: {
    trigger: '',
    content: '',
    arrow: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedTooltip!/gi)).toBeTruthy();
  },
};
