import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "689aca0218fe2785fb104153", 
  requiresAuth: true // Ensure authentication is required for all operations
});
