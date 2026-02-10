import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { GetWalletController } from '../controller/get-wallet.controller'
import { PurchaseCreditsController } from '../controller/purchase-credits.controller'

const getPurchaseCreditsController = (): PurchaseCreditsController => {
    return container.get(PurchaseCreditsController)
}

const getWalletController = (): GetWalletController => {
    return container.get(GetWalletController)
}

export const POST_PURCHASE_CREDITS = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getPurchaseCreditsController().handle(request, userId)
})

export const GET_WALLET = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getWalletController().handle(userId)
})
