import { type Prisma } from '../../db/db.server';
import {
  type InvitationStatus,
  type InvitationType,
} from '../../db/enums';

export type InvitationWithRelations = Prisma.InvitationGetPayload<{
  include: {
    invitee: {
      select: {
        id: true;
        username: true;
        name: true;
        profileImage: true;
      };
    };
    inviter: {
      select: {
        id: true;
        username: true;
        name: true;
        profileImage: true;
      };
    };
  };
}>;

export interface CreateInvitationInput {
  entityType: string;
  entityId: string;
  inviteeId: string;
  inviterId?: string;
  type?: InvitationType;
  status?: InvitationStatus;
}

export interface UpdateInvitationInput {
  status: InvitationStatus;
}

export type { InvitationStatus, InvitationType };
