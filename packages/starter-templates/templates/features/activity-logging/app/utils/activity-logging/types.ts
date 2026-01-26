import { type Prisma } from '../db/db.server';
import { type AuditLog } from '../db/types';

export type AuditLogWithActor = Prisma.AuditLogGetPayload<{
  include: {
    actor: {
      select: {
        id: true;
        username: true;
        name: true;
        profileImage: true;
      };
    };
  };
}>;

export type GetAuditLogsInput = Pick<
  Prisma.AuditLogFindManyArgs,
  'where' | 'orderBy' | 'skip' | 'take'
>;

export interface GetAuditLogsOptions {
  entityType?: string;
  entityId?: string;
  actorId?: string;
  action?: string;
  role?: string;
  groupId?: string;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  take?: number;
  orderBy?: Prisma.AuditLogOrderByWithRelationInput;
}

export type { AuditLog };
