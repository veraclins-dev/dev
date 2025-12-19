import { db } from '#app/utils/db/db.server';
import { rateLimit } from '#app/utils/rate-limit.server';
import { ReportSchema } from '#app/utils/reports/validations';
import { z } from '#app/validations/index.ts';

export function createReportSchemaWithCheck(reporterId: string) {
  return ReportSchema.transform(async (data, ctx) => {
    try {
      await rateLimit({
        key: `report:${reporterId}`,
        limit: 10,
        window: 3600,
      });
    } catch {
      ctx.issues.push({
        code: 'custom',
        message: 'You have made too many reports. Please try again later.',
        input: '',
      });
      return z.NEVER;
    }

    const [reporter, existingReport] = await Promise.all([
      db.user.findUnique({
        where: { id: reporterId },
        select: { suspendedAt: true },
      }),
      db.report.findFirst({
        where: {
          entityType: data.entityType,
          entityId: data.entityId,
          reporterId,
          status: { in: ['pending', 'aggregated', 'queued'] },
        },
      }),
    ]);

    if (reporter?.suspendedAt) {
      ctx.issues.push({
        code: 'custom',
        message: 'Suspended users cannot make a report.',
        input: '',
      });
      return z.NEVER;
    }

    if (existingReport) {
      ctx.issues.push({
        code: 'custom',
        message: 'You have already reported this content',
        input: '',
      });
      return z.NEVER;
    }

    return data;
  });
}
