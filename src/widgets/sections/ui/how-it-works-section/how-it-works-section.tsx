'use client'

import { cn } from '@/shared/lib/css/utils'
import BlurText from '@/shared/components/BlurText'
import DecryptedText from '@/shared/components/DecryptedText'
import { ScrollReveal } from '@/shared/ui/scroll-reveal'
import Image from 'next/image'

const defaultSteps = [
    {
        title: 'Create your profile',
        description:
            'Share your values, lifestyle, and relationship goals so we can understand what truly matters to you.',
    },
    {
        title: 'Get curated matches',
        description:
            'Pairly highlights people with strong compatibility, so every match is intentional from the start.',
    },
    {
        title: 'Start meaningful chats',
        description:
            'Use guided prompts to move beyond small talk and begin conversations that feel natural and genuine.',
    },
    {
        title: 'Meet with confidence',
        description:
            'Built-in safety tools and clear intentions help you connect with more trust and less guesswork.',
    },
]

const stepNumbers = ['01', '02', '03', '04']

export function HowItWorksSection() {
    return (
        <section className={cn('container mx-auto')} id="how-it-works">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="flex justify-between items-center gap-8 mb-12 md:mb-20">
                    <div>
                        <BlurText
                            text="How Pairly works"
                            animateBy="words"
                            delay={100}
                            direction="bottom"
                            className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl"
                            animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
                            animationTo={[
                                { filter: 'blur(5px)', opacity: 0.5, y: 5 },
                                { filter: 'blur(0px)', opacity: 1, y: 0 },
                            ]}
                        />
                    </div>
                    <ScrollReveal delay={0.15} distance={15}>
                        <div className="flex items-start md:items-center">
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                A simpler way to meet people who truly fit your life.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full">
                        {/* Step 01 */}
                        <ScrollReveal direction="horizontal" distance={-50} delay={0.1}>
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    <DecryptedText
                                        text={stepNumbers[0]}
                                        animateOn="view"
                                        speed={40}
                                        maxIterations={8}
                                        characters="0123456789"
                                        sequential
                                        revealDirection="start"
                                        className="text-xs font-bold text-slate-400 tracking-wider"
                                    />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {defaultSteps[0]?.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs">
                                    {defaultSteps[0]?.description}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Step 02 */}
                        <ScrollReveal direction="horizontal" distance={-50} delay={0.25}>
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    <DecryptedText
                                        text={stepNumbers[1]}
                                        animateOn="view"
                                        speed={40}
                                        maxIterations={8}
                                        characters="0123456789"
                                        sequential
                                        revealDirection="start"
                                        className="text-xs font-bold text-slate-400 tracking-wider"
                                    />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {defaultSteps[1]?.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs">
                                    {defaultSteps[1]?.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Center Column - Visual */}
                    <ScrollReveal distance={40} delay={0} scale={0.95}>
                        <div className="shrink-0 w-full md:w-auto">
                            <div className="relative w-full md:w-70 lg:w-[320px] xl:w-90 aspect-3/4 rounded-3xl overflow-hidden shadow-2xl mx-auto">
                                <Image
                                    src="/assets/Gemini_Generated_Image_i509epi509epi509.png"
                                    alt="Pairly matching preview"
                                    fill
                                    className="object-cover"
                                    priority={false}
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Column - Steps 03 & 04 */}
                    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16 lg:gap-20 w-full md:items-end">
                        {/* Step 03 */}
                        <ScrollReveal direction="horizontal" distance={50} delay={0.1}>
                            <div className="space-y-2 md:text-right">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    <DecryptedText
                                        text={stepNumbers[2]}
                                        animateOn="view"
                                        speed={40}
                                        maxIterations={8}
                                        characters="0123456789"
                                        sequential
                                        revealDirection="start"
                                        className="text-xs font-bold text-slate-400 tracking-wider"
                                    />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {defaultSteps[2]?.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs md:ml-auto">
                                    {defaultSteps[2]?.description}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Step 04 */}
                        <ScrollReveal direction="horizontal" distance={50} delay={0.25}>
                            <div className="space-y-2 md:text-right">
                                <div className="text-xs font-bold text-slate-400 tracking-wider">
                                    <DecryptedText
                                        text={stepNumbers[3]}
                                        animateOn="view"
                                        speed={40}
                                        maxIterations={8}
                                        characters="0123456789"
                                        sequential
                                        revealDirection="start"
                                        className="text-xs font-bold text-slate-400 tracking-wider"
                                    />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {defaultSteps[3]?.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-xs md:ml-auto">
                                    {defaultSteps[3]?.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
