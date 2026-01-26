import { type reportContent } from './report.server';
import { type ReportSchema } from './validations';
import { z } from '../../validations/index';

export type ReportInput = z.infer<typeof ReportSchema>;
export type ReportResult = Awaited<ReturnType<typeof reportContent>>;
