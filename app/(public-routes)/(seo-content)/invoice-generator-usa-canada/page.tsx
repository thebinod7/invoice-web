import AdBanner from '@/app/components/AdBanner'
import SeoLanderCta from '@/app/components/SeoLanderCta'
import { APP_PATHS, GOOGLE_AD } from '@/app/constants'

export default function InvoiceGeneratorUsaCanadaPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            {/* Hero */}
            <section className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Free Invoice Generator for USA & Canada
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Create professional invoices in USD or CAD with support for sales tax, GST, HST,
                    and PST. No account required, no monthly fees, and no complicated setup. Just
                    create your invoice and download a PDF in seconds.
                </p>

                <SeoLanderCta />

                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>
            </section>

            {/* Built For */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    Built for US and Canadian Businesses
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold">For United States Businesses</h3>

                        <p className="mt-3 text-muted-foreground">
                            Create invoices in USD, add state or local sales tax when required, and
                            include your business information. Perfect for freelancers, contractors,
                            LLCs, consultants, agencies, and small businesses across all 50 states.
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h3 className="text-lg font-semibold">For Canadian Businesses</h3>

                        <p className="mt-3 text-muted-foreground">
                            Generate invoices in CAD and add GST, HST, PST, or QST where applicable.
                            Ideal for Canadian freelancers, consultants, tradespeople, service
                            providers, and growing businesses.
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-muted-foreground">
                    Whether you're invoicing clients in Toronto, Vancouver, Calgary, New York,
                    Texas, Florida, or California, this free invoice generator helps you create
                    professional invoices quickly and confidently.
                </p>
            </section>

            {/* Steps */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    How to Create a US or Canadian Invoice
                </h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-medium">Step 1 — Choose your currency</h3>

                        <p className="mt-2 text-muted-foreground">
                            Select USD for US invoices or CAD for Canadian invoices. You can also
                            add the appropriate tax rate for your business.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">
                            Step 2 — Add your details and line items
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            Enter your business information, client details, products, services,
                            quantities, and rates. Totals and taxes are calculated automatically.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Step 3 — Download your PDF</h3>

                        <p className="mt-2 text-muted-foreground">
                            Download a clean PDF invoice that's ready to email, print, or send to
                            your client immediately.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cross Border */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    USD vs CAD — Billing Across the Border
                </h2>

                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        If you work with clients in both the United States and Canada, always make
                        the invoice currency clear. Writing "$2,000" can create confusion, while
                        "$2,000 USD" or "$2,000 CAD" leaves no room for misunderstanding.
                    </p>

                    <p className="text-muted-foreground">
                        Many Canadian freelancers invoice US clients in USD, while some US
                        businesses bill Canadian customers in CAD. The important thing is that both
                        parties agree on the currency before work begins.
                    </p>

                    <p className="text-muted-foreground">
                        This online invoice generator supports both USD and CAD, making it easy to
                        work with clients anywhere in North America.
                    </p>
                </div>
            </section>

            {/* Invoice Requirements */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    What Should a Professional Invoice Include?
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Business information</h3>

                        <p className="mt-2 text-muted-foreground">
                            Include your business name, address, email address, and phone number.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Client details</h3>

                        <p className="mt-2 text-muted-foreground">
                            Add your client's name, company name, and billing information.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Invoice number</h3>

                        <p className="mt-2 text-muted-foreground">
                            Use a unique invoice number for every invoice to make tracking and
                            accounting easier.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Itemized products or services</h3>

                        <p className="mt-2 text-muted-foreground">
                            Clearly list what you're billing for, including quantities, rates, and
                            totals.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Tax information</h3>

                        <p className="mt-2 text-muted-foreground">
                            Display any applicable sales tax, GST, HST, PST, or QST as a separate
                            line item.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Payment instructions</h3>

                        <p className="mt-2 text-muted-foreground">
                            Tell your client exactly how to pay, whether by bank transfer, ACH,
                            e-transfer, PayPal, Wise, Stripe, or another method.
                        </p>
                    </div>
                </div>
            </section>

            {/* Users */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Who Uses This Tool?</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-5">
                        <h3 className="font-semibold">Freelancers</h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Writers, designers, developers, photographers, marketers, and
                            consultants who need a fast invoice generator without creating an
                            account.
                        </p>
                    </div>

                    <div className="rounded-lg border p-5">
                        <h3 className="font-semibold">Contractors & Trades</h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Electricians, plumbers, builders, landscapers, and field-service
                            businesses.
                        </p>
                    </div>

                    <div className="rounded-lg border p-5">
                        <h3 className="font-semibold">Small Businesses</h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Businesses that need professional invoices without paying for accounting
                            software.
                        </p>
                    </div>

                    <div className="rounded-lg border p-5">
                        <h3 className="font-semibold">Cross-Border Businesses</h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Companies and freelancers working with clients in both the United States
                            and Canada.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mistakes */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    Common Invoicing Mistakes US & Canadian Businesses Make
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Forgetting to specify the currency</h3>

                        <p className="mt-2 text-muted-foreground">
                            This is especially important for cross-border work. Always write USD or
                            CAD next to dollar amounts.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Missing tax information</h3>

                        <p className="mt-2 text-muted-foreground">
                            If you're required to charge sales tax, GST, HST, or PST, make sure it
                            appears clearly on the invoice.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Using vague descriptions</h3>

                        <p className="mt-2 text-muted-foreground">
                            Specific line items help clients understand what they're paying for and
                            reduce unnecessary questions.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Waiting too long to invoice</h3>

                        <p className="mt-2 text-muted-foreground">
                            Send invoices as soon as work is completed. Faster invoicing usually
                            means faster payments.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Not following up on overdue invoices</h3>

                        <p className="mt-2 text-muted-foreground">
                            Most late invoices are forgotten, not intentionally ignored. A polite
                            reminder often solves the problem.
                        </p>
                    </div>
                </div>
            </section>

            <SeoLanderCta
                relatedLinks={[
                    {
                        href: APP_PATHS.FREE_INVOICE_GENERATOR,
                        label: 'Free invoice generator',
                    },
                    {
                        href: APP_PATHS.FREELANCER_INVOICE_GENERATOR,
                        label: 'Freelancer invoice generator',
                    },
                ]}
            />

            {/* FAQ */}
            <section className="mt-16">
                <h2 className="mb-8 text-3xl font-semibold">Frequently Asked Questions</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">
                            Is this invoice generator free for US and Canadian businesses?
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            Yes. US and Canadian freelancers and businesses can create and download
                            invoices at no cost. There are no subscriptions, trials, or hidden fees
                            to get started.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Does it support USD and CAD?</h3>

                        <p className="mt-2 text-muted-foreground">
                            Yes. Choose US Dollars (USD) or Canadian Dollars (CAD) when you build
                            the invoice. Totals and line items display in the currency you select.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I add GST, HST, PST, or sales tax?</h3>

                        <p className="mt-2 text-muted-foreground">
                            Yes. Enter the tax rate you need (for example GST, HST, PST, or US
                            sales tax) and the generator calculates tax and totals for you. Adjust
                            the rate per invoice when provinces or states differ.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I create invoices in both currencies?</h3>

                        <p className="mt-2 text-muted-foreground">
                            Yes. Each invoice is independent, so you can bill one client in USD and
                            another in CAD. Switch currency as you start each new invoice.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Is my invoice data stored?</h3>

                        <p className="mt-2 text-muted-foreground">
                            No. Invoice details stay in your browser while you work and are not
                            stored on our servers for the free flow. Download the PDF if you need a
                            copy after you leave the page.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I use this on mobile?</h3>

                        <p className="mt-2 text-muted-foreground">
                            Yes. The generator works on phones, tablets, and desktops, so you can
                            issue an invoice from the office or on the go.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">What format is the invoice downloaded in?</h3>

                        <p className="mt-2 text-muted-foreground">
                            Invoices download as PDF files. PDF is easy to email and print, and
                            most US and Canadian clients accept it without extra conversion.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
