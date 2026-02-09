// User UI
export { UserMenu } from './ui/user-menu'

// User Types
export type { User } from './model/types'

// Server-side exports (use with caution - only in server contexts)
export { GetCurrentUserController } from './api/server/controller/get-current-user.controller'
export { GetCurrentUserUseCase } from './api/server/use-cases/get-current-user.usecase'
export { PrismaUserRepository } from './api/server/repositories/prisma-user.repository'
export type { IUserRepository } from './api/server/interfaces/user-repository.interface'
