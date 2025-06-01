import { useEffect, useMemo, useState } from 'react';

import { Button, ComposedPopover, Icon, Link } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { notifications } from '../data';

import { Notifications } from './notifications';

const NotificationTrigger = ({
  count,
  className,
  ...props
}: {
  count: number | string;
  className?: string;
}) => (
  <Button
    className={cn(
      'relative w-fit cursor-pointer p-0 focus:ring-0 focus:ring-offset-0',
      className,
    )}
    {...props}
    aria-label="open-notification"
    variant="plain"
  >
    <Icon name="notification" className="size-9" />
    {count ? (
      <p className="bg-destructive absolute -top-1 -right-3 z-10 flex h-6 w-7 items-center justify-center rounded-full text-xs font-semibold text-gray-50">
        {count}
      </p>
    ) : null}
  </Button>
);

export const NotificationDropdown = ({ className }: { className?: string }) => {
  const [tab, setTab] = useState<string>('all');
  const [open, setOpen] = useState(false);

  const showAll = true;

  return (
    <ComposedPopover
      open={open}
      onOpenChange={setOpen}
      Trigger={NotificationTrigger}
      TriggerProps={{ count: 10, className }}
      className="text-foreground main-height flex max-h-screen min-w-96 flex-col gap-y-3 p-3"
    >
      <Notifications
        activeTab={tab}
        notifications={notifications}
        onTabChange={setTab}
        onClick={() => setOpen(false)}
      />
      {showAll && (
        <Link
          href={`/notifications?tab=${tab}`}
          className="text-primary bg-inherit px-2 text-lg font-semibold"
          onClick={() => setOpen(false)}
        >
          See All
        </Link>
      )}
    </ComposedPopover>
  );
};
