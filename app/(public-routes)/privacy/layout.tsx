import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Privacy Policy | Invomaker',
    description:
        'How Invomaker collects, uses, and protects your personal information when you use our invoice tools and website.',
    path: '/privacy',
})

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children
}
