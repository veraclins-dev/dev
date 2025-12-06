import { useEffect, useRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import {
  getOptionLabel,
  getOptionValue,
} from '../../components/input-fields/utils';
import { type Option } from '../../types';
import { Box } from '../box';

import { DIAL_ITEM_PADDING, type Size, type Value } from './definitions';

export interface DialItemProps {
  item: Option;
  onSelect: (ref: HTMLElement, item: Value) => void;
  className?: string;
  value?: Value;
  size?: Size;
}

export function DialItem({
  item,
  onSelect,
  className,
  value,
  size = 'md',
}: DialItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const select = (e: React.MouseEvent<HTMLDivElement>) => {
    onSelect(e.target as HTMLElement, getOptionValue(item));
  };

  useEffect(() => {
    if (value === getOptionValue(item) && ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [value, item]);

  return (
    <Box
      className={cn(
        'cursor-pointer snap-center flex items-center justify-center',
        DIAL_ITEM_PADDING[size],
        className,
      )}
      onClick={select}
      ref={ref}
    >
      {getOptionLabel(item)}
    </Box>
  );
}
