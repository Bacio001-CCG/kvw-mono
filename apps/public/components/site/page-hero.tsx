import type { CSSProperties, ReactNode } from "react";

import { cn } from "@workspace/ui/lib/utils";

type PageHeroProps = {
    eyebrow: string;
    title: ReactNode;
    description: ReactNode;
    visual?: ReactNode;
    actions?: ReactNode;
    className?: string;
    style?: CSSProperties;
};

export default function PageHero({ eyebrow, title, description, visual, actions, className, style }: PageHeroProps) {
    return (
        <section className={cn("relative isolate w-full overflow-x-clip", className)} style={style}>
            <div aria-hidden className="pointer-events-none absolute -left-56 -top-56 h-175 w-175 rounded-full bg-orange-300/35 blur-[140px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-56 -right-56 h-175 w-175 rounded-full bg-sky-300/35 blur-[140px]" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-105 w-105 -translate-x-1/2 rounded-full bg-orange-200/25 blur-[120px]" />

            <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-10" style={{ maxWidth: 1200 }}>
                <div className={cn("relative grid gap-8 py-6 sm:py-8 lg:py-10", visual ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : "")}>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">{eyebrow}</p>
                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
                            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
                        </div>

                        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
                    </div>

                    {visual && (
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-orange-400/25 via-transparent to-sky-400/25 blur-3xl" />
                            <div className="relative overflow-hidden rounded-[1.75rem] p-4 sm:p-5">
                                {visual}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}