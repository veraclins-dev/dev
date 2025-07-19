import React from 'react';

import {
  cn,
  getCurrentTime,
  getTimeStringFromParts,
  type Time,
} from '@veraclins-dev/utils';

import type { Measurable } from '../../types';
import {
  Box,
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  type PopoverContentProps,
  Separator,
} from '..';

import {
  HOURS_12,
  HOURS_24,
  MINUTES,
  NOW_BUTTON_CLASSES,
  PERIODS,
  SECONDS,
  type Size,
  SIZES,
} from './definitions';
import { Dial } from './dial';

export interface TimePopoverProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  time: Time;
  use24Hour: boolean;
  showSeconds: boolean;
  size: Size;
  updateTime: (time: Time) => void;
  contentProps?: PopoverContentProps;
  onClose: () => void;
}

export const TimePopover: React.FC<TimePopoverProps> = ({
  isOpen,
  anchorRef,
  time,
  use24Hour,
  showSeconds,
  size,
  updateTime,
  contentProps,
  onClose,
}) => {
  const hours = use24Hour ? HOURS_24 : HOURS_12;

  const handleNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTime = getCurrentTime({ use24Hour, showSeconds });
    updateTime(currentTime);
  };

  const handleSelect = (key: keyof Time, value: string | number) => {
    const newTime = { ...time, [key]: value };
    newTime.string = getTimeStringFromParts(newTime, use24Hour, showSeconds);

    updateTime(newTime);
  };

  return (
    <Popover open={isOpen}>
      <PopoverAnchor virtualRef={anchorRef as React.RefObject<Measurable>} />
      <PopoverContent
        sideOffset={5}
        arrow
        className={cn('p-0 w-fit', contentProps?.className)}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        {...contentProps}
      >
        <Box className="flex flex-col items-center gap-2">
          <Box className={cn('flex gap-x-0.5 relative', SIZES[size])}>
            <div className="absolute w-full h-10 bg-primary-soft top-1/2 -translate-y-1/2" />

            <Dial
              id="hours-dial"
              items={hours}
              value={time.hr}
              onSelect={(value) => handleSelect('hr', value)}
              size={size}
            />
            <Dial
              id="minutes-dial"
              items={MINUTES}
              value={time.min}
              onSelect={(value) => handleSelect('min', value)}
              size={size}
            />
            {showSeconds && (
              <Dial
                id="seconds-dial"
                items={SECONDS}
                value={time.sec}
                onSelect={(value) => handleSelect('sec', value)}
                size={size}
              />
            )}
            {!use24Hour && (
              <Dial
                id="ampm-dial"
                items={PERIODS}
                value={time.period}
                onSelect={(value) => handleSelect('period', value)}
                size={size}
              />
            )}
          </Box>
          <Separator />
          <Box
            display="flex"
            gapX={4}
            justify="between"
            className="w-full px-2 pb-2"
          >
            <Button
              variant="text"
              color="primary"
              size="sm"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleNowClick}
              className={cn('w-fit', NOW_BUTTON_CLASSES[size])}
            >
              Now
            </Button>
            <Button
              color="primary"
              size="sm"
              onClick={onClose}
              className={cn('w-fit', NOW_BUTTON_CLASSES[size])}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};
