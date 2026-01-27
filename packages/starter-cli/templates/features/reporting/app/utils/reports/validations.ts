import { ReportCategory } from '../../db/enums';
import { z } from '../../validations/index';

import { isValidCategoryForEntity } from './category-mapping';

export const ReportSchema = z
  .object({
    category: z.nativeEnum(ReportCategory, {
      errorMap: () => ({ message: 'Please select a valid category.' }),
    }),
    entityType: z.string().min(1, 'Entity type is required'),
    entityId: z.string().min(1, 'Entity ID is required'),
    reason: z.string().optional(),
    details: z.record(z.string(), z.unknown()).optional(),
  })
  .refine((data) => isValidCategoryForEntity(data.category, data.entityType), {
    message: 'This category is not valid for the selected entity type.',
    path: ['category'],
  });
