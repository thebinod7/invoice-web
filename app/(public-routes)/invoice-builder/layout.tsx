import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Invoice Builder – Create & Send Invoices Online in Seconds| Invomaker',
    description:
        'Build and send professional invoices in seconds. Just describe your work and let AI generate the invoice instantly. Track payments, send reminders, and get paid faster.',
})

export default function InvoiceBuilderLayout({ children }: { children: React.ReactNode }) {
    return children
}
