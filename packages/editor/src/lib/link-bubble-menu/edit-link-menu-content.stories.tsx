import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { EditLinkMenuContent } from './edit-link-menu-content';

const meta: Meta<typeof EditLinkMenuContent> = {
  component: EditLinkMenuContent,
  title: 'EditLinkMenuContent',
  argTypes: {
    onCancel: { action: 'onCancel executed!' },
    onSave: { action: 'onSave executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof EditLinkMenuContent>;

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
    expect(canvas.getByText(/Welcome to EditLinkMenuContent!/gi)).toBeTruthy();
  },
};
