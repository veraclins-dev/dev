import { badRequest } from '@veraclins-dev/react-utils/server';

import { db, Prisma } from '../db/db.server';
import { type Report } from '../db/types';
import { createAuditLog } from '../logs/logs.server';

import { type ReportInput } from './types';

export async function reportContent(
  input: ReportInput & { reporterId: string },
): Promise<Report> {
  try {
    return db.$transaction(async (tx) => {
      const report = await tx.report.create({
        data: {
          category: input.category,
          entityType: input.entityType,
          entityId: input.entityId,
          reporterId: input.reporterId,
          reason: input.reason,
          details: input.details,
          status: 'pending',
        },
      });

      await createAuditLog(
        {
          action: 'report',
          entityType: input.entityType,
          entityId: input.entityId,
          actorId: input.reporterId,
          role: 'member',
          actionSource: 'user',
          details: {},
        },
        tx,
      );

      return report;
    });
  } catch (error) {
    if (
      error instanceof Response ||
      (error && typeof error === 'object' && 'status' in error)
    ) {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw badRequest('You have already reported this content');
      }
      throw badRequest('Failed to create report');
    }

    console.error('Error creating report:', error);
    throw badRequest('Failed to create report');
  }
}
