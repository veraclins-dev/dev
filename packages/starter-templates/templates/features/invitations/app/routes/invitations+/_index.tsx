import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server';

import { InfiniteLoader } from '#app/components/infinite-loader';
import { getPaginationParams } from '#app/utils';
import { getUserId, requireUserId } from '#app/utils/auth/auth.server';
import { db } from '#app/utils/db/db.server';
import { InvitationStatus } from '#generated/prisma/client';
import {
  acceptInvitation,
  cancelRequest,
  declineInvitation,
  getUserInvitations,
} from '#app/utils/invitations/invitations.server';
import { getPageTitle } from '#app/utils/misc';

import { type Route } from './+types/_index';
import {
  type Invitations as InvitationsLogType,
  type InvitationTab,
} from './api/types';
import { InvitationActionServerSchema } from './api/validations.server';
import { Invitations } from '#app/components/invitations/invitations';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('tab');
  const isDropdown = url.searchParams.get('dropdown');

  const userId = await getUserId(request, context);

  if (!userId) {
    return {
      page: {
        items: [] as InvitationsLogType,
        count: 0,
        nextPage: null,
        hasMore: false,
      },
      url,
    };
  }

  const pageParams = {
    ...getPaginationParams(url.searchParams),
    ...(isDropdown && { take: 10 }),
  };

  let status: InvitationStatus[] | undefined;
  if (query === 'pending') {
    status = [InvitationStatus.invited, InvitationStatus.requested];
  } else if (query === 'accepted') {
    status = [InvitationStatus.accepted];
  }

  const { items, hasMore, nextPage, count } = await getUserInvitations({
    userId,
    status,
    ...pageParams,
  });

  return {
    page: {
      items,
      nextPage,
      hasMore,
      count,
    },
    url,
  };
};

export async function action({ request, context }: Route.ActionArgs) {
  const userId = await requireUserId(request, context);
  const submission = await processForm({
    request,
    schema: InvitationActionServerSchema,
  });

  if (submission.status !== 'success') {
    return formSubmissionErrors(submission);
  }

  const { action, invitationId } = submission.value;

  const invitation = await db.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    return { errors: { message: 'Invitation not found' } };
  }

  switch (action) {
    case 'accept':
      await acceptInvitation(
        invitation.entityType,
        invitation.entityId,
        userId,
      );
      break;
    case 'decline':
      await declineInvitation(
        invitation.entityType,
        invitation.entityId,
        userId,
      );
      break;
    case 'cancel':
      await cancelRequest(invitation.entityType, invitation.entityId, userId);
      break;
    default:
      return { errors: { message: 'Invalid action' } };
  }

  return {};
}

export const meta: Route.MetaFunction = () => [
  { title: getPageTitle('Invitations') },
];

export default function InvitationsPage({
  loaderData: {
    page: { items, nextPage, hasMore },
    url,
  },
}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = (searchParams.get('tab') ?? 'all') as InvitationTab;

  const [invitations, setInvitations] = useState(items);

  const setTab = (tab: InvitationTab) => {
    if (tab === 'all') {
      searchParams.delete('tab');
      return setSearchParams(searchParams);
    }

    return setSearchParams({ tab });
  };

  return (
    <InfiniteLoader
      url={url.toString()}
      items={invitations}
      updateItems={setInvitations}
      pageData={{ ...nextPage, hasMore }}
    >
      <Invitations
        activeTab={tab}
        invitations={invitations}
        onTabChange={setTab}
        setInvitations={setInvitations}
      />
    </InfiniteLoader>
  );
}
