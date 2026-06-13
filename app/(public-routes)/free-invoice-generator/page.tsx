import AdBanner from '@/app/components/AdBanner'
import { GOOGLE_AD } from '@/app/constants'

export default function FreeInvoiceGeneratorPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            {/* Hero */}
            <section className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Free Invoice Generator. No Sign Up Required
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Create a professional invoice in under a minute. Fill in your details, add your
                    line items, and download a clean PDF completely free, with no account needed and
                    no strings attached.
                </p>

                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>
            </section>

            {/* How it works */}
            <section className="mb-16">
                <h2 className="mb-6 text-3xl font-semibold">
                    How to Create a Free Invoice in 3 Steps
                </h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-medium">Step 1: Add your business details</h3>
                        <p className="mt-2 text-muted-foreground">
                            Enter your name or business name, address, and contact information. You
                            can also upload your logo for a branded, professional look.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">
                            Step 2: Add your client and line items
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Enter your client's details, describe the work or products, set
                            quantities, rates, and tax if applicable. Totals calculate
                            automatically.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Step 3: Download or send your PDF</h3>
                        <p className="mt-2 text-muted-foreground">
                            Hit download and get a print-ready PDF invoice instantly. No email
                            required. No account. No waiting.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="mb-16">
                <h2 className="mb-6 text-3xl font-semibold">
                    Why Use a Free Invoice Generator With No Sign Up?
                </h2>

                <p className="mb-6 text-muted-foreground">
                    Most invoicing tools make you create an account, verify your email, and wade
                    through a dashboard before you can send a single invoice. That's friction you
                    don't need — especially when you just need to bill a client quickly.
                </p>

                <ul className="space-y-4">
                    <li>
                        <strong>No registration required</strong> — open the tool and start
                        immediately.
                    </li>
                    <li>
                        <strong>No data stored</strong> — your invoice details stay in your browser,
                        never on our servers.
                    </li>
                    <li>
                        <strong>No hidden fees</strong> — free means free, no trial periods, no
                        credit card.
                    </li>
                    <li>
                        <strong>No watermarks</strong> — your PDF looks professional, with no
                        third-party branding.
                    </li>
                    <li>
                        <strong>No limits</strong> — create as many invoices as you need, forever.
                    </li>
                </ul>

                <p className="mt-6 text-muted-foreground">
                    Whether you're a freelancer sending your first invoice, a contractor billing a
                    one-time client, or a small business owner who just needs something fast — this
                    tool is built for you.
                </p>
            </section>

            {/* Invoice guide */}
            <section className="mb-16">
                <h2 className="mb-6 text-3xl font-semibold">
                    What to Include in a Professional Invoice
                </h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-medium">Your business information</h3>
                        <p className="mt-2 text-muted-foreground">
                            Include your full name or business name, address, email, and phone
                            number. If you're VAT or GST registered, include your registration
                            number.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Client information</h3>
                        <p className="mt-2 text-muted-foreground">
                            Add your client's name, company name (if applicable), and billing
                            address.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Invoice number</h3>
                        <p className="mt-2 text-muted-foreground">
                            Every invoice needs a unique number. Keep them sequential for easy
                            tracking and accounting.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Invoice date and due date</h3>
                        <p className="mt-2 text-muted-foreground">
                            Common payment terms are Net 7, Net 15, and Net 30.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Itemized services or products</h3>
                        <p className="mt-2 text-muted-foreground">
                            List each item with a description, quantity, unit price, and total.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Subtotal, tax, and total</h3>
                        <p className="mt-2 text-muted-foreground">
                            Clearly show subtotal, tax amount, and final total due.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Payment instructions</h3>
                        <p className="mt-2 text-muted-foreground">
                            Tell your client exactly how to pay.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Notes (optional)</h3>
                        <p className="mt-2 text-muted-foreground">
                            Add a thank-you note, payment terms, or project-specific details.
                        </p>
                    </div>
                </div>
            </section>

            {/* Audience */}
            <section className="mb-16">
                <h2 className="mb-6 text-3xl font-semibold">Who Is This Tool For?</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-medium">Freelancers</h3>
                        <p className="mt-2 text-muted-foreground">
                            Designers, writers, developers, photographers, and other project-based
                            professionals.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Contractors and tradespeople</h3>
                        <p className="mt-2 text-muted-foreground">
                            Plumbers, electricians, builders, and handymen who need invoices
                            quickly.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Small business owners</h3>
                        <p className="mt-2 text-muted-foreground">
                            Businesses that bill clients occasionally and don't need complex
                            accounting software.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Consultants</h3>
                        <p className="mt-2 text-muted-foreground">
                            IT, marketing, and business consultants billing hourly or by project.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Anyone billing for the first time</h3>
                        <p className="mt-2 text-muted-foreground">
                            Create a professional invoice in minutes without learning accounting
                            software.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
                <h2 className="mb-6 text-3xl font-semibold">Frequently Asked Questions</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Is this invoice generator really free?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. No subscriptions, no trials, and no credit card required.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Do I need to create an account?</h3>
                        <p className="mt-2 text-muted-foreground">
                            No. The tool works entirely in your browser.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Will my invoice have any watermarks?</h3>
                        <p className="mt-2 text-muted-foreground">
                            No. Your PDF contains only your branding.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Is my data safe?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Your invoice data stays in your browser and is never stored on our
                            servers.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I add my logo?</h3>
                        <p className="mt-2 text-muted-foreground">Yes.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I add tax?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. GST, VAT, sales tax, and other tax rates are supported.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">What currencies are supported?</h3>
                        <p className="mt-2 text-muted-foreground">
                            USD, EUR, GBP, NPR, INR, AUD, and more.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I save my invoice to edit later?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Download your PDF before leaving the page. For invoice management,
                            create a free account.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">What format is the invoice downloaded in?</h3>
                        <p className="mt-2 text-muted-foreground">PDF.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Is it mobile friendly?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. Works on phones, tablets, and desktops.
                        </p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section>
                <h2 className="mb-6 text-3xl font-semibold">
                    Free Invoice Generator vs. Paid Invoicing Software
                </h2>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Feature</th>
                                <th className="p-4">Free Generator</th>
                                <th className="p-4">Paid Software</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Cost</td>
                                <td className="p-4">Free Forever</td>
                                <td className="p-4">$10–$50/month</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Sign Up Required</td>
                                <td className="p-4">No</td>
                                <td className="p-4">Yes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Invoice Creation</td>
                                <td className="p-4">✓</td>
                                <td className="p-4">✓</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">PDF Download</td>
                                <td className="p-4">✓</td>
                                <td className="p-4">✓</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Invoice History</td>
                                <td className="p-4">✗</td>
                                <td className="p-4">✓</td>
                            </tr>
                            <tr>
                                <td className="p-4">Recurring Invoices</td>
                                <td className="p-4">✗</td>
                                <td className="p-4">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-6 text-muted-foreground">
                    If you just need to create and download a professional invoice right now, this
                    free invoice generator is all you need. If you regularly invoice clients and
                    need payment tracking, recurring billing, and client management, a paid
                    invoicing platform may be a better fit.
                </p>
            </section>
        </main>
    )
}
