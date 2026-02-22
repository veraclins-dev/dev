import { forbidden, notFound } from '@veraclins-dev/react-utils/server';

import { PAGE_DATA_DEFAULTS } from '#app/utils/constants';
import { db, paginate, type Prisma } from '#app/utils/db/db.server';
import { type User } from '#app/utils/db/types';
import { type Notification } from '#generated/prisma/client';

import { type NotificationInput, type UpdateNotificationInput } from './types';

type GetNotificationsInput = Pick<
  Prisma.NotificationFindManyArgs,
  'skip' | 'take'
> & {
  isRead?: Notification['isRead'];
  receiverId: Notification['receiverId'];
};

export const getUserNotifications = async ({
  receiverId,
  skip = PAGE_DATA_DEFAULTS.skip,
  take = PAGE_DATA_DEFAULTS.take,
  isRead,
}: GetNotificationsInput) => {
  const where: Prisma.NotificationWhereInput = {
    receiverId,
    dismissed: {
      not: true,
    },
    ...(isRead !== undefined && { isRead }),
  };

  const [{ items, hasMore, nextPage, count }, unreadCount] = await Promise.all([
    paginate({
      skip,
      take,
      count: () => db.notification.count({ where }),
      query: (paginateArgs) =>
        db.notification.findMany({
          ...paginateArgs,
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            activity: {
              include: {
                actor: {
                  select: { id: true, username: true, profileImage: true },
                },
              },
            },
          },
        }),
    }),
    db.notification.count({
      where: { ...where, isRead: false },
    }),
  ]);

  return {
    page: {
      items,
      nextPage,
      hasMore,
      count,
    },
    unreadCount,
  };
};

export const createNotification = async (input: NotificationInput) => {
  return db.notification.create({
    data: {
      receiverId: input.receiverId,
      activityId: input.activityId,
    },
  });
};

export const createNotifications = async (inputs: NotificationInput[]) => {
  if (inputs.length === 0) return { count: 0 };

  return db.notification.createMany({
    data: inputs,
    skipDuplicates: true,
  });
};

export const updateNotification = async ({
  id,
  data,
  userId,
}: {
  id: Notification['id'];
  data: UpdateNotificationInput;
  userId: User['id'];
}) => {
  const existing = await db.notification.findFirst({
    where: { id },
  });

  if (!existing) {
    throw notFound('Notification', {
      message: 'No such notification found. Please try again',
    });
  }

  if (existing.receiverId !== userId) {
    throw forbidden(
      'Only the receiver can mark this notification as read or dismiss it.',
    );
  }

  return db.notification.update({
    where: { id, receiverId: userId },
    data,
  });
};

export const markAllAsRead = async (receiverId: string) => {
  return db.notification.updateMany({
    where: {
      receiverId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const getUnreadCount = async (receiverId: string): Promise<number> => {
  return db.notification.count({
    where: {
      receiverId,
      isRead: false,
      dismissed: false,
    },
  });
};
