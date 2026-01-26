import { type Prisma } from '../db/db.server';
import { type Notification } from '../db/types';

export type NotificationWithActivity = Prisma.NotificationGetPayload<{
  include: {
    activity: {
      include: {
        actor: { select: { id: true; username: true; profileImage: true } };
      };
    };
  };
}>;

export type NotificationInput = {
  receiverId: string;
  activityId: string;
};

export type UpdateNotificationInput =
  | { isRead: boolean; dismissed?: boolean }
  | { isRead?: boolean; dismissed: boolean };

export type { Notification };
