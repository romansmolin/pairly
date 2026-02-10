import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getWallet, purchaseCredits } from './services/credit.service'
import type {
    PurchaseCreditsRequest,
    PurchaseCreditsResponse,
    WalletResponse,
} from '@/entities/credit/model/types'

export const creditApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWallet: builder.query<WalletResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getWallet()
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
            providesTags: ['Wallet'],
        }),
        purchaseCredits: builder.mutation<PurchaseCreditsResponse, PurchaseCreditsRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await purchaseCredits(payload)
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
            invalidatesTags: ['Wallet'],
        }),
    }),
})

export const { useGetWalletQuery, usePurchaseCreditsMutation } = creditApi
