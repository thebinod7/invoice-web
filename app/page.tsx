import { Metadata } from 'next';
import InvoiceGenerator from './components/Invoice/InvoiceGenerator';
import { APP, DEFAULT_METADATA, DEFAULT_OG_IMAGE_URL } from './constants';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = APP.TITLE;
  const description = APP.DESCRIPTION;
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
  };
};

export default function Home() {
  return (
    <>
      <InvoiceGenerator />
    </>
  );
}
