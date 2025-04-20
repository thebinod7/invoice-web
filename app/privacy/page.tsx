import { APP } from '../constants';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="text-sm text-gray-500 mb-8">
            Last Updated: April 19, 2025
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-600">
                This Privacy Policy applies to the websites:
                {APP.NAME} (the "Sites") owned and operated by &nbsp;
                {APP.NAME} (collectively, "InvoMaker", "we", "us", or "our").
                This Privacy Policy describes how this website collects, uses,
                shares and secures the personal information you provide, as well
                as the human resources data transferred to us for processing on
                behalf of our customers. It also describes your choices
                regarding use, access and correction of your personal
                information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Collection
              </h2>
              <p className="text-gray-600 mb-3">
                We may collect the following personal information from you:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>
                  Contact Information, such as name, email address, mailing
                  address;
                </li>
                <li>
                  Demographic information, such as age, education, gender,
                  interests and zip code;
                </li>
                <li>Unique Identifiers, such as username</li>
                <li>Geo location based on IP address;</li>
                <li>
                  Information about your business, such as company name, company
                  size, business type.
                </li>
              </ul>
              <p className="text-gray-600 mt-3">
                When you provide us with personal information about your
                contacts we will only use this information for the specific
                reason for which it is provided. If you believe that one of your
                contacts has provided us with your personal information and you
                would like to request that it be removed from our database,
                please contact us at the contact information below.
              </p>
              <p className="text-gray-600 mt-3">
                As is true of most websites, we gather certain information
                automatically. This information may include Internet protocol
                (IP) addresses, browser type, Internet service provider (ISP),
                referring/exit pages, the files viewed on our site (e.g., HTML
                pages, graphics, etc.), operating system, date/time stamp,
                and/or clickstream data to analyze trends in the aggregate and
                administer the site.
              </p>
              <p className="text-gray-600 mt-3">
                {APP.NAME} and its partners use cookies or similar technologies
                to analyze trends, administer the website, track users'
                movements around the website, and to gather demographic
                information about our user base as a whole. You can control the
                use of cookies at the individual browser level, but if you
                choose to disable cookies, it may limit your use of certain
                features or functions on our website or service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Use</h2>
              <p className="text-gray-600">
                The personal information as indicated being collected above is
                used for identification, authentication, service improvement,
                research, and contact.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Information Sharing
              </h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                1. With Third Parties:
              </h3>
              <p className="text-gray-600 mb-3">
                We may share your information with third-party business
                partners, for instance, for the purpose of displaying
                advertisements or enhancing our products and services. If you do
                not want us to share your personal information with these
                companies, then please opt-out on the Cookie Consent screen.
              </p>
              <p className="text-gray-600 mb-3">
                We use a third-party to provide monetization technologies for
                our site. You can review their privacy and cookie policy here.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2. With Service Providers:
              </h3>
              <p className="text-gray-600 mb-3">
                We may share your information with third parties who provide
                services on our behalf to help with our business activities.
                These companies are authorized to use your personal information
                only as necessary to provide these services to us, to which
                these services may include:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Advertising</li>
                <li>Providing customer service</li>
                <li>Sending marketing communications</li>
                <li>Conducting research and analysis</li>
                <li>Providing cloud computing infrastructure</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                3. With Public Authorities or Law Enforcement:
              </h3>
              <p className="text-gray-600">
                In certain situations, {APP.NAME} may be required to disclose
                personal data in response to lawful requests by public
                authorities, including to meet national security or law
                enforcement requirements. We may also disclose your personal
                information as required by law, such as to comply with a
                subpoena or other legal process, when we believe in good faith
                that disclosure is necessary to protect our rights, when we
                believe there is a violation to our Terms of Service (see &nbsp;
                {APP.NAME} Terms of Service), protect your safety or the safety
                of others, investigate fraud, or respond to a government
                request. If {APP.NAME} is involved in a merger, acquisition, or
                sale of all or a portion of its assets, you will be notified via
                email and/or a prominent notice on our website, of any change in
                ownership, uses of your personal information, and choices you
                may have regarding your personal information. We do not sell,
                rent or share personal information with third parties without
                your prior consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Security
              </h2>
              <p className="text-gray-600 mt-3">
                If you have any questions about the security of your personal
                information, you can contact us at the contact information
                below. We may retain your information for as long as your
                account is active or as needed to provide you services, comply
                with our legal obligations, resolve disputes and enforce our
                agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Access
              </h2>
              <p className="text-gray-600">
                Upon request {APP.NAME} will provide you with information about
                whether we hold any of your personal information. You may
                access, correct, or request deletion of your personal
                information by logging into your account or by contacting us at
                the contact information below. We will respond to your request
                within a reasonable timeframe. In certain circumstances we may
                be required by law to retain your personal information, or may
                need to retain your personal information in order to continue
                providing a service.
              </p>
              <p className="text-gray-600 mt-3">
                {APP.NAME} acknowledges that you have the right to access your
                personal information. {APP.NAME} has no direct relationship with
                the individuals whose personal data it processes. An individual
                who seeks access, or who seeks to correct, amend, or delete
                inaccurate data should direct their query to the {APP.NAME}'s
                Client (the data controller). If requested to remove data we
                will respond within a reasonable timeframe. In certain
                circumstances we may be required by law to retain your personal
                information, or may need to retain your personal information in
                order to continue providing a service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Choice
              </h2>
              <p className="text-gray-600">
                We partner with a third party to manage our advertising on other
                sites. Our third party partner may use cookies or similar
                technologies in order to provide you advertising based upon your
                browsing activities and interests. Please note you will continue
                to receive generic ads. You can disable the use of cookies as
                per your need.
              </p>
              <p className="text-gray-600 mt-4">
                You may sign-up to receive email or newsletter or other
                communications from us. If you would like to discontinue
                receiving this information, you may update your email
                preferences by using the "Unsubscribe" link found in emails we
                send to you or by contacting us at the contact information
                below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy to reflect changes to our
                information practices. If we make any material changes we will
                notify you by email (sent to the e-mail address specified in
                your account) or by means of a notice on this website prior to
                the change becoming effective. We encourage you to periodically
                review this page for the latest information on our privacy
                practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Privacy Questions / Feedback
              </h2>
              <p className="text-gray-600">
                If you have questions or concerns about {APP.NAME}'s Privacy
                Policy please contact us at contact@invomaker.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
