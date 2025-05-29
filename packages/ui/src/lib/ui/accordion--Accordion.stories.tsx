import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Base/Accordion',
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const Multiple: Story = {
  args: {},
  render: (args) => {
    return (
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What are the key considerations when implementing a comprehensive
            enterprise-level authentication system?
          </AccordionTrigger>
          <AccordionContent>
            Implementing a robust enterprise authentication system requires
            careful consideration of multiple factors. This includes secure
            password hashing and storage, multi-factor authentication (MFA)
            implementation, session management, OAuth2 and SSO integration,
            regular security audits, rate limiting to prevent brute force
            attacks, and maintaining detailed audit logs. Additionally,
            you&apos;ll need to consider scalability, performance impact, and
            compliance with relevant data protection regulations such as GDPR or
            HIPAA.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How does modern distributed system architecture handle eventual
            consistency and data synchronization across multiple regions?
          </AccordionTrigger>
          <AccordionContent>
            Modern distributed systems employ various strategies to maintain
            data consistency across regions. This often involves using
            techniques like CRDT (Conflict-Free Replicated Data Types), vector
            clocks, and gossip protocols. Systems might implement event sourcing
            or use message queues to ensure that changes are propagated across
            nodes in a consistent manner.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Accordion!/gi)).toBeTruthy();
  },
};

export const MultipleLeftAligned: Story = {
  args: {},
  render: (args) => {
    return (
      <Accordion type="multiple" className="w-full" align="left">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What are the key considerations when implementing a comprehensive
            enterprise-level authentication system?
          </AccordionTrigger>
          <AccordionContent>
            Implementing a robust enterprise authentication system requires
            careful consideration of multiple factors. This includes secure
            password hashing and storage, multi-factor authentication (MFA)
            implementation, session management, OAuth2 and SSO integration,
            regular security audits, rate limiting to prevent brute force
            attacks, and maintaining detailed audit logs. Additionally,
            you&apos;ll need to consider scalability, performance impact, and
            compliance with relevant data protection regulations such as GDPR or
            HIPAA.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How does modern distributed system architecture handle eventual
            consistency and data synchronization across multiple regions?
          </AccordionTrigger>
          <AccordionContent>
            Modern distributed systems employ various strategies to maintain
            data consistency across regions. This often involves using
            techniques like CRDT (Conflict-Free Replicated Data Types), vector
            clocks, and gossip protocols. Systems might implement event sourcing
            or use message queues to ensure that changes are propagated across
            nodes in a consistent manner.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(
        /What are the key considerations when implementing a comprehensive enterprise-level authentication system?/gi,
      ),
    ).toBeTruthy();
  },
};
