import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@veraclins-dev/utils';

import { Icon } from './icon';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={className}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  align = 'right',
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  align?: 'left' | 'right';
}) {
  <AccordionPrimitive.Header className={cn('flex text-xl', className)}>
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
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
  </AccordionPrimitive.Header>;
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
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
