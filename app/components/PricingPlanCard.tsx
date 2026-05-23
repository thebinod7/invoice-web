import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

function FeatureList({
    items,
    checkClassName,
    textClassName,
    firstItemMuted,
}: {
    items: readonly string[]
    checkClassName: string
    textClassName: string
    firstItemMuted?: boolean
}) {
    return (
        <ul className="divide-y divide-gray-100">
            {items.map((feature, i) => (
                <li key={feature} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
                    <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${checkClassName}`}
                        strokeWidth={2.5}
                        aria-hidden
                    />
                    <span
                        className={`text-sm leading-relaxed ${
                            firstItemMuted && i === 0 ? 'italic text-gray-500' : textClassName
                        }`}
                    >
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    )
}

type PricingPlanCardProps = {
    title: string
    pricing: ReactNode
    features: readonly string[]
    highlighted?: boolean
    badge?: ReactNode
    firstItemMuted?: boolean
    footer?: ReactNode
    className?: string
}

export default function PricingPlanCard({
    title,
    pricing,
    features,
    highlighted = false,
    badge,
    firstItemMuted,
    footer,
    className,
}: PricingPlanCardProps) {
    return (
        <section
            className={cn(
                'flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6',
                highlighted
                    ? 'relative border-2 border-emerald-500 pt-7 sm:pt-8'
                    : 'border border-gray-200 transition-colors hover:border-gray-300',
                className
            )}
        >
            {badge}

            <div className="mb-5 space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
            </div>

            <div className="mb-6 min-h-[8.75rem] rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                {pricing}
            </div>

            <div className="flex-1">
                <FeatureList
                    items={features}
                    checkClassName="text-emerald-600"
                    textClassName="text-gray-900"
                    firstItemMuted={firstItemMuted}
                />
            </div>

            {footer}
        </section>
    )
}
