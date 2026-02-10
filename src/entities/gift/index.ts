export type {
    BuyGiftRequest,
    BuyGiftResponse,
    GiftCatalogItem,
    GiftCatalogResponse,
    GiftHistoryItem,
    GiftHistoryResponse,
    GiftInventoryItem,
    GiftInventoryResponse,
    SendGiftRequest,
    SendGiftResponse,
} from './model/types'

export {
    useGetGiftCatalogQuery,
    useGetGiftInventoryQuery,
    useGetGiftHistoryQuery,
    useBuyGiftMutation,
    useSendGiftMutation,
} from './api/client/endpoints'

export type { GiftHistoryQuery } from './api/client/services/gift.service'
