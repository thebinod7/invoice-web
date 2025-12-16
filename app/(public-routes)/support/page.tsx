import { APP } from '@/app/constants';

export default function SupportPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto py-2 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-8">
                {APP.NAME} provides an invoice template that lets you make
                professional invoices in one-click. Generated invoices can be
                sent to your recipient.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                Why use {APP.NAME}?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Instant invoices
                  </h3>
                  <p className="text-gray-700">
                    We have developed the fastest way to make an invoice using
                    our invoice template. You can make and download an invoice
                    without creating account. If you want to send your invoice
                    it is only one button press away from delivering an
                    e-invoice to your client.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Invoice from any device
                  </h3>
                  <p className="text-gray-700">
                    Invoice on-the-go from any device, desktop, tablet, or
                    smartphone.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Trusted by Thousands
                  </h3>
                  <p className="text-gray-700">
                    Every month thousands of invoices are generated on{' '}
                    {APP.NAME}.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    100% FREE
                  </h3>
                  <p className="text-gray-700">
                    There are no limits. Use it as much as you like.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-8">
                Our objective at {APP.NAME} is to make invoicing as simple as
                possible. We built this {APP.NAME} solely dedicated to this
                purpose. We want to give you the best possible invoicing
                experience, and hope it saves you from the many frustrations
                that come with invoicing.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                Making Invoices
              </h2>
              <p className="text-gray-700 mb-8">
                Generating invoices is easy! Fill out the invoice template with
                all the details you want on your invoice. The invoice editor
                closely matches what the resulting invoice will look like. Once
                you have filled in the invoice template you are ready to
                download or send your invoice.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-700">
                  The download invoice button will throw an error until you fill
                  in your information and your client's information into the
                  to/from fields.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                Downloading Invoices
              </h2>
              <p className="text-gray-700 mb-8">
                Click the Download Invoice to download a PDF of your invoice. If
                you made a mistake, don't worry, you can go back and update the
                invoice. If you do not see your invoice once you click download
                then you should check your Downloads folder.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                System Requirements
              </h2>
              <p className="text-gray-700 mb-4">
                In order to use {APP.NAME} you must use one of the following web
                browsers:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                <li>Google Chrome: latest two versions</li>
                <li>Mozilla Firefox: latest two versions</li>
                <li>Apple Safari: latest two versions</li>
                <li>Microsoft Edge: latest two versions</li>
                <li>Internet Explorer 11</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
