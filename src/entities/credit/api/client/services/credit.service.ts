import { apiClient } from '@/shared/api/client/axios.config'
import type {
    PurchaseCreditsRequest,
    PurchaseCreditsResponse,
    WalletResponse,
} from '@/entities/credit/model/types'

export async function getWallet(): Promise<WalletResponse> {
    const response = await apiClient.get<WalletResponse>('/api/credits/wallet')
    return response.data
}

export async function purchaseCredits(
    data: PurchaseCreditsRequest,
): Promise<PurchaseCreditsResponse> {
    const response = await apiClient.post<PurchaseCreditsResponse>('/api/credits/purchase', data)
    return response.data
}
