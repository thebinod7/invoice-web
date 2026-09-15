import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Terms of Service | Invomaker',
    description:
        'Terms governing use of Invomaker.com, including our free invoice generator and related services.',
    path: '/terms',
})

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children
}
