import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { getEnvVar } from '@/shared/utils/get-env-var'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
    prismaPool: Pool | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    (() => {
        const connectionString = getEnvVar('PRISMA_DATABASE_URL')

        if (!connectionString) throw new Error('DATABASE_URL or PRISMA_DATABASE_URL must be set')

        const pool =
            globalForPrisma.prismaPool ??
            new Pool({
                connectionString,
                max: 10,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 10000,
            })

        const adapter = new PrismaPg(pool)

        if (getEnvVar('NODE_ENV') !== 'production') globalForPrisma.prismaPool = pool

        return new PrismaClient({
            adapter,
            log: getEnvVar('NODE_ENV') === 'development' ? ['query', 'error', 'warn'] : ['error'],
        })
    })()

if (getEnvVar('NODE_ENV') !== 'production') globalForPrisma.prisma = prisma
