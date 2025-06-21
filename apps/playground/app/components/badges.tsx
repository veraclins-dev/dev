import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

export function Badges() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
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
              <Badge variant="outline" color="primary" size="sm">
                Small
              </Badge>
              <Badge variant="outline" color="secondary" size="md">
                Medium
              </Badge>
              <Badge variant="outline" color="destructive" size="lg">
                Large
              </Badge>
              <Badge variant="outline" color="success" size="xl">
                Extra Large
              </Badge>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Profile Card</CardTitle>
          <CardDescription>
            User status, role, and achievement badges in a profile context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile */}
            <Card className="p-6">
              <Box display="flex" items="center" gap={4} className="mb-4">
                <Avatar className="size-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Box flex="1">
                  <Typography variant="h4">John Doe</Typography>
                  <Typography variant="body2" className="text-muted-foreground">
                    Senior Developer
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={3}>
                {/* Status Badges */}
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Badge variant="soft" color="success">
                    <Box className="w-2 h-2 bg-success rounded-full mr-2" />
                    Online
                  </Badge>
                  <Badge variant="soft" color="primary">
                    Admin
                  </Badge>
                  <Badge variant="outline" color="warning">
                    Premium
                  </Badge>
                </Box>

                {/* Achievement Badges */}
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Achievements
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Badge variant="soft" color="info" size="sm">
                      <Icon name="star" className="size-3 mr-1" />
                      Top Contributor
                    </Badge>
                    <Badge variant="soft" color="success" size="sm">
                      <Icon name="check-circle" className="size-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge variant="soft" color="warning" size="sm">
                      <Icon name="trophy" className="size-3 mr-1" />
                      MVP 2024
                    </Badge>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Team Member List */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Team Members
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                {[
                  {
                    name: 'Alice Smith',
                    role: 'Designer',
                    status: 'online',
                    level: 'senior',
                  },
                  {
                    name: 'Bob Johnson',
                    role: 'Developer',
                    status: 'away',
                    level: 'junior',
                  },
                  {
                    name: 'Carol White',
                    role: 'Manager',
                    status: 'offline',
                    level: 'lead',
                  },
                  {
                    name: 'David Brown',
                    role: 'QA',
                    status: 'online',
                    level: 'mid',
                  },
                ].map((member, i) => (
                  <Box
                    key={i}
                    display="flex"
                    items="center"
                    gap={3}
                    p={3}
                    className="border rounded"
                  >
                    <Avatar>
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Box flex="1">
                      <Typography variant="body1">{member.name}</Typography>
                      <Typography
                        variant="body2"
                        className="text-muted-foreground"
                      >
                        {member.role}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                      <Badge
                        variant="soft"
                        color={
                          member.status === 'online'
                            ? 'success'
                            : member.status === 'away'
                              ? 'warning'
                              : 'secondary'
                        }
                        size="sm"
                      >
                        {member.status}
                      </Badge>
                      <Badge variant="outline" color="primary" size="sm">
                        {member.level}
                      </Badge>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* E-commerce Product Card */}
      <Card>
        <CardHeader>
          <CardTitle>E-commerce Product Card</CardTitle>
          <CardDescription>
            Product status, availability, and promotional badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 - Sale */}
            <Card className="overflow-hidden">
              <Box className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                <Icon name="photo" className="size-16 text-muted-foreground" />
                <Box className="absolute top-3 left-3">
                  <Badge variant="solid" color="destructive">
                    Sale -20%
                  </Badge>
                </Box>
                <Box className="absolute top-3 right-3">
                  <Badge variant="soft" color="success">
                    In Stock
                  </Badge>
                </Box>
              </Box>
              <CardContent p={4}>
                <Box
                  display="flex"
                  justify="between"
                  items="start"
                  className="mb-2"
                >
                  <Typography variant="h5">Premium Headphones</Typography>
                  <Badge variant="outline" color="info" size="sm">
                    New
                  </Badge>
                </Box>
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-3"
                >
                  High-quality wireless headphones with noise cancellation.
                </Typography>
                <Box display="flex" justify="between" items="center">
                  <Typography variant="h4" className="text-primary">
                    $199.99
                  </Typography>
                  <Button size="sm">Add to Cart</Button>
                </Box>
              </CardContent>
            </Card>

            {/* Product 2 - Out of Stock */}
            <Card className="overflow-hidden">
              <Box className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                <Icon name="photo" className="size-16 text-muted-foreground" />
                <Box className="absolute top-3 left-3">
                  <Badge variant="solid" color="warning">
                    Limited
                  </Badge>
                </Box>
                <Box className="absolute top-3 right-3">
                  <Badge variant="soft" color="destructive">
                    Out of Stock
                  </Badge>
                </Box>
              </Box>
              <CardContent p={4}>
                <Box
                  display="flex"
                  justify="between"
                  items="start"
                  className="mb-2"
                >
                  <Typography variant="h5">Smart Watch</Typography>
                  <Badge variant="outline" color="success" size="sm">
                    Popular
                  </Badge>
                </Box>
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-3"
                >
                  Feature-rich smartwatch with health tracking.
                </Typography>
                <Box display="flex" justify="between" items="center">
                  <Typography variant="h4" className="text-primary">
                    $299.99
                  </Typography>
                  <Button size="sm" disabled>
                    Notify Me
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Product 3 - New Arrival */}
            <Card className="overflow-hidden">
              <Box className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                <Icon name="photo" className="size-16 text-muted-foreground" />
                <Box className="absolute top-3 left-3">
                  <Badge variant="solid" color="info">
                    New Arrival
                  </Badge>
                </Box>
                <Box className="absolute top-3 right-3">
                  <Badge variant="soft" color="success">
                    In Stock
                  </Badge>
                </Box>
              </Box>
              <CardContent p={4}>
                <Box
                  display="flex"
                  justify="between"
                  items="start"
                  className="mb-2"
                >
                  <Typography variant="h5">Wireless Earbuds</Typography>
                  <Badge variant="outline" color="warning" size="sm">
                    Trending
                  </Badge>
                </Box>
                <Typography
                  variant="body2"
                  className="text-muted-foreground mb-3"
                >
                  Compact wireless earbuds with premium sound quality.
                </Typography>
                <Box display="flex" justify="between" items="center">
                  <Typography variant="h4" className="text-primary">
                    $149.99
                  </Typography>
                  <Button size="sm">Add to Cart</Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Notification Center */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>
            Notification badges with different priority levels and status
            indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notification List */}
            <Card className="p-6">
              <Box
                display="flex"
                justify="between"
                items="center"
                className="mb-4"
              >
                <Typography variant="h4">Notifications</Typography>
                <Badge variant="solid" color="primary">
                  12
                </Badge>
              </Box>

              <Box display="flex" flexDirection="column" gap={3}>
                {[
                  {
                    title: 'Order Shipped',
                    priority: 'high',
                    unread: true,
                    time: '2 min ago',
                  },
                  {
                    title: 'Payment Received',
                    priority: 'medium',
                    unread: true,
                    time: '1 hour ago',
                  },
                  {
                    title: 'New Message',
                    priority: 'low',
                    unread: false,
                    time: '3 hours ago',
                  },
                  {
                    title: 'System Update',
                    priority: 'info',
                    unread: false,
                    time: '1 day ago',
                  },
                ].map((notification, i) => (
                  <Box
                    key={i}
                    display="flex"
                    items="center"
                    gap={3}
                    p={3}
                    className={`border rounded ${notification.unread ? 'bg-primary/5' : ''}`}
                  >
                    <Box className="flex-1">
                      <Typography variant="body1">
                        {notification.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-muted-foreground"
                      >
                        {notification.time}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                      <Badge
                        variant="soft"
                        color={
                          notification.priority === 'high'
                            ? 'destructive'
                            : notification.priority === 'medium'
                              ? 'warning'
                              : notification.priority === 'low'
                                ? 'success'
                                : 'info'
                        }
                        size="sm"
                      >
                        {notification.priority}
                      </Badge>
                      {notification.unread && (
                        <Badge variant="solid" color="primary" size="sm">
                          New
                        </Badge>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Status Dashboard */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                System Status
              </Typography>

              <Box display="flex" flexDirection="column" gap={4}>
                {/* Service Status */}
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Services
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">API Gateway</Typography>
                      <Badge variant="soft" color="success">
                        Operational
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Database</Typography>
                      <Badge variant="soft" color="warning">
                        Degraded
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">CDN</Typography>
                      <Badge variant="soft" color="success">
                        Operational
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Email Service</Typography>
                      <Badge variant="soft" color="destructive">
                        Down
                      </Badge>
                    </Box>
                  </Box>
                </Box>

                {/* Metrics */}
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Performance
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Response Time</Typography>
                      <Badge variant="outline" color="success">
                        120ms
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Uptime</Typography>
                      <Badge variant="outline" color="success">
                        99.9%
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Error Rate</Typography>
                      <Badge variant="outline" color="warning">
                        0.1%
                      </Badge>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            Task priority, status, and tag badges in a project management
            context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task List */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Active Tasks
              </Typography>

              <Box display="flex" flexDirection="column" gap={3}>
                {[
                  {
                    title: 'Design Homepage',
                    priority: 'high',
                    status: 'in-progress',
                    tags: ['design', 'frontend'],
                    due: 'Today',
                  },
                  {
                    title: 'Fix Login Bug',
                    priority: 'critical',
                    status: 'urgent',
                    tags: ['bug', 'backend'],
                    due: 'ASAP',
                  },
                  {
                    title: 'Write Documentation',
                    priority: 'medium',
                    status: 'pending',
                    tags: ['docs'],
                    due: 'Tomorrow',
                  },
                  {
                    title: 'Code Review',
                    priority: 'low',
                    status: 'completed',
                    tags: ['review'],
                    due: 'Done',
                  },
                ].map((task, i) => (
                  <Box
                    key={i}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    p={3}
                    className="border rounded"
                  >
                    <Box display="flex" justify="between" items="start">
                      <Typography variant="body1">{task.title}</Typography>
                      <Box display="flex" gap={2}>
                        <Badge
                          variant="soft"
                          color={
                            task.priority === 'critical'
                              ? 'destructive'
                              : task.priority === 'high'
                                ? 'warning'
                                : task.priority === 'medium'
                                  ? 'info'
                                  : 'success'
                          }
                          size="sm"
                        >
                          {task.priority}
                        </Badge>
                        <Badge
                          variant="outline"
                          color={
                            task.status === 'urgent'
                              ? 'destructive'
                              : task.status === 'in-progress'
                                ? 'warning'
                                : task.status === 'pending'
                                  ? 'info'
                                  : 'success'
                          }
                          size="sm"
                        >
                          {task.status}
                        </Badge>
                      </Box>
                    </Box>

                    <Box display="flex" gap={2} flexWrap="wrap">
                      {task.tags.map((tag, j) => (
                        <Badge
                          key={j}
                          variant="outline"
                          color="secondary"
                          size="sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Box>

                    <Typography
                      variant="body2"
                      className="text-muted-foreground"
                    >
                      Due: {task.due}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Project Overview */}
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Project Overview
              </Typography>

              <Box display="flex" flexDirection="column" gap={4}>
                {/* Progress Stats */}
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Progress
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Completed</Typography>
                      <Badge variant="soft" color="success">
                        24 tasks
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">In Progress</Typography>
                      <Badge variant="soft" color="warning">
                        8 tasks
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Pending</Typography>
                      <Badge variant="soft" color="info">
                        12 tasks
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Overdue</Typography>
                      <Badge variant="soft" color="destructive">
                        3 tasks
                      </Badge>
                    </Box>
                  </Box>
                </Box>

                {/* Team Stats */}
                <Box>
                  <Typography
                    variant="body2"
                    className="text-muted-foreground mb-2"
                  >
                    Team
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Active Members</Typography>
                      <Badge variant="outline" color="success">
                        8 online
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Sprint Status</Typography>
                      <Badge variant="outline" color="warning">
                        Week 2 of 4
                      </Badge>
                    </Box>
                    <Box display="flex" justify="between" items="center">
                      <Typography variant="body1">Velocity</Typography>
                      <Badge variant="outline" color="info">
                        85%
                      </Badge>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
