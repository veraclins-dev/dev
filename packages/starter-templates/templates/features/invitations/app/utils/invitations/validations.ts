import {
  InvitationStatus,
  InvitationType,
} from '#generated/prisma/client';
import { z } from '#app/validations/index';

export const CreateInvitationSchema = z.object({
  entityType: z.string().min(1, 'Entity type is required'),
  entityId: z.string().min(1, 'Entity ID is required'),
  inviteeId: z.string().min(1, 'Invitee ID is required'),
  inviterId: z.string().optional(),
  type: z.nativeEnum(InvitationType).optional(),
});

export const UpdateInvitationSchema = z.object({
  invitationId: z.string().min(1, 'Invitation ID is required'),
  status: z.nativeEnum(InvitationStatus),
});

export const InvitationActionSchema = z.object({
  invitationId: z.string().min(1, 'Invitation ID is required'),
  action: z.enum(['accept', 'decline', 'cancel', 'approve', 'reject']),
});
