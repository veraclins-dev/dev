import { useCustomFetcher } from '@veraclins-dev/form';
import { Box, ComposedDropdownMenu } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';
import { useCallback, useEffect } from 'react';
import { ActionItem, Activity, ActivityLink } from '#app/components/activity';
import { MoreButton } from '#app/components/more-button';
import {
  NotificationAction,
  type Notification as NotificationType,
} from '#app/routes/notifications+/api/types';

type NotificationId = NotificationType['id'];

interface NotificationDetailProps {
  notification: NotificationType;
  username: string;
  onClick?: () => void;
  onDismiss: (id: NotificationId) => void;
}

const Actions = ({
  notificationId,
  userId,
  isRead,
  onDismiss,
}: {
  notificationId: NotificationId;
  isRead: NotificationType['isRead'];
  userId: string;
  onDismiss: (id: NotificationId) => void;
}) => {
  const fetcher = useCustomFetcher();

  const submit = useCallback(
    (action: NotificationAction) =>
      fetcher.submit(
        { action, notificationId },
        {
          method: 'post',
          action: '/notifications',
        }
      ),
    [notificationId, fetcher]
  );

  useEffect(() => {
    if (fetcher.loaded) onDismiss(notificationId);
  }, [fetcher.loaded, notificationId, onDismiss]);

  return (
    <ComposedDropdownMenu
      Trigger={MoreButton}
      TriggerProps={{
        className: cn(
          'bg-card-inner invisible absolute top-1/2 right-6 -translate-y-1/2 group-hover/activity:visible data-[state=open]:visible'
        ),
      }}
      items={[
        {
          Component: ActionItem,
          ComponentProps: {
            children: 'Dismiss',
            onClick: () => submit(NotificationAction.dismiss),
          },
          key: 'dismiss',
        },
        ...(isRead
          ? []
          : [
              {
                Component: ActionItem,
                ComponentProps: {
                  children: 'Mark as read',
                  onClick: () => submit(NotificationAction.read),
                },
                key: 'mark-as-read',
              },
            ]),
      ]}
    />
  );
};

export const Notification = ({
  notification,
  username,
  onClick,
  onDismiss,
}: NotificationDetailProps) => {
  const fetcher = useCustomFetcher();

  const submit = useCallback(
    (action: NotificationAction) =>
      fetcher.submit(
        { action, notificationId: notification.id },
        {
          method: 'post',
          action: '/notifications',
        }
      ),
    [notification, fetcher]
  );

  const handleClick = () => {
    onClick?.();

    if (!notification.isRead) return submit(NotificationAction.read);
    return null;
  };

  return (
    <ActivityLink targetLink={notification.activity.targetLink} onClick={handleClick}>
      <Activity
        message={notification.message || notification.activity.target}
        target={notification.activity.targetType}
        profileImage={notification.activity.actor.profileImage}
        createdAt={notification.createdAt}
        isRead={notification.isRead}
      />
      <Actions
        notificationId={notification.id}
        isRead={notification.isRead}
        userId={username}
        onDismiss={onDismiss}
      />
      {!notification.isRead && (
        <Box
          component="span"
          className="bg-primary flex h-3 w-3 self-center rounded-full"
        />
      )}
    </ActivityLink>
  );
};
