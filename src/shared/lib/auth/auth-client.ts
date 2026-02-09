import { getEnvVar } from 'better-auth'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
    baseURL: getEnvVar('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000',
})

export const { signIn, signUp, signOut, useSession, $fetch } = authClient
