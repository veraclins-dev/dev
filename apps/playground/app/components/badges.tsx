import { Image } from '@veraclins-dev/image';
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

type NotificationType =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info';
type TaskPriority = 'high' | 'medium' | 'low';

const getPriorityColor = (priority: TaskPriority): NotificationType => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'secondary';
  }
};

export function Badges() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Badges" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Badge Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Badges provide visual indicators for status, notifications, and
        categorization.
      </Typography>

      {/* Basic Badge Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Variants & Sizes</CardTitle>
          <CardDescription>
            Basic badge variants and size options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Solid</Typography>
              <Badge variant="solid" color="primary">
                Primary
              </Badge>
              <Badge variant="solid" color="secondary">
                Secondary
              </Badge>
              <Badge variant="solid" color="destructive">
                Destructive
              </Badge>
              <Badge variant="solid" color="success">
                Success
              </Badge>
              <Badge variant="solid" color="warning">
                Warning
              </Badge>
              <Badge variant="solid" color="info">
                Info
              </Badge>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Soft</Typography>
              <Badge variant="soft" color="primary">
                Primary
              </Badge>
              <Badge variant="soft" color="secondary">
                Secondary
              </Badge>
              <Badge variant="soft" color="destructive">
                Destructive
              </Badge>
              <Badge variant="soft" color="success">
                Success
              </Badge>
              <Badge variant="soft" color="warning">
                Warning
              </Badge>
              <Badge variant="soft" color="info">
                Info
              </Badge>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Outline</Typography>
              <Badge variant="outline" color="primary">
                Primary
              </Badge>
              <Badge variant="outline" color="secondary">
                Secondary
              </Badge>
              <Badge variant="outline" color="destructive">
                Destructive
              </Badge>
              <Badge variant="outline" color="success">
                Success
              </Badge>
              <Badge variant="outline" color="warning">
                Warning
              </Badge>
              <Badge variant="outline" color="info">
                Info
              </Badge>
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="h4">Sizes</Typography>
              <Badge variant="outline" color="primary" badgeSize="sm">
                Small
              </Badge>
              <Badge variant="outline" color="secondary" badgeSize="md">
                Medium
              </Badge>
              <Badge variant="outline" color="destructive" badgeSize="lg">
                Large
              </Badge>
              <Badge variant="outline" color="success" badgeSize="xl">
                Extra Large
              </Badge>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Badge Examples</CardTitle>
          <CardDescription>
            Practical examples of badges in real-world applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* E-commerce Product Card */}
            <Box>
              <Typography variant="h4" className="mb-4">
                E-commerce Product Card
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Product Card 1 */}
                    <Box className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Box className="relative">
                        <Image
                          src="https://picsum.photos/400/200?random=1"
                          alt="Wireless Headphones"
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          layout="responsive"
                        />
                        <Box className="absolute top-2 left-2">
                          <Badge
                            variant="solid"
                            color="destructive"
                            badgeSize="sm"
                          >
                            Sale -20%
                          </Badge>
                        </Box>
                        <Box className="absolute top-2 right-2">
                          <Badge variant="soft" color="success" badgeSize="sm">
                            New
                          </Badge>
                        </Box>
                      </Box>
                      <Box className="p-4">
                        <Typography variant="h6" className="mb-2">
                          Wireless Headphones
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-muted-foreground mb-3"
                        >
                          Premium noise-canceling wireless headphones with
                          30-hour battery life.
                        </Typography>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-3"
                        >
                          <Box display="flex" gap={2} items="center">
                            <Typography variant="h6" className="text-primary">
                              $199.99
                            </Typography>
                            <Typography
                              variant="body2"
                              className="line-through text-muted-foreground"
                            >
                              $249.99
                            </Typography>
                          </Box>
                          <Badge
                            variant="outline"
                            color="destructive"
                            badgeSize="sm"
                          >
                            Only 3 left
                          </Badge>
                        </Box>
                        <Box display="flex" gap={2} flexWrap="wrap">
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Electronics
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Wireless
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Premium
                          </Badge>
                        </Box>
                      </Box>
                    </Box>

                    {/* Product Card 2 */}
                    <Box className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Box className="relative">
                        <Image
                          src="https://picsum.photos/400/200?random=2"
                          alt="Smart Watch"
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          layout="responsive"
                        />
                        <Box className="absolute top-2 left-2">
                          <Badge variant="solid" color="warning" badgeSize="sm">
                            Limited Time
                          </Badge>
                        </Box>
                      </Box>
                      <Box className="p-4">
                        <Typography variant="h6" className="mb-2">
                          Smart Watch
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-muted-foreground mb-3"
                        >
                          Advanced fitness tracking with heart rate monitoring
                          and GPS.
                        </Typography>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-3"
                        >
                          <Typography variant="h6" className="text-primary">
                            $299.99
                          </Typography>
                          <Badge variant="soft" color="success" badgeSize="sm">
                            In Stock
                          </Badge>
                        </Box>
                        <Box display="flex" gap={2} flexWrap="wrap">
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Wearables
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Fitness
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            GPS
                          </Badge>
                        </Box>
                      </Box>
                    </Box>

                    {/* Product Card 3 */}
                    <Box className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Box className="relative">
                        <Image
                          src="https://picsum.photos/400/200?random=3"
                          alt="Gaming Laptop"
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          layout="responsive"
                        />
                        <Box className="absolute top-2 left-2">
                          <Badge
                            variant="solid"
                            color="destructive"
                            badgeSize="sm"
                          >
                            Out of Stock
                          </Badge>
                        </Box>
                      </Box>
                      <Box className="p-4">
                        <Typography variant="h6" className="mb-2">
                          Gaming Laptop
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-muted-foreground mb-3"
                        >
                          High-performance gaming laptop with RTX 4080 and 32GB
                          RAM.
                        </Typography>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-3"
                        >
                          <Typography variant="h6" className="text-primary">
                            $1,999.99
                          </Typography>
                          <Badge
                            variant="outline"
                            color="destructive"
                            badgeSize="sm"
                          >
                            Backorder
                          </Badge>
                        </Box>
                        <Box display="flex" gap={2} flexWrap="wrap">
                          <Badge variant="soft" color="info" badgeSize="sm">
                            Gaming
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            RTX 4080
                          </Badge>
                          <Badge variant="soft" color="info" badgeSize="sm">
                            32GB RAM
                          </Badge>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Notification Center */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Notification Center
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notification List */}
                    <Box>
                      <Typography variant="h5" className="mb-4">
                        Recent Notifications
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={3}>
                        {[
                          {
                            title: 'Order Shipped',
                            message: 'Your order #12345 has been shipped',
                            type: 'success',
                            priority: 'high',
                            unread: true,
                            time: '2 min ago',
                          },
                          {
                            title: 'Payment Failed',
                            message: 'Payment for subscription failed',
                            type: 'destructive',
                            priority: 'high',
                            unread: true,
                            time: '1 hour ago',
                          },
                          {
                            title: 'New Message',
                            message: 'You have a new message from John',
                            type: 'info',
                            priority: 'medium',
                            unread: false,
                            time: '3 hours ago',
                          },
                          {
                            title: 'System Update',
                            message: 'System maintenance scheduled',
                            type: 'warning',
                            priority: 'low',
                            unread: false,
                            time: '1 day ago',
                          },
                        ].map((notification, index) => (
                          <Box
                            key={index}
                            className={`border rounded p-3 ${notification.unread ? 'bg-primary/5 border-primary/20' : ''}`}
                          >
                            <Box
                              display="flex"
                              justify="between"
                              items="start"
                              className="mb-2"
                            >
                              <Typography
                                variant="body1"
                                className="font-medium"
                              >
                                {notification.title}
                              </Typography>
                              <Box display="flex" gap={1}>
                                {notification.unread && (
                                  <Badge
                                    variant="solid"
                                    color="primary"
                                    badgeSize="sm"
                                  >
                                    New
                                  </Badge>
                                )}
                                <Badge
                                  variant="soft"
                                  color={notification.type as NotificationType}
                                  badgeSize="sm"
                                >
                                  {notification.priority}
                                </Badge>
                              </Box>
                            </Box>
                            <Typography
                              variant="body2"
                              className="text-muted-foreground mb-2"
                            >
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              className="text-muted-foreground"
                            >
                              {notification.time}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Notification Stats */}
                    <Box>
                      <Typography variant="h5" className="mb-4">
                        Notification Summary
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={4}>
                        <Box className="grid grid-cols-2 gap-4">
                          <Box className="border rounded p-4 text-center">
                            <Typography
                              variant="h4"
                              className="text-primary mb-1"
                            >
                              12
                            </Typography>
                            <Typography variant="body2">Unread</Typography>
                            <Badge
                              variant="solid"
                              color="primary"
                              badgeSize="sm"
                              className="mt-2"
                            >
                              High Priority
                            </Badge>
                          </Box>
                          <Box className="border rounded p-4 text-center">
                            <Typography
                              variant="h4"
                              className="text-success mb-1"
                            >
                              45
                            </Typography>
                            <Typography variant="body2">Read Today</Typography>
                            <Badge
                              variant="soft"
                              color="success"
                              badgeSize="sm"
                              className="mt-2"
                            >
                              All Caught Up
                            </Badge>
                          </Box>
                        </Box>

                        <Box>
                          <Typography variant="h6" className="mb-3">
                            Priority Breakdown
                          </Typography>
                          <Box display="flex" flexDirection="column" gap={2}>
                            <Box
                              display="flex"
                              justify="between"
                              items="center"
                            >
                              <Typography variant="body2">
                                High Priority
                              </Typography>
                              <Badge
                                variant="solid"
                                color="destructive"
                                badgeSize="sm"
                              >
                                3
                              </Badge>
                            </Box>
                            <Box
                              display="flex"
                              justify="between"
                              items="center"
                            >
                              <Typography variant="body2">
                                Medium Priority
                              </Typography>
                              <Badge
                                variant="solid"
                                color="warning"
                                badgeSize="sm"
                              >
                                7
                              </Badge>
                            </Box>
                            <Box
                              display="flex"
                              justify="between"
                              items="center"
                            >
                              <Typography variant="body2">
                                Low Priority
                              </Typography>
                              <Badge
                                variant="solid"
                                color="info"
                                badgeSize="sm"
                              >
                                2
                              </Badge>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Task Management */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Task Management System
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* To Do Column */}
                    <Box>
                      <Typography variant="h5" className="mb-4">
                        To Do
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={3}>
                        {[
                          {
                            title: 'Design Review',
                            priority: 'high',
                            dueDate: 'Today',
                            tags: ['Design', 'Review'],
                          },
                          {
                            title: 'Bug Fix',
                            priority: 'medium',
                            dueDate: 'Tomorrow',
                            tags: ['Bug', 'Frontend'],
                          },
                          {
                            title: 'Documentation',
                            priority: 'low',
                            dueDate: 'Next Week',
                            tags: ['Docs', 'Technical'],
                          },
                        ].map((task, index) => (
                          <Box
                            key={index}
                            className="border rounded p-3 bg-neutral/5"
                          >
                            <Typography
                              variant="body1"
                              className="font-medium mb-2"
                            >
                              {task.title}
                            </Typography>
                            <Box display="flex" gap={1} className="mb-2">
                              <Badge
                                variant="soft"
                                color={getPriorityColor(
                                  task.priority as TaskPriority,
                                )}
                                badgeSize="sm"
                              >
                                {task.priority}
                              </Badge>
                              <Badge
                                variant="outline"
                                color="warning"
                                badgeSize="sm"
                              >
                                Due: {task.dueDate}
                              </Badge>
                            </Box>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="soft"
                                  color="info"
                                  badgeSize="sm"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* In Progress Column */}
                    <Box>
                      <Typography variant="h5" className="mb-4">
                        In Progress
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={3}>
                        {[
                          {
                            title: 'API Integration',
                            priority: 'high',
                            progress: '75%',
                            assignee: 'John Doe',
                            tags: ['API', 'Backend'],
                          },
                          {
                            title: 'User Testing',
                            priority: 'medium',
                            progress: '50%',
                            assignee: 'Alice Smith',
                            tags: ['Testing', 'UX'],
                          },
                        ].map((task, index) => (
                          <Box
                            key={index}
                            className="border rounded p-3 bg-primary/5"
                          >
                            <Typography
                              variant="body1"
                              className="font-medium mb-2"
                            >
                              {task.title}
                            </Typography>
                            <Box display="flex" gap={1} className="mb-2">
                              <Badge
                                variant="soft"
                                color={getPriorityColor(
                                  task.priority as TaskPriority,
                                )}
                                badgeSize="sm"
                              >
                                {task.priority}
                              </Badge>
                              <Badge
                                variant="solid"
                                color="primary"
                                badgeSize="sm"
                              >
                                {task.progress}
                              </Badge>
                            </Box>
                            <Typography
                              variant="body2"
                              className="text-muted-foreground mb-2"
                            >
                              Assigned to: {task.assignee}
                            </Typography>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="soft"
                                  color="info"
                                  badgeSize="sm"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Completed Column */}
                    <Box>
                      <Typography variant="h5" className="mb-4">
                        Completed
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={3}>
                        {[
                          {
                            title: 'Database Setup',
                            completedDate: 'Yesterday',
                            tags: ['Database', 'Setup'],
                          },
                          {
                            title: 'Homepage Design',
                            completedDate: '2 days ago',
                            tags: ['Design', 'Frontend'],
                          },
                        ].map((task, index) => (
                          <Box
                            key={index}
                            className="border rounded p-3 bg-success/5"
                          >
                            <Typography
                              variant="body1"
                              className="font-medium mb-2"
                            >
                              {task.title}
                            </Typography>
                            <Badge
                              variant="solid"
                              color="success"
                              badgeSize="sm"
                              className="mb-2"
                            >
                              Completed: {task.completedDate}
                            </Badge>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="soft"
                                  color="info"
                                  badgeSize="sm"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
