import type { Preview } from '@storybook/react';

import '../public/css/styles.css';

import { IconProvider } from '../src';
export const tags = ['autodocs'];

const preview: Preview = {
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story) => {
      return (
        <IconProvider sprite="/icons/sprite.svg">
          <Story />
        </IconProvider>
      );
    },
  ],
  parameters: {
    options: {
      storySort: {
        // order: ['Base', 'Components', 'Utilities'],
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
