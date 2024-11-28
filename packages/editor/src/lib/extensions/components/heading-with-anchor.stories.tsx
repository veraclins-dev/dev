import type { Meta, StoryObj } from '@storybook/react';
import { HeadingWithAnchorComponent } from './heading-with-anchor';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof HeadingWithAnchorComponent> = {
  component: HeadingWithAnchorComponent,
  title: 'HeadingWithAnchorComponent',
};
export default meta;
type Story = StoryObj<typeof HeadingWithAnchorComponent>;

export const Primary = {
  args: {
    node: '',
    extension: '',
  },
};

export const Heading: Story = {
  args: {
    node: '',
    extension: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to HeadingWithAnchorComponent!/gi),
    ).toBeTruthy();
  },
};
