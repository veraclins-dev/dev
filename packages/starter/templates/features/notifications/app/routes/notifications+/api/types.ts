import { type getUserNotifications } from '#app/utils/notifications/notifications.server';

export type Notifications = Awaited<
  ReturnType<typeof getUserNotifications>
>['page']['items'];

export type Notification = Notifications[0];

export type NotificationTab = 'all' | 'unread';

export enum NotificationAction {
  read = 'read',
  dismiss = 'dismiss',
}
