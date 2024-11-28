import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionList } from './suggestion-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SuggestionList> = {
  component: SuggestionList,
  title: 'SuggestionList',
};
export default meta;
type Story = StoryObj<typeof SuggestionList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SuggestionList!/gi)).toBeTruthy();
  },
};
