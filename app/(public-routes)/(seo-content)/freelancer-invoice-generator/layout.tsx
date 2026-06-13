import { Metadata } from 'next'
import { buildPublicPageMetadata } from '../../public-page-metadata'

export const metadata: Metadata = buildPublicPageMetadata({
    title: 'Free Freelancer Invoice Generator — Create & Download PDF Instantly',
    description:
        'Generate professional freelancer invoices in seconds. No sign up, no account, no fees. Download as PDF and get paid faster.',
})
export default function FreelancerInvoiceGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
