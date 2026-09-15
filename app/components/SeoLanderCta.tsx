import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { APP_PATHS } from '@/app/constants'

type RelatedLink = {
    href: string
    label: string
}

type SeoLanderCtaProps = {
    label?: string
    relatedLinks?: RelatedLink[]
}

export default function SeoLanderCta({
    label = 'Create Free Invoice',
    relatedLinks,
}: SeoLanderCtaProps) {
    return (
        <div className="mt-8 space-y-3">
            <Link
                href={APP_PATHS.CREATE_INVOICE}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
                {label}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
            {relatedLinks && relatedLinks.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                    Also see:{' '}
                    {relatedLinks.map((link, i) => (
                        <span key={link.href}>
                            {i > 0 ? ' · ' : null}
                            <Link
                                href={link.href}
                                className="font-medium text-emerald-700 underline-offset-2 hover:underline"
                            >
                                {link.label}
                            </Link>
                        </span>
                    ))}
                </p>
            ) : null}
        </div>
    )
}
