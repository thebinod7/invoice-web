import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Free tools | Invomaker',
    description:
        'Free online tools for freelancers and small businesses: timezone converter, currency converter, and invoice generator.',
    path: '/tools',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return children
}
