import type { Metadata } from 'next'
import { buildPublicPageMetadata } from '../../public-page-metadata'

export const metadata: Metadata = buildPublicPageMetadata({
    title: 'Free Invoice Generator for USA & Canada — USD, CAD, GST, HST, Sales Tax',
    description:
        'Create free professional invoices for US and Canadian businesses. Supports USD & CAD, sales tax, GST, HST, and PST. No sign up required. Download PDF invoices instantly.',
})

export default function InvoiceGeneratorUsaCanadaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
