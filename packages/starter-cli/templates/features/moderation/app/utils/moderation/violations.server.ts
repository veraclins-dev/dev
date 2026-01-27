import { db, paginate,type Prisma } from '../db/db.server';
import {
  type ViolationType,
} from '../db/enums';

import { VIOLATION_POINTS } from './constants';
import { type ViolationInput } from './types';

export interface CreateViolationInput extends ViolationInput {
  expiresAt?: Date | null;
}

export async function createViolation(input: CreateViolationInput) {
  const points =
    input.points || VIOLATION_POINTS[input.severity] || VIOLATION_POINTS.p2_moderate;

  return db.userViolation.create({
    data: {
      userId: input.userId,
      violationType: input.violationType,
      severity: input.severity,
      points,
      description: input.description,
      entityType: input.entityType,
      entityId: input.entityId,
      auditLogId: input.auditLogId,
      expiresAt: input.expiresAt,
    },
  });
}

export async function getUserViolations(options: {
  userId: string;
  violationType?: ViolationType;
  includeDecayed?: boolean;
  skip?: number;
  take?: number;
}) {
  const {
    userId,
    violationType,
    includeDecayed = false,
    skip = 0,
    take = 50,
  } = options;

  const where: Prisma.UserViolationWhereInput = {
    userId,
    ...(violationType && { violationType }),
    ...(includeDecayed
      ? {}
      : {
          OR: [
            { decayedAt: null },
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        }),
  };

  return paginate({
    skip,
    take,
    count: () => db.userViolation.count({ where }),
    query: (paginateArgs) =>
      db.userViolation.findMany({
        ...paginateArgs,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, username: true } },
          auditLog: true,
        },
      }),
  });
}

export async function getUserViolationScore(userId: string): Promise<number> {
  const violations = await db.userViolation.findMany({
    where: {
      userId,
      OR: [
        { decayedAt: null },
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
    select: { points: true },
  });

  return violations.reduce((total, violation) => total + violation.points, 0);
}

export async function decayViolations() {
  const now = new Date();
  const decayThreshold = new Date(
    now.getTime() - 90 * 24 * 60 * 60 * 1000
  );

  const result = await db.userViolation.updateMany({
    where: {
      expiresAt: { lte: decayThreshold },
      decayedAt: null,
    },
    data: {
      decayedAt: now,
    },
  });

  return result.count;
}
