import type { Meta, StoryObj } from '@storybook/react';
import { FieldContainer } from './field-container';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof FieldContainer> = {
  component: FieldContainer,
  title: 'FieldContainer',
};
export default meta;
type Story = StoryObj<typeof FieldContainer>;

export const Primary = {
  args: {
    children: '',
    className: '',
    focused: false,
    disabled: false,
  },
};

export const Heading: Story = {
  args: {
    children: '',
    className: '',
    focused: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to FieldContainer!/gi)).toBeTruthy();
  },
};
