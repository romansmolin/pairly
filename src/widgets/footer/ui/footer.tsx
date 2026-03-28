'use client'

import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { FooterBankingInfo } from '@/shared/ui/footer-banking-info/footer-banking-info'
import { FlickeringGrid, useMediaQuery } from '@/components/ui/flickering-footer'
import { PairlyLogo } from '@/shared/ui/pairly-logo'

const footerLinks = [
    {
        title: 'Product',
        links: [
            { id: 1, title: 'How it works', url: '/#how-it-works' },
            { id: 2, title: 'Safety', url: '/#safety' },
            { id: 3, title: 'Stories', url: '/#testimonials' },
            { id: 4, title: 'FAQ', url: '/#faq' },
        ],
    },
    {
        title: 'Features',
        links: [
            { id: 5, title: 'Matching', url: '/match' },
            { id: 6, title: 'Chat', url: '/chat' },
            { id: 7, title: 'Gifts', url: '/gifts' },
            { id: 8, title: 'Wallet', url: '/wallet' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { id: 9, title: 'Terms of Service', url: '/tos' },
            { id: 10, title: 'Return Policy', url: '/return-policy' },
            { id: 11, title: 'Privacy', url: '#' },
            { id: 12, title: 'Contact', url: '#' },
        ],
    },
]

export const Footer = () => {
    const tablet = useMediaQuery('(max-width: 1024px)')

    return (
        <footer className="w-full border-t border-border bg-background/95 pb-0">
            <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex flex-col items-start gap-y-4 max-w-xs">
                        <Link href="/" className="flex items-center gap-2">
                            <PairlyLogo />
                            <p className="text-xl font-semibold text-primary">Pairly</p>
                        </Link>
                        <p className="tracking-tight text-muted-foreground font-medium text-sm">
                            Meaningful dating through compatibility, chat, and safe
                            interactions — so you can focus on building real connections.
                        </p>
                        <FooterBankingInfo className="h-5 w-auto max-w-full opacity-60" />
                    </div>

                    <div className="md:w-1/2">
                        <div className="flex flex-col items-start md:flex-row md:items-start md:justify-between gap-y-5 lg:pl-10">
                            {footerLinks.map((column, columnIndex) => (
                                <ul key={columnIndex} className="flex flex-col gap-y-2">
                                    <li className="mb-2 text-sm font-semibold text-primary">
                                        {column.title}
                                    </li>
                                    {column.links.map((link) => (
                                        <li
                                            key={link.id}
                                            className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug text-muted-foreground"
                                        >
                                            <Link href={link.url}>{link.title}</Link>
                                            <div className="flex size-4 items-center justify-center border border-border rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Pairly. All rights reserved.
                </p>
            </div>

            <div className="w-full h-48 md:h-64 relative z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-40%" />
                <div className="absolute inset-0 mx-6">
                    <FlickeringGrid
                        text={tablet ? 'Pairly' : 'Find your person'}
                        fontSize={tablet ? 70 : 90}
                        className="h-full w-full"
                        squareSize={2}
                        gridGap={tablet ? 2 : 3}
                        color="#6B7280"
                        maxOpacity={0.3}
                        flickerChance={0.1}
                    />
                </div>
            </div>
        </footer>
    )
}
