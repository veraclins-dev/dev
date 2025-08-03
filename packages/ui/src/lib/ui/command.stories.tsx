import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';
import { Icon } from './icon';

const meta: Meta<typeof Command> = {
  component: Command,
  title: 'Base/Command',
};
export default meta;
type Story = StoryObj<typeof Command>;

export const Primary: Story = {
  args: {},
  render: () => {
    return (
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icon name="calendar" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Icon name="face-smile" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Icon name="calculator" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Icon name="user" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="credit-card" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="cog" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

export const Heading: Story = {
  args: {},
  render: () => {
    return (
      <Command>
        <CommandInput
          className="w-full"
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icon name="calendar" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Icon name="face-smile" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Icon name="calculator" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Icon name="user" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="credit-card" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="cog" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Command!/gi)).toBeTruthy();
  },
};
