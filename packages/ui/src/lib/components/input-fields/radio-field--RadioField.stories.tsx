import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { RadioField } from './radio-field';

const meta: Meta<typeof RadioField> = {
  component: RadioField,
  title: 'Components/RadioField',
  argTypes: {
    onChange: { action: 'onChange executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof RadioField>;

export const Primary: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: '',
    defaultValue: '',
    shouldReset: false,
  },
};

export const Heading: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: '',
    defaultValue: '',
    shouldReset: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RadioField!/gi)).toBeTruthy();
  },
};
