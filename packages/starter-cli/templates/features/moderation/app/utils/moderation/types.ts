import { type Prisma } from '../db/db.server';
import {
  type ViolationType,
  type ViolationSeverity,
  type QueuePriority,
  type QueueStatus,
} from '../db/enums';
import {
  type ViolationSchema,
  type QueueItemSchema,
} from './validations';
import { z } from '../../validations/index';

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
