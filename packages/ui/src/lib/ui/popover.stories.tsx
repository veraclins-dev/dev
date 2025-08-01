import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Box } from './box';
import Button from './button';
import { Icon } from './icon';
import {
  ComposedPopover,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Base/Popover',
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Composition: Story = {
  render: () => (
    <Box display="flex" justify="center" items="center" p={8} pb={24}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Box display="flex" flexDirection="column" gap={2}>
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-neutral-foreground">
              Set the dimensions for the layer.
            </p>
            <Box display="flex" gap={2} mt={2}>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  defaultValue="100%"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="height">
                  Height
                </label>
                <input
                  id="height"
                  defaultValue="25px"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
            </Box>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Open Popover')).toBeTruthy();
  },
};

export const WithArrow: Story = {
  render: () => (
    <Box display="flex" justify="center" items="center" p={8} pb={24}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent arrow>
          <Box display="flex" flexDirection="column" gap={2}>
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-neutral-foreground">
              Set the dimensions for the layer.
            </p>
            <Box display="flex" gap={2} mt={2}>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  defaultValue="100%"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="height">
                  Height
                </label>
                <input
                  id="height"
                  defaultValue="25px"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
            </Box>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Open Popover')).toBeTruthy();
  },
};

export const WithTooltip: Story = {
  render: () => (
    <Box display="flex" justify="center" items="center" p={8} pb={24}>
      <Popover>
        <PopoverTrigger tooltip="Click to open dimensions">
          <Button variant="outline">
            <Icon name="wrench" className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-neutral-foreground">
              Set the dimensions for the layer.
            </p>
            <Box display="flex" gap={2} mt={2}>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="width">
                  Width
                </label>
                <input
                  id="width"
                  defaultValue="100%"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <label className="text-sm" htmlFor="height">
                  Height
                </label>
                <input
                  id="height"
                  defaultValue="25px"
                  className="h-8 w-24 rounded border px-2 text-sm"
                />
              </Box>
            </Box>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('svg')).toBeTruthy();
  },
};

export const Composed: Story = {
  render: () => (
    <Box display="flex" justify="center" items="center" p={8} pb={24}>
      <ComposedPopover
        Trigger={Button}
        TriggerProps={{
          variant: 'outline',
          children: 'Open Popover',
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <h4 className="font-medium">Dimensions</h4>
          <p className="text-sm text-neutral-foreground">
            Set the dimensions for the layer.
          </p>
          <Box display="flex" gap={2} mt={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <label className="text-sm" htmlFor="width">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="h-8 w-24 rounded border px-2 text-sm"
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <label className="text-sm" htmlFor="height">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="h-8 w-24 rounded border px-2 text-sm"
              />
            </Box>
          </Box>
        </Box>
      </ComposedPopover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Open Popover')).toBeTruthy();
  },
};
