import { Metadata } from 'next'
import { buildPublicPageMetadata } from '../../public-page-metadata'

export const metadata: Metadata = buildPublicPageMetadata({
    title: 'Free Invoice Generator — No Sign Up, No Account, Instant PDF',
    description:
        'Create professional invoices in seconds with our free invoice generator. Download your invoice as a PDF instantly.',
})
export default function FreeInvoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
    return children
}
