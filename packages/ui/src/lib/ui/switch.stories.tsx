import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Base/Switch',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    expect(switchElement).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    expect(switchElement).toBeDisabled();
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toBeChecked();
  },
};

export const Interactive: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');

    // Initially unchecked
    expect(switchElement).not.toBeChecked();

    // Click to check
    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    // Click to uncheck
    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane mode
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    const label = canvas.getByText('Airplane mode');

    expect(switchElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('id', 'airplane-mode');
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="notifications"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Push notifications
        </label>
        <p className="text-sm text-muted-foreground">
          Receive notifications about new messages.
        </p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch');
    const label = canvas.getByText('Push notifications');
    const description = canvas.getByText(
      'Receive notifications about new messages.',
    );

    expect(switchElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  },
};

export const MultipleSwitches: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="wifi" defaultChecked />
        <label htmlFor="wifi" className="text-sm font-medium leading-none">
          Wi-Fi
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="bluetooth" />
        <label htmlFor="bluetooth" className="text-sm font-medium leading-none">
          Bluetooth
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="location" defaultChecked />
        <label htmlFor="location" className="text-sm font-medium leading-none">
          Location Services
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="notifications" disabled />
        <label
          htmlFor="notifications"
          className="text-sm font-medium leading-none text-muted-foreground"
        >
          Notifications (Disabled)
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const wifiSwitch = canvas.getByRole('switch', { name: /wi-fi/i });
    const bluetoothSwitch = canvas.getByRole('switch', { name: /bluetooth/i });
    const locationSwitch = canvas.getByRole('switch', {
      name: /location services/i,
    });
    const notificationsSwitch = canvas.getByRole('switch', {
      name: /notifications/i,
    });

    expect(wifiSwitch).toBeChecked();
    expect(bluetoothSwitch).not.toBeChecked();
    expect(locationSwitch).toBeChecked();
    expect(notificationsSwitch).toBeDisabled();
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your privacy preferences and data sharing settings.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Analytics</label>
            <p className="text-sm text-muted-foreground">
              Allow us to collect usage data to improve our service.
            </p>
          </div>
          <Switch id="analytics" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Marketing</label>
            <p className="text-sm text-muted-foreground">
              Receive promotional emails and offers.
            </p>
          </div>
          <Switch id="marketing" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Third-party data</label>
            <p className="text-sm text-muted-foreground">
              Allow third-party services to access your data.
            </p>
          </div>
          <Switch id="third-party" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium text-muted-foreground">
              Location tracking
            </label>
            <p className="text-sm text-muted-foreground">
              Track your location for personalized content.
            </p>
          </div>
          <Switch id="location" disabled />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Privacy Settings')).toBeInTheDocument();
    expect(canvas.getByText('Analytics')).toBeInTheDocument();
    expect(canvas.getByText('Marketing')).toBeInTheDocument();
    expect(canvas.getByText('Third-party data')).toBeInTheDocument();
    expect(canvas.getByText('Location tracking')).toBeInTheDocument();

    const marketingSwitch = canvas.getByRole('switch', { name: /marketing/i });
    expect(marketingSwitch).toBeChecked();

    const locationSwitch = canvas.getByRole('switch', {
      name: /location tracking/i,
    });
    expect(locationSwitch).toBeDisabled();
  },
};

export const FormIntegration: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="terms" required />
        <label htmlFor="terms" className="text-sm font-medium leading-none">
          I agree to the terms and conditions
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="newsletter" />
        <label
          htmlFor="newsletter"
          className="text-sm font-medium leading-none"
        >
          Subscribe to our newsletter
        </label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Submit
      </button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const termsSwitch = canvas.getByRole('switch', {
      name: /i agree to the terms/i,
    });
    const newsletterSwitch = canvas.getByRole('switch', {
      name: /subscribe to our newsletter/i,
    });
    const submitButton = canvas.getByRole('button', { name: /submit/i });

    expect(termsSwitch).toBeInTheDocument();
    expect(newsletterSwitch).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Test form interaction
    await userEvent.click(termsSwitch);
    expect(termsSwitch).toBeChecked();
  },
};
