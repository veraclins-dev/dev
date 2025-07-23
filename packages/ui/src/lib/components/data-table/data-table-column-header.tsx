import { type Column } from '@tanstack/react-table';

import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Typography,
} from '../../ui';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <Box className={className}>{title}</Box>;
  }

  return (
    <Box display="flex" items="center" gap={2} className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="text"
            buttonSize="sm"
            className="-ml-3 h-8 data-[state=open]:bg-neutral"
          >
            <Typography variant="body1">{title}</Typography>
            {column.getIsSorted() === 'desc' ? (
              <Icon name="chevron-down" />
            ) : column.getIsSorted() === 'asc' ? (
              <Icon name="chevron-up" />
            ) : (
              <Icon name="chevron-up-down" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icon name="arrow-up" className="h-3.5 w-3.5" />
            <Typography variant="body1">Asc</Typography>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icon name="arrow-down" className="h-3.5 w-3.5" />
            <Typography variant="body1">Desc</Typography>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <Icon name="eye-none" className="h-3.5 w-3.5" />
            <Typography variant="body1">Clear</Typography>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
}
