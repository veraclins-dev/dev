import { z } from '../../../validations/index';

const action = ['read', 'dismiss'] as const;

export const UpdateNotificationSchema = z.object({
  notificationId: z.string(),
  action: z.enum(action),
});
