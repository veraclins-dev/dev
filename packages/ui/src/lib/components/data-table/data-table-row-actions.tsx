import { cn } from '@veraclins-dev/utils';

import {
  ButtonBase as Button,
  type ButtonBaseProps,
  ComposedDropdownMenu,
  type ComposedDropdownMenuProps,
  Icon,
} from '../../ui';

export interface DataTableRowActionsProps<T extends object> {
  actions: ComposedDropdownMenuProps<T>['items'];
}

const ActionButton = ({ className, ...props }: ButtonBaseProps) => (
  <Button
    variant="ghost"
    className={cn('flex h-8 w-8 p-0 data-[state=open]:bg-muted', className)}
    {...props}
  />
);

export function DataTableRowActions<T extends object>({
  actions,
}: DataTableRowActionsProps<T>) {
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
      items={actions}
    />
  );
}
