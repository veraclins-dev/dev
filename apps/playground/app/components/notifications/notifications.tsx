import { useCallback, useMemo } from 'react';

import { Box, Button, Typography } from '@veraclins-dev/ui';

import { Notification } from './notification';

interface NotificationItem {
  id: string;
  isRead: boolean;
  message: string;
  target: string;
  profileImage?: string | null;
  createdAt: Date | string;
  targetLink?: string;
}

type NotificationsProps = {
  notifications: NotificationItem[];
  onTabChange: (tab: string) => void;
  activeTab: string;
  onClick?: () => void;
};

interface ShowNotificationProps {
  notifications: NotificationItem[];
  title: string;
  onClick?: () => void;
}

export const ShowNotification = ({
  notifications,
  title,
  onClick,
}: ShowNotificationProps) => {
  return notifications.length ? (
    <Box display="flex" flexDirection="column" className="overflow-y-auto">
      <Typography variant="h5" className="font-semibold">
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {notifications.map((notification) => (
          <Notification
            onClick={onClick}
            notification={notification}
            key={notification.id}
          />
        ))}
      </Box>
    </Box>
  ) : null;
};

export const Notifications = ({
  notifications,
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
        latest: [] as NotificationItem[],
        earlier: [] as NotificationItem[],
      },
    );
  }, [notifications]);

  const changeTab = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, tab: string) => {
      e.stopPropagation();
      onTabChange(tab);
    },
    [],
  );

  const noNotification = !latest.length && !earlier.length;

  return (
    <>
      <Typography variant="h5" className="font-semibold">
        Notifications
      </Typography>
      <Box display="flex" gap={2}>
        <Button className={''} onClick={(e) => changeTab(e, 'all')}>
          All
        </Button>
        <Button className={''} onClick={(e) => changeTab(e, 'unread')}>
          Unread
        </Button>
      </Box>
      {noNotification ? (
        <Box display="flex" flexDirection="column" gap={4} className="min-h-96">
          <Typography variant="h5" className="font-semibold">
            No notifications
          </Typography>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          className="overflow-y-auto"
        >
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
        </Box>
      )}
    </>
  );
};
