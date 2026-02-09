import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ArrowBigDown, Rocket } from 'lucide-react'
import Image from 'next/image'

const userAvatars = [
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader1',
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader2',
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader3',
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader4',
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader5',
    'https://api.dicebear.com/7.x/avataaars/png?seed=Reader6',
]

export const HeroSection = () => {
    return (
        <section className="py-10 mx-auto flex flex-col gap-10 items-center relative">
            <Badge className="bg-transparent h-12 border-2 border-primary border-dashed text-primary font-bold text-xl">
                ✨ Trusted by thousands of people looking for meaningful connections.
            </Badge>

            <h1 className="text-7xl font-extrabold  max-w-6xl text-center leading-20 uppercase">
                Find someone who actually{' '}
                <span className="italic text-primary">fits your life</span>.
            </h1>
            <p className="text-2xl text-center max-w-4xl leading-10">
                Pairly helps you connect with people through shared values, habits, and real
                compatibility, not endless swiping.
            </p>

            <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                    {userAvatars.map((avatar, idx) => (
                        <div
                            key={idx}
                            className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden"
                        >
                            <Image
                                width={200}
                                height={200}
                                src={avatar}
                                alt={`User ${idx + 1}`}
                                className="w-full h-full object-cover"
                                unoptimized={avatar.endsWith('.svg')}
                            />
                        </div>
                    ))}
                </div>
                <h3 className="italic text-primary text-xl font-extrabold">
                    Join 500+ early Pairly users
                </h3>{' '}
            </div>
            <div className="flex gap-3">
                <Button className="h-14 text-lg flex gap-3">
                    Get started <Rocket className="size-6" />
                </Button>
                <Button
                    className="h-14  border-2 border-dashed text-lg flex gap-3"
                    variant={'outline'}
                >
                    See how Pairly works <ArrowBigDown className="size-6" />
                </Button>
            </div>

            <div className="absolute rounded-full size-90 bg-primary -z-50 blur-[110px] -right-72 bottom-0" />
            <div className="absolute rounded-full size-90 bg-primary -z-50 blur-[110px] -left-70" />
        </section>
    )
}
