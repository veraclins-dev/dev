import { cn } from '@veraclins-dev/utils';

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

interface ErrorListProps {
  errors?: ListOfErrors;
  id?: string;
  className?: string;
  errorItemClassName?: string;
}

export function ErrorList({
  id,
  errors,
  className,
  errorItemClassName,
}: ErrorListProps) {
  console.log('ErrorListProps:', { id, errors, className, errorItemClassName });
  const errorsToRender = (errors ?? []).filter(Boolean);
  return errorsToRender.length ? (
    <ul id={id} className={cn('flex flex-col gap-1', className)}>
      {errorsToRender.map((e) => (
        <li key={e} className={cn('text-sm text-red-500', errorItemClassName)}>
          {e}
        </li>
      ))}
    </ul>
  ) : null;
}
