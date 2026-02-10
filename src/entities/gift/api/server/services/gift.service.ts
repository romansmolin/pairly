import { inject, injectable } from 'inversify'
import { AppError } from '@/shared/errors/app-error'
import type {
    BuyGiftResponse,
    GiftCatalogItem,
    GiftCatalogResponse,
    GiftHistoryItem,
    GiftHistoryResponse,
    GiftInventoryItem,
    GiftInventoryResponse,
    SendGiftResponse,
} from '@/entities/gift/model/types'
import { MatchService } from '@/entities/match/api/server/services/match.service'
import { GiftRepository } from '../repositories/gift.repository'

type BuyGiftInput = {
    userId: string
    giftId: string
}

type SendGiftInput = {
    senderUserId: string
    recipientUserId: number
    giftId: string
    sessionId: string
}

const toGiftCatalogItem = (row: {
    id: string
    slug: string
    name: string
    imagePath: string
    priceCoins: number
}): GiftCatalogItem => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    imagePath: row.imagePath,
    priceCoins: row.priceCoins,
})

const toGiftInventoryItem = (row: {
    giftId: string
    quantity: number
    updatedAt: Date
    gift: {
        name: string
        imagePath: string
    }
}): GiftInventoryItem => ({
    giftId: row.giftId,
    quantity: row.quantity,
    updatedAt: row.updatedAt.toISOString(),
    giftName: row.gift.name,
    giftImagePath: row.gift.imagePath,
})

const toGiftHistoryItem = (row: {
    id: string
    giftId: string
    recipientDatingUserId: number
    priceCoins: number
    createdAt: Date
    gift: {
        name: string
        imagePath: string
    }
}): GiftHistoryItem => ({
    id: row.id,
    giftId: row.giftId,
    recipientUserId: row.recipientDatingUserId,
    priceCoins: row.priceCoins,
    createdAt: row.createdAt.toISOString(),
    giftName: row.gift.name,
    giftImagePath: row.gift.imagePath,
})

@injectable()
export class GiftService {
    constructor(
        @inject(GiftRepository) private repository: GiftRepository,
        @inject(MatchService) private matchService: MatchService,
    ) {}

    async listCatalog(): Promise<GiftCatalogResponse> {
        const rows = await this.repository.listCatalog()

        return {
            items: rows.map(toGiftCatalogItem),
        }
    }

    async listInventory(userId: string): Promise<GiftInventoryResponse> {
        const rows = await this.repository.listUserInventory(userId)

        return {
            items: rows.map(toGiftInventoryItem),
        }
    }

    async listHistory(senderUserId: string, limit = 20): Promise<GiftHistoryResponse> {
        const rows = await this.repository.listUserGiftHistory(senderUserId, limit)

        return {
            items: rows.map(toGiftHistoryItem),
        }
    }

    async buyGift(input: BuyGiftInput): Promise<BuyGiftResponse> {
        const gift = await this.repository.findGiftById(input.giftId)

        if (!gift) {
            throw AppError.notFoundError('Gift not found')
        }

        if (!gift.isActive) {
            throw AppError.validationError('Gift is inactive')
        }

        const result = await this.repository.buyGiftTransactional({
            userId: input.userId,
            giftId: gift.id,
            giftName: gift.name,
            priceCoins: gift.priceCoins,
        })

        return {
            giftId: gift.id,
            purchasedQuantity: 1,
            inventoryQuantity: result.inventoryQuantity,
            spentCoins: gift.priceCoins,
            remainingBalance: result.remainingBalance,
        }
    }

    async sendGift(input: SendGiftInput): Promise<SendGiftResponse> {
        const gift = await this.repository.findGiftById(input.giftId)

        if (!gift) {
            throw AppError.notFoundError('Gift not found')
        }

        const matches = await this.matchService.listMatches(input.sessionId)
        const recipientIsMatch = matches.items.some((match) => match.id === input.recipientUserId)

        if (!recipientIsMatch) {
            throw AppError.authorizationError(
                'Match not found. Gifts can be sent only to matched users.',
            )
        }

        const result = await this.repository.sendGiftTransactional({
            senderUserId: input.senderUserId,
            recipientDatingUserId: input.recipientUserId,
            giftId: gift.id,
            priceCoins: gift.priceCoins,
        })

        return {
            giftSendId: result.giftSend.id,
            giftId: gift.id,
            recipientUserId: input.recipientUserId,
            remainingInventory: result.remainingInventory,
            createdAt: result.giftSend.createdAt.toISOString(),
        }
    }
}
