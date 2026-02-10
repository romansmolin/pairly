'use client'

import { useMemo, useState } from 'react'
import { Coins, Gift, Loader2, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import {
    useBuyGiftMutation,
    useGetGiftCatalogQuery,
    useGetGiftHistoryQuery,
    useGetGiftInventoryQuery,
} from '@/entities/gift/api/client/endpoints'
import { useGetWalletQuery } from '@/entities/credit/api/client/endpoints'
import type { GiftCatalogItem, GiftInventoryItem } from '@/entities/gift/model/types'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
        const maybeMessage = (error as { data?: { message?: string } }).data?.message
        if (typeof maybeMessage === 'string' && maybeMessage.trim()) {
            return maybeMessage
        }

        const nestedMessage =
            (error as { error?: string }).error ?? (error as { message?: string }).message

        if (typeof nestedMessage === 'string' && nestedMessage.trim()) {
            return nestedMessage
        }
    }

    return 'Unable to process request right now'
}

function CatalogGrid({
    items,
    balance,
    inventoryByGift,
    pendingBuyGiftId,
    onBuy,
}: {
    items: GiftCatalogItem[]
    balance: number
    inventoryByGift: Record<string, number>
    pendingBuyGiftId: string | null
    onBuy: (giftId: string) => Promise<void>
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((gift) => {
                const isPending = pendingBuyGiftId === gift.id
                const canAfford = balance >= gift.priceCoins
                const ownedQuantity = inventoryByGift[gift.id] ?? 0

                return (
                    <Card key={gift.id} className="flex h-full flex-col overflow-hidden">
                        <div className="h-56 bg-muted/40">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={gift.imagePath}
                                alt={gift.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <CardContent className="flex flex-1 flex-col p-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="line-clamp-1 text-sm font-semibold">
                                        {gift.name}
                                    </p>
                                    <Badge variant="secondary" className="gap-1">
                                        <Coins className="size-3" />
                                        {gift.priceCoins}
                                    </Badge>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Owned: {ownedQuantity}
                                </p>
                            </div>

                            <div className="mt-auto pt-3">
                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={() => onBuy(gift.id)}
                                    disabled={isPending || !canAfford}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Buying...
                                        </>
                                    ) : !canAfford ? (
                                        <>
                                            <Coins className="size-4" />
                                            Not enough coins
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="size-4" />
                                            Buy gift
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

function InventoryGrid({ items }: { items: GiftInventoryItem[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
                return (
                    <Card key={item.giftId} className="flex h-full flex-col overflow-hidden">
                        <div className="h-56 bg-muted/40">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.giftImagePath}
                                alt={item.giftName}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <CardContent className="flex flex-1 flex-col p-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="line-clamp-1 text-sm font-semibold">
                                        {item.giftName}
                                    </p>
                                    <Badge variant="secondary">x{item.quantity}</Badge>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Ready to send from inventory.
                                </p>
                            </div>

                            <div className="mt-auto pt-3">
                                <Button type="button" className="w-full" disabled>
                                    <Gift className="size-4" />
                                    Use in chat (soon)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export function GiftsPage() {
    const [pendingBuyGiftId, setPendingBuyGiftId] = useState<string | null>(null)

    const walletQuery = useGetWalletQuery()
    const catalogQuery = useGetGiftCatalogQuery()
    const inventoryQuery = useGetGiftInventoryQuery()
    const historyQuery = useGetGiftHistoryQuery({ limit: 20 })

    const [buyGift, buyGiftState] = useBuyGiftMutation()

    const balance = walletQuery.data?.wallet.balance ?? 0
    const hasCatalog = Boolean(catalogQuery.data?.items?.length)
    const hasInventory = Boolean(inventoryQuery.data?.items?.length)

    const inventoryByGift = useMemo(() => {
        return (inventoryQuery.data?.items ?? []).reduce<Record<string, number>>((acc, item) => {
            acc[item.giftId] = item.quantity
            return acc
        }, {})
    }, [inventoryQuery.data?.items])

    const handleBuyGift = async (giftId: string): Promise<void> => {
        setPendingBuyGiftId(giftId)

        try {
            const result = await buyGift({ giftId }).unwrap()

            toast.success(
                `Gift purchased. Inventory: ${result.inventoryQuantity}. Remaining balance: ${result.remainingBalance} coins.`,
            )
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setPendingBuyGiftId(null)
        }
    }

    return (
        <section className="py-8 sm:pb-12">
            <div className="mx-auto w-full max-w-6xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-3xl">Gifts</CardTitle>
                        <CardDescription>
                            Buy flower gifts with Love Coins and keep them in your inventory.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-border bg-card p-4">
                                <p className="text-xs text-muted-foreground">Balance</p>
                                <p className="mt-1 text-2xl font-bold">{balance} coins</p>
                            </div>

                            <div className="rounded-xl border border-border bg-card p-4">
                                <p className="text-xs text-muted-foreground">Inventory Items</p>
                                <p className="mt-1 text-2xl font-bold">
                                    {inventoryQuery.data?.items.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0,
                                    ) ?? 0}
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-card p-4">
                                <p className="text-xs text-muted-foreground">Catalog gifts</p>
                                <p className="mt-1 text-2xl font-bold">
                                    {catalogQuery.data?.items.length ?? 0}
                                </p>
                            </div>
                        </div>

                        {walletQuery.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Failed to load wallet</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(walletQuery.error)}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Gift Catalog</CardTitle>
                        <CardDescription>Buy gifts and add them to your inventory.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {catalogQuery.isLoading ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted-foreground">
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Loading gifts...
                            </div>
                        ) : catalogQuery.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Failed to load gifts</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(catalogQuery.error)}
                                </AlertDescription>
                            </Alert>
                        ) : !hasCatalog ? (
                            <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                                No gifts available right now.
                            </div>
                        ) : (
                            <CatalogGrid
                                items={catalogQuery.data?.items ?? []}
                                balance={balance}
                                inventoryByGift={inventoryByGift}
                                pendingBuyGiftId={pendingBuyGiftId}
                                onBuy={handleBuyGift}
                            />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Your Gift Inventory</CardTitle>
                        <CardDescription>
                            Gifts you purchased. Sending from chat will be enabled next.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {inventoryQuery.isLoading ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted-foreground">
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Loading inventory...
                            </div>
                        ) : inventoryQuery.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Failed to load inventory</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(inventoryQuery.error)}
                                </AlertDescription>
                            </Alert>
                        ) : !hasInventory ? (
                            <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                                No gifts in inventory yet.
                            </div>
                        ) : (
                            <InventoryGrid items={inventoryQuery.data?.items ?? []} />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Recent Sent Gifts</CardTitle>
                        <CardDescription>Track your latest gift sends.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {historyQuery.isLoading ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted-foreground">
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Loading gift history...
                            </div>
                        ) : historyQuery.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Failed to load gift history</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(historyQuery.error)}
                                </AlertDescription>
                            </Alert>
                        ) : historyQuery.data?.items?.length ? (
                            <ul className="space-y-3">
                                {historyQuery.data.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="size-10 overflow-hidden rounded-md border border-border bg-muted/30">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={item.giftImagePath}
                                                    alt={item.giftName}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold">
                                                    {item.giftName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    To user #{item.recipientUserId}
                                                </p>
                                            </div>
                                        </div>

                                        <Badge variant="secondary" className="gap-1">
                                            <Coins className="size-3" />
                                            {item.priceCoins}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                                No sent gifts yet.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {buyGiftState.error ? (
                    <Alert variant="destructive">
                        <AlertTitle>Gift purchase failed</AlertTitle>
                        <AlertDescription>{getErrorMessage(buyGiftState.error)}</AlertDescription>
                    </Alert>
                ) : null}
            </div>
        </section>
    )
}
