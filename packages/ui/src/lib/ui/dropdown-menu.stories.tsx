import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import Button from './button';
import {
  ComposedDropdownMenu,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Icon } from './icon';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'Base/DropdownMenu',
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Composition: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuArrow />
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem checked>
            Show Toolbar
            <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Show Statusbar</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="pedro">
          <DropdownMenuRadioItem value="pedro">Pedro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="colm">Colm</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            More Tools
            <Icon name="chevron-right" className="ml-auto size-4" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Save As...</DropdownMenuItem>
            <DropdownMenuItem>Export...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share...</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Open Menu')).toBeTruthy();
  },
};

export const Composed: Story = {
  render: () => (
    <ComposedDropdownMenu
      Trigger={Button}
      TriggerProps={{
        variant: 'outline',
        children: 'Open Menu',
      }}
      items={[
        {
          key: 'profile',
          label: 'Profile',
          shortcutKeys: ['⇧', '⌘', 'P'],
        },
        {
          key: 'billing',
          label: 'Billing',
          shortcutKeys: ['⌘', 'B'],
        },
        {
          key: 'settings',
          label: 'Settings',
          shortcutKeys: ['⌘', 'S'],
        },
        {
          key: 'separator-1',
          Component: DropdownMenuSeparator,
          ComponentProps: {},
        },
        {
          key: 'show-toolbar',
          Component: DropdownMenuCheckboxItem,
          ComponentProps: {
            checked: true,
            children: 'Show Toolbar',
          },
          shortcutKeys: ['⌘', 'T'],
        },
        {
          key: 'show-statusbar',
          Component: DropdownMenuCheckboxItem,
          ComponentProps: {
            children: 'Show Statusbar',
          },
        },
        {
          key: 'separator-2',
          Component: DropdownMenuSeparator,
          ComponentProps: {},
        },
        {
          key: 'radio-group',
          Component: DropdownMenuRadioGroup,
          ComponentProps: {
            value: 'pedro',
            children: (
              <>
                <DropdownMenuRadioItem value="pedro">
                  Pedro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="colm">Colm</DropdownMenuRadioItem>
              </>
            ),
          },
        },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Open Menu')).toBeTruthy();
  },
};
