import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { InfiniteLoader } from '#app/components/infinite-loader';
import {
  type Notifications as NotificationsLogType,
  type NotificationTab,
} from '#app/routes/notifications+/api/types';
import { UpdateNotificationSchema } from '#app/routes/notifications+/api/validations.server';
import { Notifications } from '#app/routes/notifications+/components/notifications';
import { getPaginationParams } from '#app/utils';
import {
  getUserNotifications,
  updateNotification,
} from '#app/utils/notifications/notifications.server';
import { getUserId, requireUserId } from '#app/utils/auth/auth.server';
import { getPageTitle } from '#app/utils/misc';
import { type Route } from './+types/_index';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('tab');
  const isDropdown = url.searchParams.get('dropdown');

  const userId = await getUserId(request, context);

  if (!userId) {
    return {
      page: {
        items: [] as NotificationsLogType,
        count: 0,
        nextPage: null,
        hasMore: false,
      },
      unreadCount: 0,
      url,
    };
  }

  const pageParams = {
    ...getPaginationParams(url.searchParams),
    ...(isDropdown && { take: 10 }),
  };

  const { page, unreadCount } = await getUserNotifications({
    receiverId: userId,
    isRead: query === 'unread' ? false : undefined,
    ...pageParams,
  });

  return {
    page,
    unreadCount,
    url,
  };
};

export async function action({ request, context }: Route.ActionArgs) {
  const userId = await requireUserId(request, context);
  const submission = await processForm({
    request,
    schema: UpdateNotificationSchema,
  });

  if (submission.status !== 'success') {
    return formSubmissionErrors(submission);
  }

  const { action, notificationId } = submission.value;

  switch (action) {
    case 'read':
      await updateNotification({
        id: notificationId,
        data: { isRead: true },
        userId,
      });
      break;
    case 'dismiss':
      await updateNotification({
        id: notificationId,
        data: { dismissed: true },
        userId,
      });
      break;
    default:
      return { errors: { message: 'Invalid action' } };
  }

  return {};
}

export const meta: Route.MetaFunction = () => [
  { title: getPageTitle('Notifications') },
];

export default function NotificationsPage({
  loaderData: {
    page: { items, nextPage, hasMore },
    url,
  },
}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = (searchParams.get('tab') ?? 'all') as NotificationTab;

  const [notifications, setNotifications] = useState(items);

  const setTab = (tab: NotificationTab) => {
    if (tab === 'all') {
      searchParams.delete('tab');
      return setSearchParams(searchParams);
    }

    return setSearchParams({ tab });
  };

  return (
    <InfiniteLoader
      url={url.toString()}
      items={notifications}
      updateItems={setNotifications}
      pageData={{ ...nextPage, hasMore }}
    >
      <Notifications
        activeTab={tab}
        notifications={notifications}
        onTabChange={setTab}
        setNotifications={setNotifications}
      />
    </InfiniteLoader>
  );
}
