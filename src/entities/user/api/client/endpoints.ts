import { api } from '@/shared/api/client/api'
import { getCurrentUser } from './services/get-current-user.service'
import { UserResponseDto } from '../server/contracts/user-response.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserResponseDto, void>({
            queryFn: async () => {
                try {
                    const data = await getCurrentUser()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['User'],
        }),
    }),
})

export const { useGetCurrentUserQuery } = userApi
