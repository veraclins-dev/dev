import { type getUserInvitations } from '../../../utils/invitations/invitations.server';

export type Invitations = Awaited<
  ReturnType<typeof getUserInvitations>
>['items'];

export type Invitation = Invitations[0];

export type InvitationTab = 'all' | 'pending' | 'accepted';
