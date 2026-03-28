'use client'

import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    direction?: 'vertical' | 'horizontal'
    distance?: number
    delay?: number
    duration?: number
    once?: boolean
    scale?: number
    className?: string
}

export function ScrollReveal({
    children,
    direction = 'vertical',
    distance = 30,
    delay = 0,
    duration = 0.6,
    once = true,
    scale,
    className,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, margin: '-15% 0px' })

    const initial: Record<string, number> = { opacity: 0 }
    const animate: Record<string, number> = { opacity: 1 }

    if (direction === 'vertical') {
        initial.y = distance
        animate.y = 0
    } else {
        initial.x = distance
        animate.x = 0
    }

    if (scale !== undefined) {
        initial.scale = scale
        animate.scale = 1
    }

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : initial}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
