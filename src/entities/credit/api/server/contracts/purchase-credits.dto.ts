import { z } from 'zod'

const presetKeySchema = z.union([z.literal(1), z.literal(5), z.literal(10)])

export const purchaseCreditsSchema = z.object({
    amountEur: z
        .number()
        .positive('amountEur must be a positive number')
        .max(10_000, 'amountEur is too large')
        .refine((value) => Number.isFinite(value), {
            message: 'amountEur must be a finite number',
        })
        .refine((value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9, {
            message: 'amountEur can have at most 2 decimal places',
        }),
    pricingMode: z.enum(['preset', 'custom']).optional(),
    presetKey: presetKeySchema.optional(),
    consentAccepted: z.boolean().refine((value) => value, {
        message: 'Consent is required',
    }),
}).superRefine((value, ctx) => {
    if (value.pricingMode === 'preset') {
        if (value.presetKey === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['presetKey'],
                message: 'presetKey is required for preset pricingMode',
            })
            return
        }

        if (value.amountEur !== value.presetKey) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['amountEur'],
                message: 'amountEur must match presetKey for preset pricingMode',
            })
        }
    }

    if (value.pricingMode === 'custom' && value.presetKey !== undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['presetKey'],
            message: 'presetKey cannot be used with custom pricingMode',
        })
    }
})

export type PurchaseCreditsDto = z.infer<typeof purchaseCreditsSchema>
