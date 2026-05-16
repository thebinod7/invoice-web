import { buildPublicPageMetadata } from '../public-page-metadata';

export const metadata = buildPublicPageMetadata({
  title: 'Frequently asked questions | Invomaker',
  description:
    'Answers about our free invoice generator: pricing, sending invoices by email, PDF downloads, accounts, and more.',
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
