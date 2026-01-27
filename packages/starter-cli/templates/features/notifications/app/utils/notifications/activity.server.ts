import { db, type Prisma } from '../db/db.server';

export interface CreateActivityInput {
  type: string;
  targetId: string;
  targetType: string;
  target: string;
  targetLink: string;
  actorId: string;
  receiverId?: string | null;
  groupId?: string | null;
  tags?: string[];
}

export interface CreateActivityWithNotificationsInput
  extends CreateActivityInput {
  notifyUserIds?: string[];
}

export async function createActivity(
  input: CreateActivityInput,
  tx?: Prisma.TransactionClient
) {
  const dbClient = tx || db;

  return dbClient.activity.create({
    data: {
      type: input.type,
      targetId: input.targetId,
      targetType: input.targetType,
      target: input.target,
      targetLink: input.targetLink,
      actorId: input.actorId,
      receiverId: input.receiverId,
      groupId: input.groupId,
      tags: input.tags ?? [],
    },
  });
}

export async function createActivityWithNotifications(
  input: CreateActivityWithNotificationsInput,
  tx?: Prisma.TransactionClient
) {
  const activity = await createActivity(input, tx);

  const notifyUserIds = input.notifyUserIds ?? [];
  if (input.receiverId && input.receiverId !== input.actorId) {
    notifyUserIds.push(input.receiverId);
  }

  const uniqueNotifyUserIds = Array.from(new Set(notifyUserIds));

  if (uniqueNotifyUserIds.length > 0) {
    await createNotificationsForActivity(
      uniqueNotifyUserIds.map((receiverId) => ({
        receiverId,
        activityId: activity.id,
      })),
      tx
    );
  }

  return activity;
}

async function createNotificationsForActivity(
  inputs: Array<{ receiverId: string; activityId: string }>,
  tx?: Prisma.TransactionClient
) {
  if (inputs.length === 0) return { count: 0 };

  const dbClient = tx || db;

  return dbClient.notification.createMany({
    data: inputs,
    skipDuplicates: true,
  });
}
