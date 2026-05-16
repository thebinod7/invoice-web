import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Create invoice online — Free PDF invoice maker | Invomaker',
    description:
        'Build a professional invoice online: add line items, your logo, and client details, then download a polished PDF. Free to use with optional account features.',
})

export default function CreateInvoiceLayout({ children }: { children: React.ReactNode }) {
    return children
}
