import { type z } from '../../validations/index';
import { type Prisma } from '../db/db.server';
import {
  type QueuePriority,
  type QueueStatus,
  type ViolationSeverity,
  type ViolationType,
} from '../db/enums';

import {
  type QueueItemSchema,
  type ViolationSchema,
} from './validations';

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
  QueuePriority,
  QueueStatus,
  ViolationSeverity,
  ViolationType,
};
