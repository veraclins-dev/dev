import { z } from './index.ts';

const RESOURCE_TYPE = [
  'question',
  'answer',
  'comment',
  'group',
  'member',
] as const;

export const DeleteResourceSchema = z
  .object({
    resource: z.enum(RESOURCE_TYPE),
    id: z.string(),
    groupId: z.string().optional(),
  })
  .refine(
    (data) => data.resource !== 'group' && data.groupId,
    () => {
      return {
        message: 'groupId is required',
        path: ['groupId'],
      };
    },
  );
