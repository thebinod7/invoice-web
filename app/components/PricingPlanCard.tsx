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
}

export default function PricingPlanCard({
    title,
    pricing,
    features,
    highlighted = false,
    badge,
    firstItemMuted,
    footer,
}: PricingPlanCardProps) {
    return (
        <section
            className={
                highlighted
                    ? 'relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-white p-5 pt-7 shadow-sm sm:p-6 sm:pt-8'
                    : 'flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-300 sm:p-6'
            }
        >
            {badge}

            <div className="mb-5 space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
            </div>

            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50/80 p-4">{pricing}</div>

            <FeatureList
                items={features}
                checkClassName="text-emerald-600"
                textClassName="text-gray-900"
                firstItemMuted={firstItemMuted}
            />

            {footer}
        </section>
    )
}
