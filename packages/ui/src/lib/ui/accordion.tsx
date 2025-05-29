import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

function Accordion({
  align = 'right',
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  align?: 'left' | 'right';
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-align={align}
      className={cn('group', className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-state="closed"
      className={className}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className={cn('flex text-xl', className)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 text-left items-center gap-x-3 font-medium transition-all',
          'group-data-[align=left]:[&[data-state=closed]>svg]:-rotate-90 group-data-[align=right]:flex-row-reverse group-data-[align=right]:justify-between group-data-[align=right]:[&[data-state=open]>svg]:rotate-180',
        )}
        {...props}
      >
        <Icon name="chevron-down" />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden data-[state=closed]:hidden data-[state=open]:flex text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
