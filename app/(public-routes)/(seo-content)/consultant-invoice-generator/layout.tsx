import type { Metadata } from 'next'
import { buildPublicPageMetadata } from '../../public-page-metadata'

export const metadata: Metadata = buildPublicPageMetadata({
    title: 'Free Consultant Invoice Generator — Hourly, Retainer & Project Billing',
    description:
        'Create professional consulting invoices in seconds. Bill by hour, project, milestone, or retainer. Free, no sign up, instant PDF download.',
})

export default function ConsultantInvoiceGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
