import {
  Box,
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@veraclins-dev/ui';

import { NotificationDropdown } from './notifications/notification-dropdown';
import { Notifications } from './notifications/notifications';
import { notifications } from './data';

export const Dialogs = () => {
  return (
    <Box flexDirection="row" gap={4}>
      <NotificationDropdown />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent
          className="text-foreground main-height flex max-h-screen min-w-96 flex-col gap-y-3 p-3"
          align="start"
        >
          <Notifications
            activeTab={'all'}
            notifications={notifications}
            onTabChange={() => {
              console.log('Tab changed');
            }}
            onClick={() => {
              console.log('Notification clicked');
            }}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
};
