import { type z } from '../../validations/index';

import { type reportContent } from './report.server';
import { type ReportSchema } from './validations';

export type ReportInput = z.infer<typeof ReportSchema>;
export type ReportResult = Awaited<ReturnType<typeof reportContent>>;
