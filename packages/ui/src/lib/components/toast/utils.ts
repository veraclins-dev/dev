import { generateCUID, z } from '@veraclins-dev/utils';

export const toastKey = 'toast';

const TypeSchema = z.enum(['message', 'success', 'error']);

export const ToastSchema = z.object({
  description: z.string().optional(),
  id: z
    .string()
    .default(() => generateCUID())
    .optional(),
  title: z.string().optional(),
  type: TypeSchema.default('message'),
});

export type Toast = z.infer<typeof ToastSchema>;

export type ToastInput = z.input<typeof ToastSchema>;
