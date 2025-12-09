import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ProgressBar,
  Skeleton,
  StatusButton,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function Feedback() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Feedback" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Feedback Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Components for providing user feedback, loading states, and progress
        indicators.
      </Typography>

      {/* ProgressBar Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>ProgressBar Components</CardTitle>
          <CardDescription>
            Progress indicators for showing completion status and loading states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Basic ProgressBars */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic ProgressBars
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography className="mb-2">
                    Default Progress (50%)
                  </Typography>
                  <ProgressBar value={50} />
                </Box>
                <Box>
                  <Typography className="mb-2">
                    Success Progress (75%)
                  </Typography>
                  <ProgressBar value={75} color="success" />
                </Box>
                <Box>
                  <Typography className="mb-2">
                    Warning Progress (90%)
                  </Typography>
                  <ProgressBar value={90} color="warning" />
                </Box>
                <Box>
                  <Typography className="mb-2">Error Progress (25%)</Typography>
                  <ProgressBar value={25} color="destructive" />
                </Box>
              </Box>
            </Box>

            {/* Real-Life ProgressBar Examples */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Real-Life ProgressBar Examples
              </Typography>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* File Upload Progress */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      File Upload Progress
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>document.pdf</Typography>
                          <Typography>65%</Typography>
                        </Box>
                        <ProgressBar value={65} color="primary" />
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>image.jpg</Typography>
                          <Typography>100%</Typography>
                        </Box>
                        <ProgressBar value={100} color="success" />
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>video.mp4</Typography>
                          <Typography>Error</Typography>
                        </Box>
                        <ProgressBar value={45} color="destructive" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Profile Completion */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Profile Completion
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>Profile Completion</Typography>
                          <Typography>80%</Typography>
                        </Box>
                        <ProgressBar value={80} color="success" />
                      </Box>
                      <Typography className="text-foreground/80">
                        Complete your profile to unlock additional features
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      System Status
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>CPU Usage</Typography>
                          <Typography>45%</Typography>
                        </Box>
                        <ProgressBar value={45} color="info" />
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>Memory Usage</Typography>
                          <Typography>78%</Typography>
                        </Box>
                        <ProgressBar value={78} color="warning" />
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justify="between"
                          items="center"
                          className="mb-2"
                        >
                          <Typography>Disk Space</Typography>
                          <Typography>92%</Typography>
                        </Box>
                        <ProgressBar value={92} color="destructive" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Skeleton Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Components</CardTitle>
          <CardDescription>
            Loading placeholders for content that is being fetched or processed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Basic Skeletons */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic Skeletons
              </Typography>
              <Box display="flex" flexDirection="column" gap={4}>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-20 w-full" />
              </Box>
            </Box>

            {/* Real-Life Skeleton Examples */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Real-Life Skeleton Examples
              </Typography>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* User Profile Skeleton */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      User Profile Loading
                    </Typography>
                    <Box display="flex" gap={4}>
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        flex="1"
                      >
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-40" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Blog Post Skeleton */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Blog Post Loading
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-32 w-full" />
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Data Table Skeleton */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Data Table Loading
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Box key={i} display="flex" gap={4} className="py-2">
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* StatusButton Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>StatusButton Components</CardTitle>
          <CardDescription>
            Buttons with status states for showing action results and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={8}>
            {/* Basic StatusButtons */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Basic StatusButtons
              </Typography>
              <Box display="flex" gap={4} flexWrap="wrap">
                <StatusButton status="idle">Idle</StatusButton>
                <StatusButton status="pending">Loading</StatusButton>
                <StatusButton status="success">Success</StatusButton>
                <StatusButton status="error">Error</StatusButton>
              </Box>
            </Box>

            {/* Real-Life StatusButton Examples */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Real-Life StatusButton Examples
              </Typography>
              <Box display="flex" flexDirection="column" gap={6}>
                {/* Form Submission */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      Form Submission
                    </Typography>
                    <Box display="flex" gap={3}>
                      <StatusButton status="idle" buttonSize="sm">
                        Save Draft
                      </StatusButton>
                      <StatusButton status="pending" buttonSize="sm">
                        Submitting...
                      </StatusButton>
                      <StatusButton status="success" buttonSize="sm">
                        Saved!
                      </StatusButton>
                      <StatusButton status="error" buttonSize="sm">
                        Failed
                      </StatusButton>
                    </Box>
                  </CardContent>
                </Card>

                {/* File Upload */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      File Upload
                    </Typography>
                    <Box display="flex" gap={3}>
                      <StatusButton status="idle" buttonSize="sm">
                        Upload File
                      </StatusButton>
                      <StatusButton status="pending" buttonSize="sm">
                        Uploading...
                      </StatusButton>
                      <StatusButton status="success" buttonSize="sm">
                        Uploaded!
                      </StatusButton>
                      <StatusButton status="error" buttonSize="sm">
                        Upload Failed
                      </StatusButton>
                    </Box>
                  </CardContent>
                </Card>

                {/* API Connection */}
                <Card className="bg-card-inner">
                  <CardContent className="p-4">
                    <Typography variant="h5" className="mb-3">
                      API Connection
                    </Typography>
                    <Box display="flex" gap={3}>
                      <StatusButton status="idle" buttonSize="sm">
                        Connect
                      </StatusButton>
                      <StatusButton status="pending" buttonSize="sm">
                        Connecting...
                      </StatusButton>
                      <StatusButton status="success" buttonSize="sm">
                        Connected
                      </StatusButton>
                      <StatusButton status="error" buttonSize="sm">
                        Connection Failed
                      </StatusButton>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Integration Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
          <CardDescription>
            How feedback components work together in real applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Dashboard Loading State */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Dashboard Loading State
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" flexDirection="column" gap={4}>
                    {/* Header Skeleton */}
                    <Box display="flex" justify="between" items="center">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-8 w-24" />
                    </Box>

                    {/* Stats Grid Skeleton */}
                    <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <Box key={i} className="border rounded p-4">
                          <Skeleton className="h-4 w-20 mb-2" />
                          <Skeleton className="h-8 w-16 mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </Box>
                      ))}
                    </Box>

                    {/* Progress Section */}
                    <Box>
                      <Typography variant="h6" className="mb-3">
                        Data Processing Progress
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={3}>
                        <Box>
                          <Box
                            display="flex"
                            justify="between"
                            items="center"
                            className="mb-2"
                          >
                            <Typography>Processing records...</Typography>
                            <Typography>67%</Typography>
                          </Box>
                          <ProgressBar value={67} color="primary" />
                        </Box>
                        <StatusButton status="pending" buttonSize="sm">
                          Processing...
                        </StatusButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* User Profile Loading */}
            <Box>
              <Typography variant="h4" className="mb-4">
                User Profile Loading
              </Typography>
              <Card className="bg-card-inner">
                <CardContent className="p-6">
                  <Box display="flex" gap={6}>
                    {/* Avatar and Info Skeleton */}
                    <Box display="flex" flexDirection="column" gap={4} flex="1">
                      <Box display="flex" gap={4}>
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={2}
                          flex="1"
                        >
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-40" />
                        </Box>
                      </Box>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </Box>
                    </Box>

                    {/* Actions */}
                    <Box display="flex" flexDirection="column" gap={3}>
                      <StatusButton status="pending" buttonSize="sm">
                        Loading Profile...
                      </StatusButton>
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-20" />
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
