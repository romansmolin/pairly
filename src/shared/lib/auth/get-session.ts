import { cookies } from 'next/headers';
import { auth } from './auth.config';

/**
 * Get the current session from the request
 * Server-side only helper for route handlers and server components
 */
export async function getSession() {
  const cookieStore = await cookies();
  const secureSessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value;
  const sessionToken = cookieStore.get('better-auth.session_token')?.value;
  const token = secureSessionToken ?? sessionToken;

  if (!token) {
    return null;
  }

  try {
    const session = await auth.api.getSession({
      headers: {
        cookie: `${secureSessionToken ? '__Secure-better-auth.session_token' : 'better-auth.session_token'}=${token}`,
      },
    });

    return session;
  } catch (error) {
    console.error('[Auth] Failed to get session:', error);
    return null;
  }
}
