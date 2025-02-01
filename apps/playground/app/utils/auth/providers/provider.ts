import { type AuthStrategy } from '@veraclins-dev/remix-auth-social';

export interface AuthProvider {
  getAuthStrategy(): AuthStrategy;
  handleMockAction(request: Request): Promise<void>;
}
