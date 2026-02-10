import 'server-only'
import { injectable } from 'inversify'
import type {
    CreateCheckoutInput,
    CreateCheckoutResult,
    PaymentGatewayAdapter,
} from '../interfaces/payment-gateway.interface'
import { getEnvVar } from '@/shared/utils/get-env-var'
import { HttpError } from '@/shared/errors/http-error'

const SECURE_PROCESSOR_API_BASE_URL = getEnvVar('SECURE_PROCESSOR_API_BASE_URL')
const SECURE_PROCESSOR_CHECKOUT_TOKEN_PATH = getEnvVar('SECURE_PROCESSOR_CHECKOUT_TOKEN_PATH')
const SECURE_PROCESSOR_SHOP_ID = getEnvVar('SECURE_PROCESSOR_SHOP_ID')
const SECURE_PROCESSOR_SECRET_KEY = getEnvVar('SECURE_PROCESSOR_SECRET_KEY')
const NEXT_PUBLIC_SECURE_PROCESSOR_TEST_MODE = getEnvVar('SECURE_PROCESSOR_TEST_MODE')

const toSafeErrorPreview = (payload: string): string => {
    const compact = payload.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    return compact.slice(0, 220)
}

@injectable()
export class SecureProcessorAdapter implements PaymentGatewayAdapter {
    async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
        const payload = {
            checkout: {
                version: 2.1,
                transaction_type: 'payment',
                test: input.testMode,
                settings: {
                    return_url: input.returnUrl,
                },
                order: {
                    amount: input.amountCents,
                    currency: input.currency,
                    description: input.description,
                },
                customer: {
                    id: input.customerId,
                },
                metadata: input.metadata,
            },
        }

        const configuredUrl = new URL(SECURE_PROCESSOR_CHECKOUT_TOKEN_PATH, SECURE_PROCESSOR_API_BASE_URL)
        let response = await this.requestCheckout(configuredUrl, payload)

        if (!response.ok && response.status === 404 && configuredUrl.pathname.endsWith('/checkout')) {
            const fallbackPath = configuredUrl.pathname.replace(/\/checkout$/, '/checkouts')
            const fallbackUrl = new URL(fallbackPath, SECURE_PROCESSOR_API_BASE_URL)
            console.warn('[SecureProcessorAdapter] Checkout path returned 404, retrying fallback path', {
                configuredPath: configuredUrl.pathname,
                fallbackPath: fallbackUrl.pathname,
            })
            response = await this.requestCheckout(fallbackUrl, payload)
        }

        if (!response.ok) {
            const bodyText = await response.text()
            const safePreview = toSafeErrorPreview(bodyText)

            throw new HttpError(
                `Secure Processor checkout failed (${response.status}). ${safePreview || 'Unexpected response from payment gateway.'}`,
                response.status >= 400 && response.status < 500 ? 400 : 502,
            )
        }

        const json = await response.json()
        const checkoutToken = json?.token ?? json?.checkout?.token
        const redirectUrl = json?.checkout?.redirect_url

        if (!checkoutToken) {
            throw new HttpError('Secure Processor did not return a checkout token', 502)
        }

        return {
            checkoutToken,
            redirectUrl,
            rawPayload: json,
        }
    }

    private buildBasicAuthHeader(): string {
        const value = `${SECURE_PROCESSOR_SHOP_ID}:${SECURE_PROCESSOR_SECRET_KEY}`
        const encoded = Buffer.from(value).toString('base64')
        return `Basic ${encoded}`
    }

    private async requestCheckout(url: URL, payload: unknown): Promise<Response> {
        try {
            return await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.buildBasicAuthHeader(),
                },
                body: JSON.stringify(payload),
            })
        } catch {
            throw new HttpError('Secure Processor checkout network error', 502)
        }
    }
}

export const isSecureProcessorTestMode = () => {
    if (!NEXT_PUBLIC_SECURE_PROCESSOR_TEST_MODE) return false
    return NEXT_PUBLIC_SECURE_PROCESSOR_TEST_MODE === 'true'
}
