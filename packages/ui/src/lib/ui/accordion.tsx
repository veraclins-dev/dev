import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef } from 'react';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    align?: 'left' | 'right';
  }
>(({ className, children, align = 'right', ...props }, ref) => (
  <AccordionPrimitive.Header className={cn('flex text-xl', className)}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center gap-x-2 font-medium transition-all',
        align === 'left'
          ? '[&[data-state=open]>svg]:rotate-90'
          : 'flex-row-reverse justify-between [&[data-state=open]>svg]:rotate-180',
      )}
      data-align={align}
      {...props}
    >
      <Icon name={align === 'left' ? 'chevron-right' : 'chevron-down'} />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:hidden data-[state=open]:flex text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
