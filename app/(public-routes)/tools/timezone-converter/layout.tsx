import { buildPublicPageMetadata } from '../../public-page-metadata';

export const metadata = buildPublicPageMetadata({
  title: 'Timezone converter — free online tool | Invomaker',
  description:
    'Convert a date and time between time zones instantly. Pick source and destination regions and see the result in one place.',
});

export default function TimezoneConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
