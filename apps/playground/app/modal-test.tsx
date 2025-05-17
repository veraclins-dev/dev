import { RadioField } from '@veraclins-dev/ui';

import { ModalDialog } from './dialogs/modal';

interface Props {
  open: boolean;
  onClose: () => void;
  username: string;
  slug: string;
  memberId: string;
}

export const TestModal = ({
  onClose,
  open,
  slug,
  memberId,
  username,
}: Props) => {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onClose}
      confirmButtonProps={{
        children: 'Suspend',
      }}
      title={<p className="text-2xl">Suspend {username}</p>}
    >
      <div className="flex flex-col items-center justify-center space-y-5">
        <p className="flex w-5/6 flex-col space-y-2 text-center text-sm">
          <span className="font-bold text-lg">
            Choose the suspension period
          </span>
          <span>
            While suspended, {username} will be able to view the group, but
            won't be able to post, comment or take other actions during the
            suspension.
          </span>
        </p>
        <input type="hidden" name="slug" value={slug} />

        <input type="hidden" name="action" value="suspendMember" />
        <input type="hidden" name="id" value={memberId} />

        <RadioField
          name="banPeriod"
          // label="Ban period"
          options={[
            { label: 'Ban for 1 day', value: '1' },
            { label: 'Ban for 2 days', value: '2' },
            { label: 'Ban for 1 week', value: '7' },
            { label: 'Ban for 2 weeks', value: '14' },
            { label: 'Ban for 1 month', value: '30' },
          ]}
        />
      </div>
    </ModalDialog>
  );
};
