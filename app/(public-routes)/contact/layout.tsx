import { buildPublicPageMetadata } from '../public-page-metadata'

export const metadata = buildPublicPageMetadata({
    title: 'Contact Us | Invomaker',
    description:
        'Get in touch with the Invomaker team. Send feedback, ask a question, or request support for the free invoice generator.',
    path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
