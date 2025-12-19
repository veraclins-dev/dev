import { type Prisma } from '#app/utils/db/db.server';
import {
  type ViolationType,
  type ViolationSeverity,
  type QueuePriority,
  type QueueStatus,
} from '#app/utils/db/enums';
import {
  type ViolationSchema,
  type QueueItemSchema,
} from '#app/utils/moderation/validations.ts';
import { type z } from '#app/validations/index.ts';

export type ViolationInput = z.infer<typeof ViolationSchema>;
export type QueueItemInput = z.infer<typeof QueueItemSchema>;

export type ViolationWithUser = Prisma.UserViolationGetPayload<{
  include: { user: true; auditLog: true };
}>;

export type QueueItemWithAssignee = Prisma.ModerationQueueGetPayload<{
  include: { assignee: true; resolver: true };
}>;

export interface ThresholdConfig {
  autoHideThreshold: number;
  queueThreshold: number;
  combinationMultiplier?: number;
}

export type {
  ViolationType,
  ViolationSeverity,
  QueuePriority,
  QueueStatus,
};
