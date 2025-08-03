import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Box } from './box';
import Button from './button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Icon } from './icon';

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  title: 'Base/HoverCard',
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Composition: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="text">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <Box display="flex" justify="between" gap={4}>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Box display="flex" flexDirection="column" gap={1}>
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <Box display="flex" items="center" gap={2} mt={1}>
              <Icon
                name="calendar"
                className="text-neutral-foreground size-4"
              />
              <span className="text-neutral-foreground text-xs">
                Joined December 2021
              </span>
            </Box>
          </Box>
        </Box>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('@nextjs')).toBeTruthy();
  },
};

export const WithCustomSide: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="text">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="right">
        <Box display="flex" justify="between" gap={4}>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Box display="flex" flexDirection="column" gap={1}>
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <Box display="flex" items="center" gap={2} mt={1}>
              <Icon
                name="calendar"
                className="text-neutral-foreground size-4"
              />
              <span className="text-neutral-foreground text-xs">
                Joined December 2021
              </span>
            </Box>
          </Box>
        </Box>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('@nextjs')).toBeTruthy();
  },
};
