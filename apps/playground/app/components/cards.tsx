import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Input,
  Label,
} from '@veraclins-dev/ui';

export function Cards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Showcasing cards</CardTitle>
        <CardSubtitle>
          This is a card component that can be used to display content.
        </CardSubtitle>
      </CardHeader>
      <CardContent display="flex" flexDirection="column" gap={4}>
        <Box display="flex" gap={4}>
          <Card className="w-full max-w-sm bg-card-inner">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Box display="flex" flexDirection="column" gap={6}>
                  <Box display="grid" gap={2}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Box>
                  <Box display="grid" gap={2}>
                    <Box display="flex" items="center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="ml-auto inline-block text-sm">
                        Forgot your password?
                      </a>
                    </Box>
                    <Input id="password" type="password" required />
                  </Box>
                </Box>
              </form>
            </CardContent>
            <CardFooter display="flex" flexDirection="column" gap={2}>
              <Button color="primary" type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <Box display="flex" flexDirection="column" gap={4}>
                Don&apos;t have an account? <a href="#">Sign up</a>
              </Box>
            </CardFooter>
          </Card>
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
              <Box
                display="flex"
                className="*:data-[slot=avatar]:ring-background -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/leerob.png"
                    alt="@leerob"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </Box>
            </CardFooter>
          </Card>
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
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="text">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="right">
                  <Box display="flex" justify="between" gap={4}>
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <Box display="flex" items="center" gap={2} mt={1}>
                        <Icon
                          name="calendar"
                          className="text-neutral-foreground size-4"
                        />
                        <span className="text-neutral-foreground text-xs">
                          Joined December 2021
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </HoverCardContent>
              </HoverCard>
            </CardFooter>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
}
