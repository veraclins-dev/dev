import {
  ViolationType,
  ViolationSeverity,
  QueuePriority,
} from '#app/utils/db/enums';
import { z } from '#app/validations/index.ts';

export const ViolationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  violationType: z.nativeEnum(ViolationType, {
    errorMap: () => ({ message: 'Please select a valid violation type.' }),
  }),
  severity: z.nativeEnum(ViolationSeverity, {
    errorMap: () => ({ message: 'Please select a valid severity level.' }),
  }),
  points: z.number().int().positive('Points must be a positive integer'),
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  auditLogId: z.string().optional(),
});

export const QueueItemSchema = z.object({
  entityType: z.string().min(1, 'Entity type is required'),
  entityId: z.string().min(1, 'Entity ID is required'),
  priority: z.nativeEnum(QueuePriority, {
    errorMap: () => ({ message: 'Please select a valid priority level.' }),
  }),
  category: z.string().optional(),
  reason: z.string().optional(),
});
