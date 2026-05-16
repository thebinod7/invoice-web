import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Pricing — Free & Starter plans | Invomaker',
    description:
        'Start free, then upgrade when you need more invoice sends, reminder emails, and an ad-free workflow. Simple pricing with no hidden fees.',
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children
}
