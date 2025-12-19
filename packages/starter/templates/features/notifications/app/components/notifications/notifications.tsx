import { Box, Typography } from '@veraclins-dev/ui';
import { isThisWeek } from '@veraclins-dev/utils';
import { useCallback, useMemo } from 'react';
import { Tabs } from '#app/components/activity/tabs';
import { Card } from '#app/components/card';
import { Empty } from '#app/components/empty';
import { useOptionalUser } from '#app/hooks/use-user';
import {
  type NotificationTab,
  type Notification as NotificationType,
} from '#app/routes/notifications+/api/types';
import { Notification } from '#app/routes/notifications+/components/notifications/notification';

type NotificationsProps = {
  notifications: NotificationType[];
  onTabChange: (tab: NotificationTab) => void;
  activeTab: NotificationTab;
  onClick?: () => void;
  className?: string;
  plain?: boolean;
  setNotifications?: React.Dispatch<
    React.SetStateAction<NotificationType[]>
  >;
};

interface ShowNotificationProps {
  notifications: NotificationType[];
  title: string;
  onClick?: () => void;
  onDismiss: (id: NotificationType['id']) => void;
}

export const ShowNotification = ({
  notifications,
  title,
  onClick,
  onDismiss,
}: ShowNotificationProps) => {
  const profile = useOptionalUser();

  if (!profile) return null;

  return notifications.length ? (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">{title}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {notifications.map((notification) => (
          <Notification
            onClick={onClick}
            notification={notification}
            key={notification.id}
            username={profile.username}
            onDismiss={onDismiss}
          />
        ))}
      </Box>
    </Box>
  ) : null;
};

export const Notifications = ({
  notifications,
  activeTab,
  onTabChange,
  onClick,
  className,
  plain,
  setNotifications,
}: NotificationsProps) => {
  const onDismiss = useCallback(
    (id: NotificationType['id']) => {
      setNotifications?.((prev) => prev.filter((item) => item.id !== id));
    },
    [setNotifications]
  );

  const { recent, earlier } = useMemo(() => {
    return notifications.reduce(
      (acc, notification) => {
        if (isThisWeek(notification.createdAt)) {
          acc.recent.push(notification);
        } else {
          acc.earlier.push(notification);
        }
        return acc;
      },
      {
        recent: [] as NotificationType[],
        earlier: [] as NotificationType[],
      }
    );
  }, [notifications]);

  const noNotification = !recent.length && !earlier.length;

  return (
    <>
      <Tabs
        tabs={['all', 'unread']}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className={className}
        heading="Notifications"
        plain={plain}
      />
      {noNotification ? (
        <Empty
          title="No notifications"
          message="You have not received any notifications yet"
          elevated={false}
        />
      ) : plain ? (
        <Box display="flex" flexDirection="column" gap={2} overflowY="auto">
          <ShowNotification
            onClick={onClick}
            notifications={recent}
            title="New"
            onDismiss={onDismiss}
          />
          <ShowNotification
            onClick={onClick}
            notifications={earlier}
            title="Earlier"
            onDismiss={onDismiss}
          />
        </Box>
      ) : (
        <Card className={className}>
          <ShowNotification
            onClick={onClick}
            notifications={recent}
            title="New"
            onDismiss={onDismiss}
          />
          <ShowNotification
            onClick={onClick}
            notifications={earlier}
            title="Earlier"
            onDismiss={onDismiss}
          />
        </Card>
      )}
    </>
  );
};
