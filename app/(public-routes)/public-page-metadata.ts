import type { Metadata } from 'next'
import { DEFAULT_METADATA, DEFAULT_OG_IMAGE_URL } from '@/app/constants'

type BuildPublicPageMetadataOptions = {
    title: string
    description: string
}

export function buildPublicPageMetadata({
    title,
    description,
}: BuildPublicPageMetadataOptions): Metadata {
    return {
        ...DEFAULT_METADATA,
        title,
        description,
        openGraph: {
            type: 'website',
            url: process?.env?.NEXT_PUBLIC_APP_URL,
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
