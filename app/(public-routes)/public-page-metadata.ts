import type { Metadata } from 'next'
import { DEFAULT_METADATA, DEFAULT_OG_IMAGE_URL, SITE_ORIGIN } from '@/app/constants'

type BuildPublicPageMetadataOptions = {
    title: string
    description: string
    path: string
}

function absoluteUrl(path: string) {
    return `${SITE_ORIGIN}${path === '/' ? '' : path}`
}

export function buildPublicPageMetadata({
    title,
    description,
    path,
}: BuildPublicPageMetadataOptions): Metadata {
    const url = absoluteUrl(path)
    return {
        ...DEFAULT_METADATA,
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            url,
            title,
            description,
            images: [
                {
                    url: DEFAULT_OG_IMAGE_URL,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                {
                    url: DEFAULT_OG_IMAGE_URL,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    }
}
