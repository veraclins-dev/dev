import { PAGE_DATA_DEFAULTS } from '../constants';
import { db, paginate, type Prisma } from '../db/db.server';

import {
  type GetAuditLogsInput,
  type GetAuditLogsOptions,
} from './types';

export async function getAuditLogs(
  input: GetAuditLogsInput,
  tx?: Prisma.TransactionClient
) {
  const dbInstance = tx || db;
  return paginate({
    skip: input.skip ?? PAGE_DATA_DEFAULTS.skip,
    take: input.take ?? PAGE_DATA_DEFAULTS.take,
    count: () => dbInstance.auditLog.count({ where: input.where }),
    query: (paginateArgs) =>
      dbInstance.auditLog.findMany({
        ...paginateArgs,
        where: input.where,
        orderBy: input.orderBy ?? { createdAt: 'desc' },
        include: {
          actor: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
        },
      }),
  });
}

export async function getAuditLogsByOptions(
  options: GetAuditLogsOptions,
  tx?: Prisma.TransactionClient
) {
  const {
    entityType,
    entityId,
    actorId,
    action,
    role,
    groupId,
    startDate,
    endDate,
    skip = PAGE_DATA_DEFAULTS.skip,
    take = PAGE_DATA_DEFAULTS.take,
    orderBy = { createdAt: 'desc' },
  } = options;

  const where: Prisma.AuditLogWhereInput = {};

  if (entityType) {
    where.entityType = entityType;
  }

  if (entityId) {
    where.entityId = entityId;
  }

  if (actorId) {
    where.actorId = actorId;
  }

  if (action) {
    where.action = action;
  }

  if (role) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where.role = role as any;
  }

  if (groupId) {
    where.groupId = groupId;
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = startDate;
    }
    if (endDate) {
      where.createdAt.lte = endDate;
    }
  }

  return getAuditLogs(
    {
      where,
      orderBy,
      skip,
      take,
    },
    tx
  );
}

export async function getEntityAuditLogs(
  entityType: string,
  entityId: string,
  options?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput;
  },
  tx?: Prisma.TransactionClient
) {
  return getAuditLogsByOptions(
    {
      entityType,
      entityId,
      ...options,
    },
    tx
  );
}

export async function getUserAuditLogs(
  userId: string,
  options?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput;
  },
  tx?: Prisma.TransactionClient
) {
  return getAuditLogsByOptions(
    {
      actorId: userId,
      ...options,
    },
    tx
  );
}

export async function getGroupAuditLogs(
  groupId: string,
  options?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput;
  },
  tx?: Prisma.TransactionClient
) {
  return getAuditLogsByOptions(
    {
      groupId,
      ...options,
    },
    tx
  );
}

export async function cleanupExpiredLogs(tx?: Prisma.TransactionClient) {
  const dbInstance = tx || db;
  const now = new Date();

  const result = await dbInstance.auditLog.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });

  return {
    deletedCount: result.count,
    timestamp: now,
  };
}
