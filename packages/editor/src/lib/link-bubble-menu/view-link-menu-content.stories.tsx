import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ViewLinkMenuContent } from './view-link-menu-content';

const meta: Meta<typeof ViewLinkMenuContent> = {
  component: ViewLinkMenuContent,
  title: 'ViewLinkMenuContent',
  argTypes: {
    onCancel: { action: 'onCancel executed!' },
    onEdit: { action: 'onEdit executed!' },
    onRemove: { action: 'onRemove executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof ViewLinkMenuContent>;

export const Primary = {
  args: {
    editor: '',
    labels: '',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ViewLinkMenuContent!/gi)).toBeTruthy();
  },
};
