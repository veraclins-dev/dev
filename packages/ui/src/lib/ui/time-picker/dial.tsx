import { useCallback, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@veraclins-dev/react-utils';
import { cn } from '@veraclins-dev/utils';

import { getOptionValue } from '../../components/input-fields/utils';
import { type Option } from '../../types';
import { Box, type BoxProps } from '..';

import { DIAL_CONTAINER_PADDING, type Size, type Value } from './definitions';
import { DialItem } from './dial-item';

type DialProps = {
  onSelect: (value: Value) => void;
  items: Option[];
  value?: Value;
  size?: Size;
} & Omit<BoxProps, 'items' | 'onSelect'>;

export function Dial({
  onSelect,
  value,
  items: dials,
  size = 'md',
}: DialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItem = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(value ?? 0);

  const handleSelect = useDebounce((item: string | number) => {
    onSelect(item);
  }, 100);

  const select = (ref: HTMLElement, item: string | number) => {
    selectedItem.current = ref;
    setSelected(item);
    handleSelect(item);
  };

  const updateActiveItem = useCallback(
    (selected?: Value) => {
      if (!containerRef.current) return;

      // Get container's bounding box
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenterY = containerRect.top + containerRect.height / 2;

      // Get all items
      const items = containerRef.current.querySelectorAll('.cursor-pointer');
      let closestItem: Value = selected ?? 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(containerCenterY - itemCenterY);

        if (distance < minDistance) {
          minDistance = distance;
          const dial = dials[index];
          closestItem = getOptionValue(dial);
        }
      });
      handleSelect(closestItem);
    },
    [dials, handleSelect],
  );

  useEffect(() => {
    const container = containerRef.current;

    const update = () => {
      updateActiveItem(value);
    };

    if (container) {
      container.addEventListener('scroll', update);
    }
    return () => {
      container?.removeEventListener('scroll', update);
    };
  }, [value, updateActiveItem]);

  useEffect(() => {
    if (selectedItem.current) {
      selectedItem.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selected]);

  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      data-slot="scroll-container"
      ref={containerRef}
      className={cn(
        'flex relative flex-col h-full gap-2 flex-1 py-[50%] bg-transparent overflow-y-auto snap-y snap-mandatory',
        DIAL_CONTAINER_PADDING[size],
      )}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
      }}
    >
      {dials.map((dial) => (
        <DialItem
          key={getOptionValue(dial)}
          item={dial}
          onSelect={select}
          value={value}
          size={size}
        />
      ))}
    </Box>
  );
}
