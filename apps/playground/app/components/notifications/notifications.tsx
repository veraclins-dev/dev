import { useCallback, useMemo } from 'react';

import { Button } from '@veraclins-dev/ui';

import { Notification } from './notification';

type NotificationsProps = {
  notifications: any[];
  onTabChange: (tab: any) => void;
  activeTab: any;
  onClick?: () => void;
};

interface ShowNotificationProps {
  notifications: any[];
  title: string;
  onClick?: () => void;
}

export const ShowNotification = ({
  notifications,
  title,
  onClick,
}: ShowNotificationProps) => {
  return notifications.length ? (
    <div className="flex flex-col overflow-y-auto">
      <p className="text-lg font-semibold">{title}</p>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <Notification
            onClick={onClick}
            notification={notification}
            key={notification.id}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export const Notifications = ({
  notifications,
  activeTab,
  onTabChange,
  onClick,
}: NotificationsProps) => {
  const { latest, earlier } = useMemo(() => {
    return notifications.reduce(
      (acc, notification) => {
        if (notification.createdAt) {
          acc.latest.push(notification);
        } else {
          acc.earlier.push(notification);
        }
        return acc;
      },
      {
        latest: [] as any[],
        earlier: [] as any[],
      },
    );
  }, [notifications]);

  const changeTab = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, tab: any) => {
      e.stopPropagation();
      onTabChange(tab);
    },
    [],
  );

  const noNotification = !latest.length && !earlier.length;

  return (
    <>
      <h3 className="text-lg font-semibold">Notifications</h3>
      <div className="flex gap-2">
        <Button className={''} onClick={(e) => changeTab(e, 'all')}>
          All
        </Button>
        <Button className={''} onClick={(e) => changeTab(e, 'unread')}>
          Unread
        </Button>
      </div>
      {noNotification ? (
        <div className="flex min-h-96 flex-col gap-4">
          <p className="text-lg font-semibold">No notifications</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto">
          <ShowNotification
            onClick={onClick}
            notifications={latest}
            title="New"
          />
          <ShowNotification
            onClick={onClick}
            notifications={earlier}
            title="Earlier"
          />
        </div>
      )}
    </>
  );
};
