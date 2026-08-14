import { z } from 'zod';

export const AccountProfileSchema = z.object({
  username: z.string(),
  userId: z.string().optional(),
  email: z.string().optional(),
  token: z.string().optional(),
  connectSid: z.string().optional(),
  lastUsed: z.string().optional(),
});

export type AccountProfile = z.infer<typeof AccountProfileSchema>;

export const AuthConfigSchema = z.object({
  token: z.string().optional(),
  connectSid: z.string().optional(),
  username: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
  apiUrl: z.string().default('https://replit.com/graphql'),
  currentReplId: z.string().optional(),
  currentReplSlug: z.string().optional(),
  lastLogin: z.string().optional(),
  accounts: z.record(z.string(), AccountProfileSchema).default({}),
  activeAccount: z.string().optional(),
});

export type AuthConfig = z.infer<typeof AuthConfigSchema>;

export type AuthMethod = 'cookie' | 'token' | 'environment' | 'container' | 'mock';

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  bio?: string;
  isSubscribed?: boolean;
  planName?: string;
  image?: string;
  authMethod: AuthMethod;
}

export interface ResolveCredentialsResult {
  token?: string;
  connectSid?: string;
  username?: string;
  authMethod: AuthMethod;
  apiUrl: string;
}
