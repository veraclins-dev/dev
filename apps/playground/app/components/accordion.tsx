import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Accordions() {
  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Accordion" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Accordion Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Collapsible content sections for organizing information in an
          expandable format.
        </Typography>
      </Box>

      {/* Basic Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Accordion</CardTitle>
          <CardDescription>
            Simple accordion with single and multiple item expansion options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Item Accordion */}
            <Box className="space-y-4">
              <Typography variant="h4">Single Item (Default)</Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is an accordion component?
                  </AccordionTrigger>
                  <AccordionContent>
                    An accordion component is a UI element that allows users to
                    expand and collapse content sections. It's commonly used to
                    organize information in a space-efficient manner, showing
                    only the most relevant content while keeping other sections
                    hidden until needed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    When should I use accordions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Accordions are best used when you have multiple sections of
                    content that users might not need to see all at once.
                    They're great for FAQs, settings panels, navigation menus,
                    and any content that benefits from progressive disclosure.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What are the accessibility considerations?
                  </AccordionTrigger>
                  <AccordionContent>
                    Accordions should use proper ARIA attributes, keyboard
                    navigation support, and screen reader compatibility. The
                    trigger should be focusable, and the expanded state should
                    be clearly communicated to assistive technologies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>

            {/* Multiple Item Accordion */}
            <Box className="space-y-4">
              <Typography variant="h4">Multiple Items</Typography>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Getting Started</AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-2">
                      <Typography>1. Install the component library</Typography>
                      <Typography>
                        2. Import the accordion components
                      </Typography>
                      <Typography>3. Set up your first accordion</Typography>
                      <Typography>
                        4. Customize the styling as needed
                      </Typography>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Advanced Features</AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-2">
                      <Typography>
                        • Custom animations and transitions
                      </Typography>
                      <Typography>• Nested accordion structures</Typography>
                      <Typography>• Programmatic control</Typography>
                      <Typography>• Theme customization</Typography>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Best Practices</AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-2">
                      <Typography>
                        • Keep content concise and focused
                      </Typography>
                      <Typography>
                        • Use clear, descriptive trigger text
                      </Typography>
                      <Typography>
                        • Consider the user's mental model
                      </Typography>
                      <Typography>
                        • Test with keyboard and screen readers
                      </Typography>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accordion with Icons and Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion with Icons and Badges</CardTitle>
          <CardDescription>
            Enhanced accordions with visual indicators and status badges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accordion with Icons */}
            <Box className="space-y-4">
              <Typography variant="h4">With Icons</Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Icon name="user" className="text-neutral-500" />
                    User Profile Settings
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>
                        Manage your personal information, privacy settings, and
                        account preferences.
                      </Typography>
                      <Box className="space-y-2">
                        <Typography>• Personal Information</Typography>
                        <Typography>• Privacy Settings</Typography>
                        <Typography>• Account Security</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Icon name="bell" className="text-neutral-500" />
                    Notification Preferences
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>
                        Configure how and when you receive notifications from
                        the platform.
                      </Typography>
                      <Box className="space-y-2">
                        <Typography>• Email Notifications</Typography>
                        <Typography>• Push Notifications</Typography>
                        <Typography>• SMS Alerts</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Icon name="shield-check" className="text-neutral-500" />
                    Security Settings
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>
                        Manage your account security, two-factor authentication,
                        and login history.
                      </Typography>
                      <Box className="space-y-2">
                        <Typography>• Two-Factor Authentication</Typography>
                        <Typography>• Login History</Typography>
                        <Typography>• Password Management</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>

            {/* Accordion with Badges */}
            <Box className="space-y-4">
              <Typography variant="h4">With Badges</Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span>Inbox</span>
                    <Badge color="destructive">3</Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>
                        You have 3 unread messages in your inbox.
                      </Typography>
                      <Box className="space-y-2">
                        <Typography>• Welcome message from support</Typography>
                        <Typography>• Account verification reminder</Typography>
                        <Typography>• Monthly newsletter</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span>Drafts</span>
                    <Badge color="secondary">1</Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>You have 1 draft message saved.</Typography>
                      <Box className="space-y-2">
                        <Typography>• Unfinished support request</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span>Sent</span>
                    <Badge variant="outline">12</Badge>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box className="space-y-3">
                      <Typography>
                        You have sent 12 messages this month.
                      </Typography>
                      <Box className="space-y-2">
                        <Typography>• Support inquiries</Typography>
                        <Typography>• Feature requests</Typography>
                        <Typography>• General feedback</Typography>
                      </Box>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Nested Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Nested Accordion</CardTitle>
          <CardDescription>
            Accordion with nested content and hierarchical structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Typography variant="h4">Project Documentation</Typography>
            <Accordion type="single" collapsible>
              <AccordionItem value="getting-started">
                <AccordionTrigger>Getting Started</AccordionTrigger>
                <AccordionContent>
                  <Box className="space-y-4">
                    <Typography>
                      Welcome to the project! This section will help you get up
                      and running quickly.
                    </Typography>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="installation">
                        <AccordionTrigger className="text-sm">
                          Installation
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>1. Clone the repository</Typography>
                            <Typography>
                              2. Install dependencies with npm install
                            </Typography>
                            <Typography>
                              3. Set up environment variables
                            </Typography>
                            <Typography>
                              4. Run the development server
                            </Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="configuration">
                        <AccordionTrigger className="text-sm">
                          Configuration
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>• Database setup</Typography>
                            <Typography>• API configuration</Typography>
                            <Typography>• Environment variables</Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="development">
                <AccordionTrigger>Development</AccordionTrigger>
                <AccordionContent>
                  <Box className="space-y-4">
                    <Typography>
                      Learn about the development workflow and best practices.
                    </Typography>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="coding-standards">
                        <AccordionTrigger className="text-sm">
                          Coding Standards
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>• TypeScript guidelines</Typography>
                            <Typography>• Code formatting rules</Typography>
                            <Typography>• Naming conventions</Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="testing">
                        <AccordionTrigger className="text-sm">
                          Testing
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>• Unit testing setup</Typography>
                            <Typography>• Integration testing</Typography>
                            <Typography>• E2E testing</Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deployment">
                <AccordionTrigger>Deployment</AccordionTrigger>
                <AccordionContent>
                  <Box className="space-y-4">
                    <Typography>
                      Information about deploying the application to production.
                    </Typography>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="staging">
                        <AccordionTrigger className="text-sm">
                          Staging Environment
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>• Staging setup process</Typography>
                            <Typography>• Testing in staging</Typography>
                            <Typography>
                              • Staging to production workflow
                            </Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="production">
                        <AccordionTrigger className="text-sm">
                          Production Environment
                        </AccordionTrigger>
                        <AccordionContent>
                          <Box className="space-y-2">
                            <Typography>• Production deployment</Typography>
                            <Typography>• Monitoring and logging</Typography>
                            <Typography>• Backup and recovery</Typography>
                          </Box>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Examples</CardTitle>
          <CardDescription>
            Practical examples of how accordions are used in real applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* FAQ Section */}
          <Box className="space-y-4">
            <Typography variant="h4">FAQ Section</Typography>
            <Card className="max-w-3xl">
              <CardHeader>
                <CardTitle className="text-lg">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>
                      How do I reset my password?
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-3">
                        <Typography>
                          To reset your password, follow these steps:
                        </Typography>
                        <Box className="space-y-2">
                          <Typography>1. Go to the login page</Typography>
                          <Typography>2. Click on "Forgot Password"</Typography>
                          <Typography>3. Enter your email address</Typography>
                          <Typography>
                            4. Check your email for reset instructions
                          </Typography>
                          <Typography>
                            5. Follow the link to create a new password
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger>
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-3">
                        <Typography>
                          We accept the following payment methods:
                        </Typography>
                        <Box className="space-y-2">
                          <Typography>
                            • Credit cards (Visa, MasterCard, American Express)
                          </Typography>
                          <Typography>• PayPal</Typography>
                          <Typography>
                            • Bank transfers (for annual plans)
                          </Typography>
                          <Typography>
                            • Digital wallets (Apple Pay, Google Pay)
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger>
                      How can I contact customer support?
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-3">
                        <Typography>
                          You can reach our customer support team through
                          multiple channels:
                        </Typography>
                        <Box className="space-y-2">
                          <Typography>• Email: support@example.com</Typography>
                          <Typography>• Live chat: Available 24/7</Typography>
                          <Typography>
                            • Phone: 1-800-123-4567 (Mon-Fri, 9AM-6PM EST)
                          </Typography>
                          <Typography>
                            • Help center: Comprehensive documentation
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </Box>

          <Separator />

          {/* Settings Panel */}
          <Box className="space-y-4">
            <Typography variant="h4">Settings Panel</Typography>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="profile">
                    <AccordionTrigger className="flex items-center gap-2">
                      <Icon name="user" className="text-neutral-500" />
                      Profile Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-4">
                        <Box className="grid grid-cols-2 gap-4">
                          <Box>
                            <Typography className="font-medium mb-1">
                              First Name
                            </Typography>
                            <Box className="h-9 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                          </Box>
                          <Box>
                            <Typography className="font-medium mb-1">
                              Last Name
                            </Typography>
                            <Box className="h-9 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                          </Box>
                        </Box>
                        <Box>
                          <Typography className="font-medium mb-1">
                            Email
                          </Typography>
                          <Box className="h-9 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                        </Box>
                        <Box>
                          <Typography className="font-medium mb-1">
                            Bio
                          </Typography>
                          <Box className="h-20 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="notifications">
                    <AccordionTrigger className="flex items-center gap-2">
                      <Icon name="bell" className="text-neutral-500" />
                      Notifications
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-4">
                        <Box className="flex items-center justify-between">
                          <Typography>Email Notifications</Typography>
                          <Box className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                        </Box>
                        <Box className="flex items-center justify-between">
                          <Typography>Push Notifications</Typography>
                          <Box className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                        </Box>
                        <Box className="flex items-center justify-between">
                          <Typography>SMS Alerts</Typography>
                          <Box className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="security">
                    <AccordionTrigger className="flex items-center gap-2">
                      <Icon name="shield-check" className="text-neutral-500" />
                      Security
                    </AccordionTrigger>
                    <AccordionContent>
                      <Box className="space-y-4">
                        <Box className="flex items-center justify-between">
                          <Typography>Two-Factor Authentication</Typography>
                          <Box className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                        </Box>
                        <Box className="flex items-center justify-between">
                          <Typography>Login Notifications</Typography>
                          <Box className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                        </Box>
                        <Box>
                          <Typography className="font-medium mb-1">
                            Change Password
                          </Typography>
                          <Box className="h-9 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                        </Box>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices and accessibility considerations for using accordion
            components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Box className="space-y-2">
            <Typography variant="h4">Accessibility</Typography>
            <Box className="space-y-2">
              <Typography>
                • Use proper ARIA attributes for expanded/collapsed states
              </Typography>
              <Typography>
                • Ensure keyboard navigation works correctly
              </Typography>
              <Typography>• Provide clear, descriptive trigger text</Typography>
              <Typography>• Use semantic HTML structure</Typography>
            </Box>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Best Practices</Typography>
            <Box className="space-y-2">
              <Typography>• Keep content concise and focused</Typography>
              <Typography>• Use consistent trigger styling</Typography>
              <Typography>• Consider the user's mental model</Typography>
              <Typography>• Limit nesting to 2-3 levels maximum</Typography>
            </Box>
          </Box>

          <Box className="space-y-2">
            <Typography variant="h4">Design Considerations</Typography>
            <Box className="space-y-2">
              <Typography>• Use appropriate spacing and typography</Typography>
              <Typography>• Consider the content hierarchy</Typography>
              <Typography>
                • Ensure smooth animations and transitions
              </Typography>
              <Typography>• Test with different content lengths</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
