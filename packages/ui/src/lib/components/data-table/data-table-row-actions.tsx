import { type Row } from '@tanstack/react-table';

import { cn, type NonEmptyArray } from '@veraclins-dev/utils';

import { Button, type ButtonProps } from '../../ui/button';
import { ComposedDropdownMenu, type ItemOption } from '../../ui/dropdown-menu';
import { Icon } from '../../ui/icon';

import { type WithId } from './types';

type Action<TData extends WithId> = ItemOption & {
  onActionClick: (row: Row<TData>) => void;
};

type Actions<TData extends WithId> = NonEmptyArray<Action<TData>>;
interface DataTableRowActionsProps<TData extends WithId> {
  actions: Actions<TData>;
  row: Row<TData>;
}

const ActionButton = ({ className, ...props }: ButtonProps) => (
  <Button
    variant="text"
    className={cn('flex h-8 w-8 p-0 data-[state=open]:bg-neutral', className)}
    {...props}
  />
);

function DataTableRowActions<TData extends WithId>({
  actions,
  row,
}: DataTableRowActionsProps<TData>) {
  const mappedActions = actions.map(({ onActionClick, ...action }) => ({
    ...action,
    onClick: onActionClick ? () => onActionClick(row) : undefined,
  }));
  return (
    <ComposedDropdownMenu
      Trigger={ActionButton}
      TriggerProps={{
        children: (
          <>
            <Icon name="dots-horizontal" />
            <span className="sr-only">Open action menu</span>
          </>
        ),
      }}
      items={mappedActions}
    />
  );
}

export { type Actions, DataTableRowActions, type DataTableRowActionsProps };
