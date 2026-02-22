import { useCallback } from 'react';

import { useCustomFetcher } from '@veraclins-dev/form';
import { Box, Button, Typography } from '@veraclins-dev/ui';

import { type Invitation as InvitationType } from '#app/routes/invitations+/api/types';
import { InvitationStatus } from '#generated/prisma/client';
import { Loader } from '#app/components/loader';

type InvitationId = InvitationType['id'];

interface InvitationDetailProps {
  invitation: InvitationType;
  onClick?: () => void;
  onRemove: (id: InvitationId) => void;
}

export const Invitation = ({
  invitation,
  onClick: _onClick,
  onRemove: _onRemove,
}: InvitationDetailProps) => {
  const fetcher = useCustomFetcher();

  const submit = useCallback(
    (action: 'accept' | 'decline' | 'cancel') =>
      fetcher.submit(
        { action, invitationId: invitation.id },
        {
          method: 'post',
          action: '/invitations',
        },
      ),
    [invitation.id, fetcher],
  );

  const handleAccept = () => submit('accept');
  const handleDecline = () => submit('decline');
  const handleCancel = () => submit('cancel');

  const loading = fetcher.state !== 'idle';

  const canAccept =
    invitation.status === InvitationStatus.invited ||
    invitation.status === InvitationStatus.requested;
  const canDecline = invitation.status === InvitationStatus.invited;
  const canCancel = invitation.status === InvitationStatus.requested;

  return (
    <Box
      display="flex"
      justify="between"
      items="center"
      gap={3}
      className="group/invitation relative p-4 rounded-lg border border-border hover:bg-card-inner transition-colors"
    >
      <Box display="flex" flexDirection="column" gap={2} className="flex-1">
        <Typography variant="h6">{invitation.entityType} Invitation</Typography>
        {invitation.inviter && (
          <Typography className="text-foreground/80">
            Invited by {invitation.inviter.name || invitation.inviter.username}
          </Typography>
        )}
        <Typography className="text-foreground/60 text-sm">
          Status: {invitation.status}
        </Typography>
      </Box>
      <Box display="flex" items="center" gapX={2}>
        {canAccept && (
          <Button
            variant="solid"
            color="primary"
            onClick={handleAccept}
            disabled={loading}
          >
            Accept
            {loading && <Loader />}
          </Button>
        )}
        {canDecline && (
          <Button variant="outline" onClick={handleDecline} disabled={loading}>
            Decline
            {loading && <Loader />}
          </Button>
        )}
        {canCancel && (
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
            {loading && <Loader />}
          </Button>
        )}
      </Box>
    </Box>
  );
};
