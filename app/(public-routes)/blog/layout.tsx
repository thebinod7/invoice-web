import { buildPublicPageMetadata } from '../public-page-metadata';

export const metadata = buildPublicPageMetadata({
  title: 'Blog — Invoice tips & tutorials | Invomaker',
  description:
    'Discover insights, tutorials, and the latest trends in invoice generation, freelancing, and getting paid faster.',
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
