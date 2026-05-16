import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: "What's new — Changelog | Invomaker",
    description:
        'Recent features and improvements to Invomaker. We ship small updates often so invoicing stays simple.',
})

export default function ReleasesLayout({ children }: { children: React.ReactNode }) {
    return children
}
