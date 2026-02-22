import { useCallback, useMemo } from 'react';

import { Box, Typography } from '@veraclins-dev/ui';

import {
  type Invitation as InvitationType,
  type InvitationTab,
} from '#app/routes/invitations+/api/types';
import { Invitation } from './invitation';
import { InvitationStatus } from '#generated/prisma/client';
import { Tabs } from '#app/components/activity/tabs';
import { Card } from '#app/components/card';
import { Empty } from '#app/components/empty';

type InvitationsProps = {
  invitations: InvitationType[];
  onTabChange: (tab: InvitationTab) => void;
  activeTab: InvitationTab;
  onClick?: () => void;
  className?: string;
  plain?: boolean;
  setInvitations?: React.Dispatch<React.SetStateAction<InvitationType[]>>;
};

interface ShowInvitationsProps {
  invitations: InvitationType[];
  title: string;
  onClick?: () => void;
  onRemove: (id: InvitationType['id']) => void;
}

export const ShowInvitations = ({
  invitations,
  title,
  onClick,
  onRemove,
}: ShowInvitationsProps) => {
  return invitations.length ? (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">{title}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {invitations.map((invitation) => (
          <Invitation
            onClick={onClick}
            invitation={invitation}
            key={invitation.id}
            onRemove={onRemove}
          />
        ))}
      </Box>
    </Box>
  ) : null;
};

export const Invitations = ({
  invitations,
  activeTab,
  onTabChange,
  onClick,
  className,
  plain,
  setInvitations,
}: InvitationsProps) => {
  const onRemove = useCallback(
    (id: InvitationType['id']) => {
      setInvitations?.((prev) => prev.filter((item) => item.id !== id));
    },
    [setInvitations],
  );

  const { pending, accepted } = useMemo(() => {
    return invitations.reduce(
      (acc, invitation) => {
        if (
          invitation.status === InvitationStatus.invited ||
          invitation.status === InvitationStatus.requested
        ) {
          acc.pending.push(invitation);
        } else if (invitation.status === InvitationStatus.accepted) {
          acc.accepted.push(invitation);
        }
        return acc;
      },
      {
        pending: [] as InvitationType[],
        accepted: [] as InvitationType[],
      },
    );
  }, [invitations]);

  const noInvitations = !pending.length && !accepted.length;

  return (
    <>
      <Tabs
        tabs={['all', 'pending', 'accepted']}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className={className}
        heading="Invitations"
        plain={plain}
      />
      {noInvitations ? (
        <Empty
          title="No invitations"
          message="You have not received any invitations yet"
          elevated={false}
        />
      ) : plain ? (
        <Box display="flex" flexDirection="column" gap={2} overflowY="auto">
          <ShowInvitations
            onClick={onClick}
            invitations={pending}
            title="Pending"
            onRemove={onRemove}
          />
          <ShowInvitations
            onClick={onClick}
            invitations={accepted}
            title="Accepted"
            onRemove={onRemove}
          />
        </Box>
      ) : (
        <Card className={className}>
          <ShowInvitations
            onClick={onClick}
            invitations={pending}
            title="Pending"
            onRemove={onRemove}
          />
          <ShowInvitations
            onClick={onClick}
            invitations={accepted}
            title="Accepted"
            onRemove={onRemove}
          />
        </Card>
      )}
    </>
  );
};
