import { type reportContent } from '#app/utils/reports/report.server.ts';
import { type ReportSchema } from '#app/utils/reports/validations.ts';
import { type z } from '#app/validations/index.ts';

export type ReportInput = z.infer<typeof ReportSchema>;
export type ReportResult = Awaited<ReturnType<typeof reportContent>>;
