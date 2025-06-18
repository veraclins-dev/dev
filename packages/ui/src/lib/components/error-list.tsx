import { Typography } from '../ui';
import { List } from '../ui/list';
import { ListItem } from '../ui/list-item';

import { type useFieldProperties } from './input-fields';

interface ErrorListProps {
  errors?: ReturnType<typeof useFieldProperties>['errors'];
  id?: string;
}

export const ErrorList = ({ errors, id }: ErrorListProps) => {
  if (!errors?.length) {
    return null;
  }

  return (
    <List
      id={id}
      role="alert"
      aria-live="polite"
      className="list-none pl-0 -mt-1 text-destructive"
    >
      {errors.map((error, index) => (
        <ListItem key={index}>
          <Typography className="text-destructive" variant="caption">
            {error}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};
