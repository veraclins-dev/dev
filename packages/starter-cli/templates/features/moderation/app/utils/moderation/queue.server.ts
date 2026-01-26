import { db, Prisma, paginate } from '../db/db.server';
import { type QueueStatus, type QueuePriority } from '../db/enums';
import { type QueueItemInput } from './types';

export interface CreateQueueItemInput extends QueueItemInput {
  category?: string;
}

export interface UpdateQueueItemInput {
  status?: QueueStatus;
  assigneeId?: string | null;
  priority?: QueuePriority;
  resolution?: string;
  resolverId?: string;
}

export async function createQueueItem(input: CreateQueueItemInput) {
  return db.moderationQueue.create({
    data: {
      entityType: input.entityType,
      entityId: input.entityId,
      priority: input.priority,
      category: input.category,
      status: 'pending',
    },
  });
}

export async function getQueueItems(options: {
  status?: QueueStatus;
  priority?: QueuePriority;
  assigneeId?: string;
  skip?: number;
  take?: number;
} = {}) {
  const { status, priority, assigneeId, skip = 0, take = 50 } = options;

  const where: Prisma.ModerationQueueWhereInput = {
    ...(status && { status }),
    ...(priority && { priority }),
    ...(assigneeId && { assigneeId }),
  };

  return paginate({
    skip,
    take,
    count: () => db.moderationQueue.count({ where }),
    query: (paginateArgs) =>
      db.moderationQueue.findMany({
        ...paginateArgs,
        where,
        orderBy: [
          { priority: 'asc' },
          { createdAt: 'asc' },
        ],
        include: {
          assignee: { select: { id: true, username: true } },
          resolver: { select: { id: true, username: true } },
        },
      }),
  });
}

export async function updateQueueItem(
  id: string,
  input: UpdateQueueItemInput
) {
  const updateData: Prisma.ModerationQueueUpdateInput = {};

  if (input.status !== undefined) {
    updateData.status = input.status;
    if (input.status === 'assigned' && input.assigneeId) {
      updateData.assigneeId = input.assigneeId;
      updateData.assignedAt = new Date();
    }
    if (input.status === 'resolved' && input.resolverId) {
      updateData.resolverId = input.resolverId;
      updateData.resolvedAt = new Date();
    }
  }

  if (input.assigneeId !== undefined) {
    updateData.assigneeId = input.assigneeId;
    updateData.assignedAt = input.assigneeId ? new Date() : null;
  }

  if (input.priority !== undefined) {
    updateData.priority = input.priority;
  }

  if (input.resolution !== undefined) {
    updateData.resolution = input.resolution;
  }

  return db.moderationQueue.update({
    where: { id },
    data: updateData,
  });
}

export async function assignQueueItem(itemId: string, assigneeId: string) {
  return updateQueueItem(itemId, {
    status: 'assigned',
    assigneeId,
  });
}

export async function resolveQueueItem(
  itemId: string,
  resolverId: string,
  resolution?: string
) {
  return updateQueueItem(itemId, {
    status: 'resolved',
    resolverId,
    resolution,
  });
}
