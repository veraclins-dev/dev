import { useCallback } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  type ButtonProps,
  ComposedDropdownMenu,
  Icon,
  type IconName,
  ITEM_CLASSES,
  Link,
} from '@veraclins-dev/ui';
import { cn, createMarkup } from '@veraclins-dev/utils';

interface NotificationDetailProps {
  notification: any;
  onClick?: () => void;
}

interface ActivityProps {
  message: string | undefined;
  target: string;
  profileImage: string | null | undefined;
  createdAt: Date | string;
  isRead?: boolean;
  showTime?: boolean;
}

const Activity = ({
  message,
  target,
  profileImage,
  createdAt,
  isRead,
  showTime,
}: ActivityProps) => {
  let iconType: Extract<
    IconName,
    'user-circle' | 'group' | 'file-text' | 'info'
  >;
  if (target === 'profile') {
    iconType = 'user-circle';
  } else if (target === 'group') {
    iconType = 'group';
  } else if (['question', 'answer'].includes(target)) {
    iconType = 'file-text';
  } else {
    iconType = 'info';
  }

  return (
    <>
      <div className="relative h-14 w-14">
        {/* <Avatar size={14} src={profileImage} alt="Actor Image" /> */}
        <Avatar className="size-10">
          <AvatarImage src={profileImage || ''} alt="Actor Image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar className="absolute -bottom-1 -right-1">
          <AvatarImage src={profileImage || ''} alt="Actor Image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="relative flex h-fit flex-1 flex-col gap-1">
        <p
          className={cn(
            'line-clamp-2',
            isRead ? 'font-light' : 'font-semibold',
          )}
          // skipcq: JS-0440
          dangerouslySetInnerHTML={createMarkup(message)}
        />
        <p className="first-letter:uppercase">{createdAt.toString()}</p>
      </div>
    </>
  );
};

const ActivityLink = ({
  children,
  targetLink,
  onClick,
}: {
  children: React.ReactNode;
  targetLink: string | undefined;
  onClick?: () => void;
}) => {
  return (
    <Link
      className={cn(
        'group relative flex items-center justify-start gap-3 rounded-md border-b-0 px-2 py-2',
        ITEM_CLASSES,
      )}
      href={targetLink ? targetLink : ''}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const ActionTrigger = ({
  className,
  ...props
}: ButtonProps & {
  className?: string;
}) => (
  <Button
    {...props}
    className={cn(
      'items-center justify-center rounded-full p-1 align-middle',
      className,
    )}
    tooltip="Manage"
    onClick={(e) => e.stopPropagation()}
  >
    <Icon name="dots-horizontal" size="md" />
  </Button>
);

const ActionItem = (props: ButtonProps) => {
  const handleClick: ButtonProps['onClick'] = (e) => {
    e.stopPropagation();
    props.onClick?.(e);
  };
  return (
    <Button
      {...props}
      onClick={handleClick}
      variant="plain"
      className={cn(ITEM_CLASSES, 'flex w-full justify-start px-2')}
    />
  );
};

const Actions = ({
  notificationId,
  isRead,
}: {
  notificationId: any['id'];
  isRead: any['isRead'];
}) => {
  // const fetcher = useCustomFetcher();

  // const submit = useCallback(
  //   (action: NotificationAction) =>
  //     fetcher.submit(
  //       { action, notificationId },
  //       { method: 'post', action: '/notifications' },
  //     ),
  //   [],
  // );

  return (
    <ComposedDropdownMenu
      Trigger={ActionTrigger}
      TriggerProps={{
        className: 'hidden group-hover:inline-block bg-card-inner',
      }}
      items={[
        {
          Component: ActionItem,
          ComponentProps: {
            children: 'Dismiss',

            // onClick: () => submit(NotificationAction.dismiss),
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
                  // onClick: () => submit(NotificationAction.read),
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
  onClick,
}: NotificationDetailProps) => {
  // const fetcher = useCustomFetcher();

  // const submit = useCallback(
  //   (action: NotificationAction) =>
  //     fetcher.submit(
  //       { action, notificationId: notification.id },
  //       { method: 'post', action: '/notifications' },
  //     ),
  //   [],
  // );

  // const handleClick = () => {
  //   onClick?.();

  //   if (!notification.isRead) return submit(NotificationAction.read);
  //   return null;
  // };

  return (
    <ActivityLink
      targetLink={notification.activity.targetLink}
      // onClick={handleClick}
    >
      <Activity
        message={notification.message}
        target={notification.activity.targetType}
        profileImage={notification.activity.actor.profileImage}
        createdAt={notification.createdAt}
        isRead={notification.isRead}
      />

      <Actions notificationId={notification.id} isRead={notification.isRead} />
      {!notification.isRead && (
        <span className="bg-primary flex h-3 w-3 self-center rounded-full" />
      )}
    </ActivityLink>
  );
};
