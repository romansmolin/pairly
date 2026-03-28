interface LegalPageProps {
    title: string
    lastUpdated: string
    children: React.ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
                    {title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Last updated: {lastUpdated}
                </p>
            </div>
            <div className="prose prose-slate max-w-none [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-muted-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:mb-2 [&_li]:leading-7 [&_a]:text-primary [&_a]:underline">
                {children}
            </div>
        </section>
    )
}
