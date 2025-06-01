import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Card className="w-full max-w-sm bg-card-inner">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="ml-auto inline-block text-sm">
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button color="primary" type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="">
                  Sign up
                </a>
              </div>
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
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
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
              </div>
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
                  <div className="flex justify-between gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Icon
                          name="calendar"
                          className="text-muted-foreground size-4"
                        />
                        <span className="text-muted-foreground text-xs">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
