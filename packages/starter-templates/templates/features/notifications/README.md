# Notifications Feature Module

Activity-based notification system that tracks user actions and delivers notifications to relevant users.

## Features

- **Activity Tracking**: Log user actions as activities
- **Notification Delivery**: Automatically create notifications from activities
- **Read/Unread Status**: Track notification read state
- **Dismissal**: Allow users to dismiss notifications
- **Preferences**: User-configurable notification preferences
- **Expiration**: Automatic cleanup of expired notifications

## Schema

This module adds the following to the Prisma schema:

- `Activity` model - Tracks user actions and events
- `Notification` model - User notifications linked to activities
- `NotificationPreference` model - User notification preferences

**Relations added to User model:**
- `activitiesAsActor Activity[] @relation("activitiesAsActor")`
- `receiverActivities Activity[] @relation("receiverActivities")`
- `notifications Notification[]`
- `notificationPreferences NotificationPreference[]`

## Usage

### Create Activity with Notifications

```typescript
import { createActivityWithNotifications } from '#app/utils/notifications/activity.server';

const activity = await createActivityWithNotifications({
  type: 'comment:created',
  targetId: 'post-123',
  targetType: 'post',
  target: 'Post Title',
  targetLink: '/posts/post-123',
  actorId: user.id,
  receiverId: postAuthor.id,
  notifyUserIds: [postAuthor.id, commenter.id], // Additional users to notify
});
```

### Get User Notifications

```typescript
import { getUserNotifications } from '#app/utils/notifications/notifications.server';

const { page, unreadCount } = await getUserNotifications({
  receiverId: user.id,
  isRead: false, // Optional: filter by read status
  skip: 0,
  take: 20,
});
```

### Update Notification

```typescript
import { updateNotification } from '#app/utils/notifications/notifications.server';

// Mark as read
await updateNotification({
  id: notificationId,
  data: { isRead: true },
  userId: user.id,
});

// Dismiss
await updateNotification({
  id: notificationId,
  data: { dismissed: true },
  userId: user.id,
});
```

### Mark All as Read

```typescript
import { markAllAsRead } from '#app/utils/notifications/notifications.server';

await markAllAsRead(user.id);
```

### Get Unread Count

```typescript
import { getUnreadCount } from '#app/utils/notifications/notifications.server';

const count = await getUnreadCount(user.id);
```

## Activity Types

Activities use a flexible string-based type system. Examples:

- `comment:created` - Comment was created
- `post:liked` - Post was liked
- `user:followed` - User was followed
- `group:joined` - User joined a group

You can define your own activity types based on your application's needs.

## Notification Preferences

Users can configure notification preferences per notification type:

```typescript
import { db } from '#app/utils/db/db.server';

await db.notificationPreference.upsert({
  where: {
    userId_type: {
      userId: user.id,
      type: 'email',
    },
  },
  update: {
    disabled: ['comment:created'], // Disable email for comments
  },
  create: {
    userId: user.id,
    type: 'email',
    disabled: ['comment:created'],
  },
});
```

## Dependencies

- Base template (User model)
- Activity components (Activity, ActivityLink, Tabs)
- Empty component
- Card component

## Feature Flag

Enable with: `features.notifications = true`

## Notes

- Activities expire after 1 year (configurable in schema)
- Notifications are automatically created when activities are created
- Notifications can be filtered by read status
- Dismissed notifications are excluded from queries by default
