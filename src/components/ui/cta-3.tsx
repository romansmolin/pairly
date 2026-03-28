'use client'

import { ArrowRightIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GradientText from '@/shared/components/GradientText'
import { ScrollReveal } from '@/shared/ui/scroll-reveal'
import Link from 'next/link'

export function CallToAction() {
    return (
        <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-between gap-y-6 border-y bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] px-4 py-12">
            <PlusIcon
                className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6"
                strokeWidth={1}
            />
            <PlusIcon
                className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6"
                strokeWidth={1}
            />
            <PlusIcon
                className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6"
                strokeWidth={1}
            />
            <PlusIcon
                className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6"
                strokeWidth={1}
            />

            <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
            <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />

            <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

            <div className="space-y-1">
                <h2 className="text-center text-2xl font-bold">
                    <GradientText
                        colors={['#ffd1d5', '#ffc0cb', '#333333']}
                        animationSpeed={8}
                        className="text-2xl font-bold"
                    >
                        Ready to start real conversations?
                    </GradientText>
                </h2>
                <ScrollReveal delay={0.1} distance={15}>
                    <p className="text-muted-foreground text-center">
                        Create your Pairly profile, discover compatible matches, and connect with
                        people who share your goals.
                    </p>
                </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} distance={20} scale={0.95}>
                <div className="flex items-center justify-center gap-2">
                    <Button asChild>
                        <Link href="/auth/sign-up">
                            Create free account <ArrowRightIcon className="ml-1 size-4" />
                        </Link>
                    </Button>
                </div>
            </ScrollReveal>
        </div>
    )
}
