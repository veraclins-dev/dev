import { useState } from 'react';

import { type AuthProfile } from '@veraclins-dev/remix-auth-social';
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function AuthShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProvider, setSelectedProvider] = useState<string>('google');
  const [configData, setConfigData] = useState({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectURI: 'http://localhost:3000/auth/callback',
  });

  // Mock user profile for demonstration
  const mockUserProfile: AuthProfile = {
    providerId: '123456789',
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    provider: 'google',
    bio: 'Software developer passionate about building great user experiences',
    location: 'San Francisco, CA',
  };

  const providers = [
    { id: 'google', name: 'Google', icon: '🔍', color: 'bg-blue-500' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { id: 'github', name: 'GitHub', icon: '🐙', color: 'bg-gray-800' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'providers', label: 'Providers' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'integration', label: 'Integration' },
    { id: 'examples', label: 'Examples' },
  ];

  const handleConfigChange = (field: string, value: string) => {
    setConfigData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Auth" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Authentication Components</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          OAuth authentication strategies for popular social platforms.
        </Typography>
      </Box>

      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Remix Auth Social Showcase</h1>
          <p className="text-xl text-foreground/80">
            Comprehensive OAuth authentication strategies for Remix applications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'solid' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="mb-0"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Package Overview</CardTitle>
                <CardDescription>
                  Remix Auth Social provides OAuth2 authentication strategies
                  for popular social platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Supported Providers</h4>
                    <div className="space-y-2">
                      {providers.map((provider) => (
                        <div
                          key={provider.id}
                          className="flex items-center gap-2"
                        >
                          <span className="text-2xl">{provider.icon}</span>
                          <span>{provider.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            OAuth2
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <div className="space-y-2 text-sm">
                      <div>• PKCE (Proof Key for Code Exchange) support</div>
                      <div>• CSRF protection with state verification</div>
                      <div>• TypeScript-first design</div>
                      <div>• Built on Arctic OAuth2 library</div>
                      <div>• Remix Auth integration</div>
                      <div>• Cookie-based state management</div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication Flow</CardTitle>
                <CardDescription>
                  Standard OAuth2 authorization code flow with PKCE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">User initiates login</h4>
                      <p className="text-sm text-foreground/80">
                        User clicks login button, app generates state and code
                        verifier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Redirect to provider</h4>
                      <p className="text-sm text-foreground/80">
                        User is redirected to OAuth provider with authorization
                        request
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">User authorizes</h4>
                      <p className="text-sm text-foreground/80">
                        User grants permissions, provider redirects back with
                        authorization code
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Exchange code for tokens
                      </h4>
                      <p className="text-sm text-foreground/80">
                        App exchanges authorization code for access tokens using
                        code verifier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold">Fetch user profile</h4>
                      <p className="text-sm text-foreground/80">
                        App fetches user profile using access token and creates
                        session
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>OAuth Providers</CardTitle>
                <CardDescription>
                  Choose from popular social platforms for authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {providers.map((provider) => (
                    <Card
                      key={provider.id}
                      className={`cursor-pointer transition-all ${
                        selectedProvider === provider.id
                          ? 'ring-2 ring-blue-500'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedProvider(provider.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center text-2xl`}
                          >
                            {provider.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{provider.name}</h4>
                            <p className="text-sm text-foreground/80">
                              OAuth2 authentication strategy
                            </p>
                          </div>
                          {selectedProvider === provider.id && (
                            <Badge variant="solid">Selected</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Provider Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {providers.find((p) => p.id === selectedProvider)?.name}{' '}
                  Configuration
                </CardTitle>
                <CardDescription>
                  Required configuration and scopes for {selectedProvider} OAuth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Required Scopes</h4>
                    <div className="space-y-1 text-sm">
                      {selectedProvider === 'google' && (
                        <>
                          <div>• openid</div>
                          <div>• userinfo.profile</div>
                          <div>• userinfo.email</div>
                        </>
                      )}
                      {selectedProvider === 'facebook' && (
                        <>
                          <div>• email</div>
                          <div>• public_profile</div>
                        </>
                      )}
                      {selectedProvider === 'github' && (
                        <>
                          <div>• read:user</div>
                          <div>• user:email</div>
                        </>
                      )}
                      {selectedProvider === 'twitter' && (
                        <>
                          <div>• tweet.read</div>
                          <div>• users.read</div>
                          <div>• offline.access</div>
                        </>
                      )}
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Profile Data</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Provider ID</div>
                      <div>• Username</div>
                      <div>• Display Name</div>
                      <div>• Email Address</div>
                      <div>• Profile Photo</div>
                      <div>• Bio (if available)</div>
                      <div>• Location (if available)</div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Configuration Tab */}
        {activeTab === 'configuration' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Setup</CardTitle>
                <CardDescription>
                  Configure OAuth providers with your application credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={configData.clientId}
                      onChange={(e) =>
                        handleConfigChange('clientId', e.target.value)
                      }
                      placeholder="Enter your OAuth client ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      value={configData.clientSecret}
                      onChange={(e) =>
                        handleConfigChange('clientSecret', e.target.value)
                      }
                      placeholder="Enter your OAuth client secret"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="redirectURI">Redirect URI</Label>
                  <Input
                    id="redirectURI"
                    value={configData.redirectURI}
                    onChange={(e) =>
                      handleConfigChange('redirectURI', e.target.value)
                    }
                    placeholder="http://localhost:3000/auth/callback"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
                <CardDescription>
                  Basic setup for {selectedProvider} OAuth strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="p-4 bg-neutral rounded-lg font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
                    {`import { Authenticator } from 'remix-auth';
import { ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}Strategy } from '@veraclins-dev/remix-auth-social';

const authenticator = new Authenticator<AuthProfile>(sessionStorage);

authenticator.use(
  new ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}Strategy(
    {
      clientId: '${configData.clientId}',
      clientSecret: '${configData.clientSecret}',
      redirectURI: '${configData.redirectURI}',
    },
    async ({ profile }) => {
      // Verify and return user profile
      return profile;
    }
  )
);`}
                  </pre>
                </Box>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Integration Tab */}
        {activeTab === 'integration' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Remix Integration</CardTitle>
                <CardDescription>
                  Complete integration example with Remix routes and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Route Structure</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        • <code>/auth/login</code> - Initiate OAuth flow
                      </div>
                      <div>
                        • <code>/auth/callback</code> - Handle OAuth callback
                      </div>
                      <div>
                        • <code>/auth/logout</code> - Clear session
                      </div>
                      <div>
                        • <code>/dashboard</code> - Protected route
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Session Management</h4>
                    <div className="space-y-2 text-sm">
                      <div>• Cookie-based sessions</div>
                      <div>• Automatic token refresh</div>
                      <div>• Secure state verification</div>
                      <div>• CSRF protection</div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Handling</CardTitle>
                <CardDescription>
                  Common OAuth errors and how to handle them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Box className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">OAuth Errors</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          • <code>access_denied</code> - User denied permission
                        </div>
                        <div>
                          • <code>invalid_request</code> - Malformed request
                        </div>
                        <div>
                          • <code>invalid_scope</code> - Invalid scope requested
                        </div>
                        <div>
                          • <code>server_error</code> - Provider server error
                        </div>
                      </div>
                    </Box>

                    <Box className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Security Errors</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          • <code>OAuth2RequestError</code> - OAuth flow errors
                        </div>
                        <div>
                          • <code>UnexpectedResponseError</code> - Unexpected
                          responses
                        </div>
                        <div>• State mismatch - CSRF protection</div>
                        <div>• Missing code verifier - PKCE validation</div>
                      </div>
                    </Box>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <Card className="w-3xl mx-auto">
              <CardHeader>
                <CardTitle>User Profile Example</CardTitle>
                <CardDescription>
                  Display user information after successful authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <img
                    src={mockUserProfile.photo}
                    alt={mockUserProfile.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {mockUserProfile.name}
                      </h3>
                      <Badge variant="outline">
                        {mockUserProfile.provider}
                      </Badge>
                    </div>
                    <p className="text-foreground/80">
                      @{mockUserProfile.username}
                    </p>
                    <p className="text-sm">{mockUserProfile.email}</p>
                    {mockUserProfile.bio && (
                      <p className="text-sm">{mockUserProfile.bio}</p>
                    )}
                    {mockUserProfile.location && (
                      <p className="text-sm text-foreground/80">
                        📍 {mockUserProfile.location}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Login Component Example</CardTitle>
                <CardDescription>
                  Interactive login component with multiple provider options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {providers.map((provider) => (
                      <Button
                        key={provider.id}
                        variant="outline"
                        className="h-12 justify-start gap-3"
                      >
                        <span className="text-xl">{provider.icon}</span>
                        <span>Continue with {provider.name}</span>
                      </Button>
                    ))}
                  </div>
                  <Separator />
                  <div className="text-center text-sm text-foreground/80">
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral">
              <CardHeader>
                <CardTitle>Protected Route Example</CardTitle>
                <CardDescription>
                  How to protect routes and handle authentication state
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="p-4 rounded-lg font-mono text-sm">
                  <pre className="whitespace-pre-wrap p-2">
                    {`// In your route file
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  });

  return json({ user });
}

// In your component
export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>You're logged in with {user.provider}</p>
    </div>
  );
}`}
                  </pre>
                </Box>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Box>
  );
}
