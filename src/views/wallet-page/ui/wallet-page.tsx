'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Coins, CreditCard, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
    useGetWalletQuery,
    usePurchaseCreditsMutation,
} from '@/entities/credit/api/client/endpoints'
import type { CreditPresetKey, PurchaseCreditsRequest } from '@/entities/credit/model/types'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

const CUSTOM_COINS_PER_EUR = 30

const presetPacks: Array<{ amountEur: CreditPresetKey; coins: number; label: string }> = [
    { amountEur: 1, coins: 30, label: 'Starter' },
    { amountEur: 5, coins: 230, label: 'Popular' },
    { amountEur: 10, coins: 460, label: 'Best value' },
]

const presetCoinsMap: Record<CreditPresetKey, number> = {
    1: 30,
    5: 230,
    10: 460,
}

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

    return 'Unable to complete purchase right now'
}

const toCustomAmount = (value: string): number | null => {
    const normalized = value.replace(',', '.').trim()
    if (!normalized) return null

    const parsed = Number(normalized)
    if (!Number.isFinite(parsed) || parsed <= 0) return null

    return parsed
}

export function WalletPage() {
    const [selectedPreset, setSelectedPreset] = useState<CreditPresetKey | null>(5)
    const [customAmount, setCustomAmount] = useState('')
    const [consentAccepted, setConsentAccepted] = useState(false)

    const walletQuery = useGetWalletQuery()
    const [purchaseCredits, purchaseState] = usePurchaseCreditsMutation()

    const resolvedAmount = useMemo(() => {
        if (selectedPreset) return selectedPreset
        return toCustomAmount(customAmount)
    }, [customAmount, selectedPreset])

    const resolvedCoins = useMemo(() => {
        if (selectedPreset) {
            return presetCoinsMap[selectedPreset]
        }

        if (resolvedAmount == null) return 0
        return Math.floor(resolvedAmount * CUSTOM_COINS_PER_EUR)
    }, [resolvedAmount, selectedPreset])

    const canPurchase = Boolean(
        consentAccepted &&
            resolvedAmount != null &&
            resolvedAmount > 0 &&
            Number.isFinite(resolvedAmount) &&
            resolvedCoins > 0 &&
            !purchaseState.isLoading,
    )

    const onPresetSelect = (preset: CreditPresetKey) => {
        setSelectedPreset(preset)
        setCustomAmount('')
    }

    const onCustomAmountChange = (value: string) => {
        setCustomAmount(value)
        setSelectedPreset(null)
    }

    const handlePurchase = async () => {
        if (!consentAccepted) {
            toast.error('You must accept terms to continue')
            return
        }

        if (resolvedAmount == null || resolvedAmount <= 0 || resolvedCoins <= 0) {
            toast.error('Enter a valid amount')
            return
        }

        const payload: PurchaseCreditsRequest = selectedPreset
            ? {
                  amountEur: selectedPreset,
                  pricingMode: 'preset',
                  presetKey: selectedPreset,
                  consentAccepted: true,
              }
            : {
                  amountEur: resolvedAmount,
                  pricingMode: 'custom',
                  consentAccepted: true,
              }

        try {
            const result = await purchaseCredits(payload).unwrap()

            if (result.redirectUrl) {
                window.location.assign(result.redirectUrl)
                return
            }

            toast.error('Checkout redirect URL is missing')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <section className="py-8 sm:pb-12">
            <div className="mx-auto w-full max-w-5xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-3xl">Wallet</CardTitle>
                        <CardDescription>
                            Buy Love Coins and use them for premium actions in chat.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {walletQuery.isLoading ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted-foreground">
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Loading wallet...
                            </div>
                        ) : walletQuery.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Failed to load wallet</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(walletQuery.error)}
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <p className="text-xs text-muted-foreground">Balance</p>
                                    <p className="mt-1 text-2xl font-bold">
                                        {walletQuery.data?.wallet.balance ?? 0} coins
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <p className="text-xs text-muted-foreground">Purchased</p>
                                    <p className="mt-1 text-2xl font-bold">
                                        {walletQuery.data?.wallet.totalPurchased ?? 0}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <p className="text-xs text-muted-foreground">Spent</p>
                                    <p className="mt-1 text-2xl font-bold">
                                        {walletQuery.data?.wallet.totalSpent ?? 0}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <p className="text-xs text-muted-foreground">Pending</p>
                                    <p className="mt-1 text-2xl font-bold">
                                        {walletQuery.data?.wallet.pendingCredits ?? 0}
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Buy Love Coins</CardTitle>
                        <CardDescription>
                            Choose a pack or enter your own amount in EUR.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="grid gap-3 sm:grid-cols-3">
                            {presetPacks.map((pack) => {
                                const isActive = selectedPreset === pack.amountEur
                                return (
                                    <button
                                        key={pack.amountEur}
                                        type="button"
                                        onClick={() => onPresetSelect(pack.amountEur)}
                                        className={`rounded-xl border p-4 text-left transition-colors ${
                                            isActive
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border bg-card hover:border-primary/50'
                                        }`}
                                    >
                                        <p className="text-xs text-muted-foreground">{pack.label}</p>
                                        <p className="mt-2 text-xl font-bold">{pack.amountEur} EUR</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {pack.coins} coins
                                        </p>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">Custom amount (EUR)</Label>
                            <Input
                                id="custom-amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g. 7.50"
                                value={customAmount}
                                onChange={(event) => onCustomAmountChange(event.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                                Custom conversion: 1 EUR = {CUSTOM_COINS_PER_EUR} coins
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                            <p className="text-sm text-muted-foreground">You will receive</p>
                            <p className="mt-1 inline-flex items-center gap-2 text-2xl font-bold">
                                <Coins className="size-5 text-primary" />
                                {resolvedCoins} coins
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Amount: {resolvedAmount != null ? `${resolvedAmount} EUR` : '—'}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="wallet-consent"
                                    checked={consentAccepted}
                                    onChange={(event) => setConsentAccepted(event.target.checked)}
                                    className="mt-0.5"
                                />
                                <div className="w-full overflow-x-auto">
                                    <Label
                                        htmlFor="wallet-consent"
                                        className="inline-flex min-w-max items-center gap-1 whitespace-nowrap text-sm font-normal text-slate-600"
                                    >
                                        <span>I agree to the</span>
                                        <Link
                                            href="/terms-of-service"
                                            className="underline hover:text-slate-900"
                                        >
                                            Terms of Service
                                        </Link>
                                        <span>,</span>
                                        <Link
                                            href="/privacy-policy"
                                            className="underline hover:text-slate-900"
                                        >
                                            Privacy Policy
                                        </Link>
                                        <span>, and</span>
                                        <Link
                                            href="/return-policy"
                                            className="underline hover:text-slate-900"
                                        >
                                            Return Policy
                                        </Link>
                                        <span>.</span>
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {purchaseState.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Purchase failed</AlertTitle>
                                <AlertDescription>
                                    {getErrorMessage(purchaseState.error)}
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        <Button
                            type="button"
                            className="w-full"
                            onClick={handlePurchase}
                            disabled={!canPurchase}
                        >
                            {purchaseState.isLoading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Redirecting to checkout...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="size-4" />
                                    Buy {resolvedCoins} Love Coins
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
