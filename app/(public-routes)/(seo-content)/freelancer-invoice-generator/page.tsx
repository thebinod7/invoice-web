// app/freelancer-invoice-generator/page.tsx

import AdBanner from '@/app/components/AdBanner'
import { GOOGLE_AD } from '@/app/constants'

export default function FreelancerInvoiceGeneratorPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            {/* Hero */}
            <section className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Free Freelancer Invoice Generator
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Stop chasing clients. Start sending invoices that get you paid. Create a
                    professional freelancer invoice in under a minute; no account, no subscription,
                    no watermarks.
                </p>

                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>
            </section>

            {/* Built For */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Built for Every Type of Freelancer</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        [
                            'Designers',
                            'Graphic designers, UI/UX designers, and brand designers billing projects or retainers.',
                        ],
                        [
                            'Developers',
                            'Web developers, app developers, and engineers billing hourly or by project.',
                        ],
                        [
                            'Writers & Editors',
                            'Content writers, copywriters, editors, and technical writers.',
                        ],
                        [
                            'Photographers & Videographers',
                            'Invoices for shoots, editing work, licensing, and creative projects.',
                        ],
                        [
                            'Consultants',
                            'Marketing, business, HR, and IT consultants billing advisory work.',
                        ],
                        [
                            'Coaches & Tutors',
                            'Life coaches, business coaches, tutors, and educators.',
                        ],
                    ].map(([title, description]) => (
                        <div key={title} className="rounded-lg border p-5">
                            <h3 className="font-semibold">{title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-muted-foreground">
                    If you trade your time, expertise, or creative skills for money, this invoice
                    generator is for you.
                </p>
            </section>

            {/* Steps */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    How to Create a Freelancer Invoice in 3 Steps
                </h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-medium">Step 1 — Enter your details</h3>
                        <p className="mt-2 text-muted-foreground">
                            Add your name, business details, email, and phone number. If you have a
                            logo, upload it. A branded invoice instantly looks more professional.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">
                            Step 2 — Add your client and services
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Enter your client's information and list the work you've completed. Add
                            hours, quantities, rates, or fixed project fees. Totals calculate
                            automatically.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Step 3 — Download your PDF</h3>
                        <p className="mt-2 text-muted-foreground">
                            Download a clean PDF instantly and send it however you prefer — email,
                            WhatsApp, Slack, or client portal.
                        </p>
                    </div>
                </div>
            </section>

            {/* Invoice Guide */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    What Should a Freelancer Invoice Include?
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Your details</h3>
                        <p className="mt-2 text-muted-foreground">
                            Include your name, business name (if applicable), email, address, phone
                            number, and tax registration details.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Client information</h3>
                        <p className="mt-2 text-muted-foreground">
                            Make sure you're invoicing the right person or department. Getting this
                            wrong is one of the easiest ways to delay payment.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Invoice number</h3>
                        <p className="mt-2 text-muted-foreground">
                            Keep invoice numbers sequential and easy to track: INV-001, INV-002,
                            INV-003, and so on.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Services provided</h3>
                        <p className="mt-2 text-muted-foreground">
                            Clearly describe the work, quantity or hours, rate, and line total.
                            Specific invoices get fewer questions and faster approvals.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Payment instructions</h3>
                        <p className="mt-2 text-muted-foreground">
                            Include bank transfer details, PayPal, Wise, UPI, or whatever payment
                            method you accept. Never make clients ask how to pay.
                        </p>
                    </div>
                </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Freelancer Payment Terms Explained</h2>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Term</th>
                                <th className="p-4">Meaning</th>
                                <th className="p-4">Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Due on Receipt</td>
                                <td className="p-4">Pay immediately</td>
                                <td className="p-4">Small jobs</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Net 7</td>
                                <td className="p-4">Payment within 7 days</td>
                                <td className="p-4">Short projects</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Net 15</td>
                                <td className="p-4">Payment within 15 days</td>
                                <td className="p-4">Most freelance work</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4">Net 30</td>
                                <td className="p-4">Payment within 30 days</td>
                                <td className="p-4">Large projects</td>
                            </tr>
                            <tr>
                                <td className="p-4">50% Upfront</td>
                                <td className="p-4">Half before work starts</td>
                                <td className="p-4">New clients</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-4 text-muted-foreground">
                    Small tip: if a client consistently pays late, shorten your terms on future
                    invoices. Moving from Net 30 to Net 14 is completely reasonable.
                </p>
            </section>

            {/* Sending Invoices */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    How to Send a Freelancer Invoice Professionally
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Send it immediately</h3>
                        <p className="mt-2 text-muted-foreground">
                            The sooner you invoice, the sooner you get paid. Ideally, invoice on the
                            same day work is completed.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Send it to the right person</h3>
                        <p className="mt-2 text-muted-foreground">
                            Ask who handles accounts payable before the project ends.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Use a clear email subject</h3>
                        <p className="mt-2 text-muted-foreground">
                            Example: Invoice INV-042 — John Smith — Due 30 June.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Follow up professionally</h3>
                        <p className="mt-2 text-muted-foreground">
                            Most late payments are administrative delays, not bad intent. A polite
                            reminder is often all that's needed.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <h2 className="mb-8 text-3xl font-semibold">Frequently Asked Questions</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Is this freelancer invoice generator free?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. No subscriptions, no trials, and no hidden fees.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Do I need an account?</h3>
                        <p className="mt-2 text-muted-foreground">
                            No. Open the page, create your invoice, and download it.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I charge hourly or by project?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. Hourly work, fixed-price projects, retainers, and day rates are all
                            supported.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I add tax?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. GST, VAT, and sales tax calculations are supported.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Is my data private?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Yes. Invoice data stays in your browser and is never stored on our
                            servers.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I use it on mobile?</h3>
                        <p className="mt-2 text-muted-foreground">
                            Absolutely. It works on phones, tablets, and desktops.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
