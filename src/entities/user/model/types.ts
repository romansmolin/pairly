/**
 * User domain types
 * Aligned with Better Auth schema
 */

export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  name: string
  image?: string
}

export interface UpdateUserInput {
  name?: string
  emailVerified?: boolean
  image?: string
}
