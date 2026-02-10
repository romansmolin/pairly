import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { resolveAppUserId } from '@/shared/lib/auth/resolve-app-user-id'
import { GiftController } from '../controllers/gift.controller'

const getGiftController = (): GiftController => {
    return container.get(GiftController)
}

export const GET_GIFT_CATALOG = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getGiftController().getCatalog(request, userId)
})

export const GET_GIFT_INVENTORY = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getGiftController().getInventory(request, userId)
})

export const GET_GIFT_HISTORY = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getGiftController().getHistory(request, userId)
})

export const POST_GIFT_BUY = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getGiftController().buyGift(request, userId)
})

export const POST_GIFT_SEND = asyncHandler(async (request: NextRequest) => {
    const userId = await resolveAppUserId(request)
    return getGiftController().sendGift(request, userId)
})
