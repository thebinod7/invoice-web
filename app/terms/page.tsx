import { APP } from '../constants';

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="text-sm text-gray-500 mb-8">
            Last Updated: April 19, 2025
          </div>

          <div className="space-y-6">
            <section>
              <p className="text-gray-600">
                Please read this agreement carefully before using this service.
              </p>
              <p className="text-gray-600 mt-3">
                By using the service or clicking "agree" customer is agreeing to
                be bound by this agreement. If customer is agreeing to this
                agreement on behalf of or for the benefit of its employer, then
                customer represents and warrants that it has the necessary
                authority to agree to this agreement on its employer's behalf.
              </p>
              <p className="text-gray-600 mt-3">
                This agreement is between {APP.NAME}, and the customer agreeing
                to these terms (Customer).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                1. Software-as-a-Service
              </h2>
              <p className="text-gray-600">
                This agreement provides Customer access to and usage of an
                Internet based software service as specified on an order and as
                further outlined at: invomaker.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                2. Use of Service
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                a. Customer Owned Data
              </h3>
              <p className="text-gray-600">
                All data and logos uploaded by Customer remains the property of
                Customer, as between InvoMaker and Customer (Customer Data).
                Customer grants InvoMaker the right to use, publicly display and
                distribute the Customer Data for purposes of performing under
                this agreement.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                b. Contractor Access and Usage
              </h3>
              <p className="text-gray-600">
                Customer may allow its contractors to access the Service in
                compliance with the terms of this agreement, which access must
                be for the sole benefit of Customer. Customer is responsible for
                the compliance with this agreement by its contractors.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                c. Customer Responsibilities
              </h3>
              <p className="text-gray-600">
                Customer (i) must keep its passwords secure and confidential;
                (ii) is solely responsible for Customer Data and all activity in
                its account in the Service; (iii) must use commercially
                reasonable efforts to prevent unauthorized access to its
                account, and notify {APP.NAME} promptly of any such unauthorized
                access; and (iv) may use the Service only in accordance with the
                Service's Knowledge Base and applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                3. Disclaimer
              </h2>
              <p className="text-gray-600 uppercase">
                {APP.NAME} disclaims all warranties, including, without
                limitation, the implied warranties of merchantability, title and
                fitness for a particular purpose. While {APP.NAME} takes
                reasonable physical, technical and administrative measures to
                secure the Service, {APP.NAME} does not guarantee that the
                Service cannot be compromised. Customer understands that the
                Service may not be error free, and use may be interrupted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                4. Mutual Confidentiality and Data Protection
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                a. Definition of Confidential Information
              </h3>
              <p className="text-gray-600">
                Confidential Information means all non-public information
                disclosed by a party (Discloser) to the other party (Recipient),
                whether orally or in writing, that is designated as confidential
                or that reasonably should be understood to be confidential given
                the nature of the information and the circumstances of
                disclosure (Confidential Information). {APP.NAME}'s Confidential
                Information includes without limitation the Service (including
                without limitation the Service user interface design and layout,
                and pricing information).
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                b. Protection of Confidential Information
              </h3>
              <p className="text-gray-600">
                The Recipient must use the same degree of care that it uses to
                protect the confidentiality of its own confidential information
                (but in no event less than reasonable care) not to disclose or
                use any Confidential Information of the Discloser for any
                purpose outside the scope of this agreement. The Recipient must
                make commercially reasonable efforts to limit access to
                Confidential Information of Discloser to those of its employees
                and contractors who need such access for purposes consistent
                with this agreement and who have signed confidentiality
                agreements with Recipient no less restrictive than the
                confidentiality terms of this agreement.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                c. Exclusions
              </h3>
              <p className="text-gray-600">
                Confidential Information excludes information that: (i) is or
                becomes generally known to the public without breach of any
                obligation owed to Discloser, (ii) was known to the Recipient
                prior to its disclosure by the Discloser without breach of any
                obligation owed to the Discloser, (iii) is received from a third
                party without breach of any obligation owed to Discloser, or
                (iv) was independently developed by the Recipient without use or
                access to the Confidential Information. The Recipient may
                disclose Confidential Information to the extent required by law
                or court order, but will provide Discloser with advance notice
                to seek a protective order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                5. Proprietary Property
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                a. Reservation of Rights
              </h3>
              <p className="text-gray-600">
                The software, workflow processes, user interface, designs,
                know-how, and other technologies provided by {APP.NAME}
                as part of the Service are the proprietary property of Invoice
                Generator and its licensors, and all right, title and interest
                in and to such items, including all associated intellectual
                property rights, remain only with {APP.NAME}. Customer may not
                remove or modify any proprietary marking or restrictive legends
                in the Service. {APP.NAME} reserves all rights unless expressly
                granted in this agreement.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                b. Restrictions
              </h3>
              <p className="text-gray-600">
                Customer may not (i) sell, resell, rent or lease the Service or
                use it in a service provider capacity; (ii) use the Service to
                store or transmit infringing, unsolicited marketing emails,
                libelous, or otherwise objectionable, unlawful or tortious
                material, or to store or transmit material in violation of
                third-party rights; (iii) interfere with or disrupt the
                integrity or performance of the Service; (iv) attempt to gain
                unauthorized access to the Service or their related systems or
                networks; (v) reverse engineer the Service; or (vi) access the
                Service to build a competitive service or product, or copy any
                feature, function or graphic for competitive purposes.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                c. Aggregate Data
              </h3>
              <p className="text-gray-600">
                During and after the term of this agreement, {APP.NAME}
                may use non-personally identifiable Customer Data within the
                Service for purposes of enhancing the Service, aggregated
                statistical analysis, technical support and other business
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                6. Term and Termination
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                a. Term
              </h3>
              <p className="text-gray-600">
                This agreement continues until all orders have terminated.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                b. Maintenance of Customer Data
              </h3>
              <p className="text-gray-600">
                Within 90-days after termination, Customer Data will be
                available. After such 90-day period, {APP.NAME} has no
                obligation to maintain the Customer Data and may destroy it.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                c. Return {APP.NAME} Property Upon Termination
              </h3>
              <p className="text-gray-600">
                Upon termination of this agreement for any reason, Customer must
                pay {APP.NAME} for any unpaid amounts, and destroy or return all
                property of {APP.NAME}. Upon Invoice Generator's request,
                Customer will confirm in writing its compliance with this
                destruction or return requirement.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                d. Suspension for Violations of Law
              </h3>
              <p className="text-gray-600">
                {APP.NAME} may temporarily suspend the Service or remove the
                applicable Customer Data, or both, if it in good faith believes
                that, as part of using the Service, Customer has violated a law.{' '}
                {APP.NAME} will attempt to contact Customer in advance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                7. Indemnity
              </h2>
              <p className="text-gray-600">
                If any third-party brings a claim against {APP.NAME}, or
                requires {APP.NAME} to respond to a legal process, related to
                Customer's acts, omissions, data or information within the
                Software, Customer must defend, indemnify and hold &nbsp;
                {APP.NAME} harmless from and against all damages, losses, and
                expenses of any kind (including reasonable legal fees and costs)
                related to such claim or request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                8. Other Terms
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                a. Entire Agreement and Changes
              </h3>
              <p className="text-gray-600">
                This agreement and the order constitute the entire agreement
                between the parties and supersede any prior or contemporaneous
                negotiations or agreements, whether oral or written, related to
                this subject matter. Customer is not relying on any
                representation concerning this subject matter, oral or written,
                not included in this agreement. No representation, promise or
                inducement not included in this agreement is binding. No
                modification of this agreement is effective unless both parties
                sign it, and no waiver is effective unless the party waiving the
                right signs a waiver in writing.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                b. No Assignment
              </h3>
              <p className="text-gray-600">
                Neither party may assign or transfer this agreement or an order
                to a third party, except that this agreement with all orders may
                be assigned, without the consent of the other party, as part of
                a merger, or sale of substantially all the assets, of a party.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                c. Independent Contractors
              </h3>
              <p className="text-gray-600">
                The parties are independent contractors with respect to each
                other.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                d. Enforceability and Force Majeure
              </h3>
              <p className="text-gray-600">
                If any term of this agreement is invalid or unenforceable, the
                other terms remain in effect. Except for the payment of monies,
                neither party is liable for events beyond its reasonable
                control, including, without limitation force majeure events.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                e. No Additional Terms
              </h3>
              <p className="text-gray-600">
                {APP.NAME} rejects additional or conflicting terms of any
                Customer form-purchasing document.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                i. Feedback
              </h3>
              <p className="text-gray-600">
                By submitting ideas, suggestions or feedback to {APP.NAME}{' '}
                regarding the Service, Customer agrees that such items submitted
                do not contain confidential or proprietary information; and
                Customer hereby grants {APP.NAME} an irrevocable, unlimited,
                royalty-free and fully-paid perpetual license to use such items
                for any business purpose.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
