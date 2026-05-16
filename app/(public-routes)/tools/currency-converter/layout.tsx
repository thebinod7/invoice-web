import { buildPublicPageMetadata } from '../../public-page-metadata';

export const metadata = buildPublicPageMetadata({
  title: 'Currency converter — live exchange rates | Invomaker',
  description:
    'Convert amounts between major world currencies using up-to-date rates. Quick tool for invoices and international clients.',
});

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
