import {
  conflict,
  forbidden,
  notFound,
} from '@veraclins-dev/react-utils/server';
import { PAGE_DATA_DEFAULTS } from '#app/utils/constants';
import { db, paginate, type Prisma } from '#app/utils/db/db.server';
import {
  InvitationStatus,
  InvitationType,
} from '#app/utils/db/enums';
import {
  type CreateInvitationInput,
  type UpdateInvitationInput,
} from '#app/utils/invitations/types';

export async function createInvitation(input: CreateInvitationInput) {
  const existing = await db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType: input.entityType,
        entityId: input.entityId,
        inviteeId: input.inviteeId,
      },
    },
  });

  if (existing) {
    throw conflict(
      'Invitation',
      'This user has already been invited to this entity'
    );
  }

  return db.invitation.create({
    data: {
      entityType: input.entityType,
      entityId: input.entityId,
      inviteeId: input.inviteeId,
      inviterId: input.inviterId,
      type: input.type ?? InvitationType.member,
      status: input.status ?? InvitationStatus.invited,
    },
  });
}

export async function createInvitations(inputs: CreateInvitationInput[]) {
  const existing = await db.invitation.findMany({
    where: {
      OR: inputs.map((input) => ({
        entityType: input.entityType,
        entityId: input.entityId,
        inviteeId: input.inviteeId,
      })),
    },
  });

  const existingKeys = new Set(
    existing.map(
      (inv) => `${inv.entityType}:${inv.entityId}:${inv.inviteeId}`
    )
  );

  const newInvitations = inputs.filter(
    (input) =>
      !existingKeys.has(`${input.entityType}:${input.entityId}:${input.inviteeId}`)
  );

  if (newInvitations.length === 0) {
    return { count: 0 };
  }

  return db.invitation.createMany({
    data: newInvitations.map((input) => ({
      entityType: input.entityType,
      entityId: input.entityId,
      inviteeId: input.inviteeId,
      inviterId: input.inviterId,
      type: input.type ?? InvitationType.member,
      status: input.status ?? InvitationStatus.invited,
    })),
    skipDuplicates: true,
  });
}

export async function getInvitation(
  entityType: string,
  entityId: string,
  inviteeId: string
) {
  return db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType,
        entityId,
        inviteeId,
      },
    },
    include: {
      invitee: {
        select: {
          id: true,
          username: true,
          name: true,
          profileImage: true,
        },
      },
      inviter: {
        select: {
          id: true,
          username: true,
          name: true,
          profileImage: true,
        },
      },
    },
  });
}

export async function getUserInvitations(options: {
  userId: string;
  status?: InvitationStatus | InvitationStatus[];
  entityType?: string;
  skip?: number;
  take?: number;
}) {
  const {
    userId,
    status,
    entityType,
    skip = PAGE_DATA_DEFAULTS.skip,
    take = PAGE_DATA_DEFAULTS.take,
  } = options;

  const where: Prisma.InvitationWhereInput = {
    inviteeId: userId,
    ...(status && {
      status: Array.isArray(status) ? { in: status } : status,
    }),
    ...(entityType && { entityType }),
  };

  return paginate({
    skip,
    take,
    count: () => db.invitation.count({ where }),
    query: (paginateArgs) =>
      db.invitation.findMany({
        ...paginateArgs,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          invitee: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
          inviter: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
        },
      }),
  });
}

export async function getEntityInvitations(options: {
  entityType: string;
  entityId: string;
  status?: InvitationStatus | InvitationStatus[];
  skip?: number;
  take?: number;
}) {
  const {
    entityType,
    entityId,
    status,
    skip = PAGE_DATA_DEFAULTS.skip,
    take = PAGE_DATA_DEFAULTS.take,
  } = options;

  const where: Prisma.InvitationWhereInput = {
    entityType,
    entityId,
    ...(status && {
      status: Array.isArray(status) ? { in: status } : status,
    }),
  };

  return paginate({
    skip,
    take,
    count: () => db.invitation.count({ where }),
    query: (paginateArgs) =>
      db.invitation.findMany({
        ...paginateArgs,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          invitee: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
          inviter: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
        },
      }),
  });
}

export async function updateInvitation(
  id: string,
  input: UpdateInvitationInput
) {
  return db.invitation.update({
    where: { id },
    data: { status: input.status },
  });
}

export async function acceptInvitation(
  entityType: string,
  entityId: string,
  userId: string
) {
  const invitation = await db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType,
        entityId,
        inviteeId: userId,
      },
    },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'No invitation found for this entity and user.',
    });
  }

  if (invitation.status !== InvitationStatus.invited) {
    throw forbidden('This invitation cannot be accepted in its current state.');
  }

  return db.invitation.update({
    where: { id: invitation.id },
    data: { status: InvitationStatus.accepted },
  });
}

export async function declineInvitation(
  entityType: string,
  entityId: string,
  userId: string
) {
  const invitation = await db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType,
        entityId,
        inviteeId: userId,
      },
    },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'No invitation found for this entity and user.',
    });
  }

  if (invitation.status !== InvitationStatus.invited) {
    throw forbidden('This invitation cannot be declined in its current state.');
  }

  return db.invitation.update({
    where: { id: invitation.id },
    data: { status: InvitationStatus.declined },
  });
}

export async function requestMembership(input: {
  entityType: string;
  entityId: string;
  userId: string;
}) {
  const existing = await db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType: input.entityType,
        entityId: input.entityId,
        inviteeId: input.userId,
      },
    },
  });

  if (existing) {
    throw conflict(
      'Invitation',
      'You have already sent a request or have an invitation for this entity.'
    );
  }

  return db.invitation.create({
    data: {
      entityType: input.entityType,
      entityId: input.entityId,
      inviteeId: input.userId,
      status: InvitationStatus.requested,
      type: InvitationType.member,
    },
  });
}

export async function cancelRequest(
  entityType: string,
  entityId: string,
  userId: string
) {
  const invitation = await db.invitation.findUnique({
    where: {
      entityType_entityId_inviteeId: {
        entityType,
        entityId,
        inviteeId: userId,
      },
    },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'No membership request found.',
    });
  }

  if (invitation.status !== InvitationStatus.requested) {
    throw forbidden('Only pending requests can be cancelled.');
  }

  return db.invitation.delete({
    where: { id: invitation.id },
  });
}

export async function approveRequest(
  invitationId: string,
  approverId: string
) {
  const invitation = await db.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'Invitation not found.',
    });
  }

  if (invitation.status !== InvitationStatus.requested) {
    throw forbidden('Only requested invitations can be approved.');
  }

  return db.invitation.update({
    where: { id: invitationId },
    data: { status: InvitationStatus.accepted },
  });
}

export async function rejectRequest(
  invitationId: string,
  rejectorId: string
) {
  const invitation = await db.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'Invitation not found.',
    });
  }

  if (invitation.status !== InvitationStatus.requested) {
    throw forbidden('Only requested invitations can be rejected.');
  }

  return db.invitation.update({
    where: { id: invitationId },
    data: { status: InvitationStatus.rejected },
  });
}

export async function deleteInvitation(id: string, userId: string) {
  const invitation = await db.invitation.findUnique({
    where: { id },
  });

  if (!invitation) {
    throw notFound('Invitation', {
      message: 'Invitation not found.',
    });
  }

  if (
    invitation.inviterId !== userId &&
    invitation.inviteeId !== userId
  ) {
    throw forbidden('Only the inviter or invitee can delete this invitation.');
  }

  return db.invitation.delete({
    where: { id },
  });
}
