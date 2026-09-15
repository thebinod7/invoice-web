import { Metadata } from 'next';
import { buildPublicPageMetadata } from '../../public-page-metadata';

export const generateMetadata = async (): Promise<Metadata> => {
  return buildPublicPageMetadata({
    title: 'About Us | Invomaker',
    description:
      'Learn about Invomaker — a simple invoicing tool for freelancers and small businesses. Our mission is to make creating and sending professional invoices fast and accessible.',
    path: '/free-invoice-maker',
  });
};

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            About Us
          </h1>

          <div className="space-y-8">
            <section>
              <p className="text-gray-600">
                Invomaker is a simple invoicing product for freelancers and
                small businesses. We built it so you can create, send, and track
                professional invoices without wrestling with spreadsheets or
                bloated accounting software.
              </p>
            </section>

            <section>
              <p className="text-gray-600 mt-3">
                You can start without an account for basic use, or sign up when
                you want history, clients, and reminders. No catch for getting
                started: fill in your details, download a PDF, and send it when
                you are ready.
              </p>
              <p className="text-gray-600 mt-3">
                The product supports custom logos, multiple currencies, tax and
                discount options, and the extras that come with a paid plan when
                your volume grows. We keep the interface focused so the job stays
                quick.
              </p>
              <p className="text-gray-600 mt-3">
                We care about making invoicing easier and more accessible. If
                something is unclear or missing, tell us. Feedback shapes what we
                ship next.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                What we are building toward
              </h2>
              <p className="text-gray-600">
                We keep improving the product based on how people actually
                invoice: clearer flows, better tracking, and features that remove
                busywork. This is early, and with your support we aim to stay the
                straightforward option freelancers reach for when they need to
                get paid.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
