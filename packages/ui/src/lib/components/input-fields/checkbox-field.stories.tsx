import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CheckboxField } from './checkbox-field';

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
  title: 'Components/CheckboxField',
};
export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Primary = {
  args: {
    field: '',
    label: '',
    labelProps: '',
    inputClassName: '',
  },
};

export const Heading: Story = {
  args: {
    label: '',
    inputClassName: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CheckboxField!/gi)).toBeTruthy();
  },
};
