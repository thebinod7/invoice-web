import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Support | Invomaker',
    description:
        'Help and guidance for using Invomaker — create invoices, send them to clients, and get answers to common questions.',
    path: '/support',
})

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    return children
}
