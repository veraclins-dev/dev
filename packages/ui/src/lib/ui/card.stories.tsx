import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Button } from './button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Base/Card',
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <Card className="bg-card-inner">
        <CardHeader>
          <CardTitle>Meeting Notes</CardTitle>
          <CardDescription>
            Transcript from the meeting with the client.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            Client requested dashboard redesign with focus on mobile
            responsiveness.
          </p>
          <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
            <li>New analytics widgets for daily/weekly metrics</li>
            <li>Simplified navigation menu</li>
            <li>Dark mode support</li>
            <li>Timeline: 6 weeks</li>
            <li>Follow-up meeting scheduled for next Tuesday</li>
          </ol>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="outline">Cancel</Button>
            <Button color="primary">Save</Button>
          </CardAction>
        </CardFooter>
      </Card>
    );
  },
};

export const HeaderWithFooter: Story = {
  args: {},
  render: (args) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Header + Footer</CardTitle>
          <CardDescription>
            This is a card with a header and a footer.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">Content</CardContent>
        <CardFooter className="text-sm">Footer</CardFooter>
      </Card>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Header + Footer/gi)).toBeTruthy();
  },
};
