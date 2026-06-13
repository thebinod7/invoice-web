import AdBanner from '@/app/components/AdBanner'
import { GOOGLE_AD } from '@/app/constants'

export default function ConsultantInvoiceGeneratorPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            {/* HERO */}
            <section className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Free Consultant Invoice Generator
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Bill your clients the way consultants actually work hourly, per project,
                    milestone-based, or on a retainer. Create a clean, professional invoice in under
                    a minute and download it as a PDF. No account, no fees.
                </p>

                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>
            </section>

            {/* WHO IT'S FOR */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Built for Real-World Consultants</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        [
                            'Business Consultants',
                            'Strategy, operations, and management consulting billed by engagement or retainer.',
                        ],
                        [
                            'IT & Technology Consultants',
                            'Software implementation, systems, cybersecurity, and digital transformation work.',
                        ],
                        [
                            'Marketing Consultants',
                            'Growth, SEO, brand strategy, and campaign advisory billed hourly or per deliverable.',
                        ],
                        [
                            'HR & People Consultants',
                            'Hiring, culture, compensation, and training engagements.',
                        ],
                        [
                            'Financial Consultants',
                            'CFO services, forecasting, modelling, and financial advisory work.',
                        ],
                        [
                            'Legal & Compliance Consultants',
                            'Contract review, compliance, and policy advisory work.',
                        ],
                    ].map(([title, desc]) => (
                        <div key={title} className="rounded-lg border p-5">
                            <h3 className="font-semibold">{title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-muted-foreground">
                    If you sell expertise not products; this tool is built for how you actually bill
                    clients.
                </p>
            </section>

            {/* HOW IT WORKS */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">How to Create a Consulting Invoice</h2>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-medium">
                            Step 1 — Add client and engagement details
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Enter your business details and your client’s information. If there’s a
                            PO number or engagement reference, add it here.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Step 2 — Add your billing items</h3>
                        <p className="mt-2 text-muted-foreground">
                            Add hourly work, milestones, retainers, or project fees as separate line
                            items. You can also add reimbursable expenses.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">Step 3 — Download your PDF</h3>
                        <p className="mt-2 text-muted-foreground">
                            Generate a clean invoice and download it instantly. Ready to send to
                            corporate or startup clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* BILLING MODELS */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Consulting Billing Models Explained</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Hourly billing</h3>
                        <p className="mt-2 text-muted-foreground">
                            Best for flexible advisory work. Break down hours by task or phase for
                            clarity. Example: Strategic advisory: 12 hrs @ $200/hr.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Project-based billing</h3>
                        <p className="mt-2 text-muted-foreground">
                            Fixed fee for a defined deliverable or scope. Keep it simple and clearly
                            tied to the agreed project.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Retainer billing</h3>
                        <p className="mt-2 text-muted-foreground">
                            Monthly fee for ongoing access. Always include the billing period (e.g.
                            “June 2025 retainer”).
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Milestone billing</h3>
                        <p className="mt-2 text-muted-foreground">
                            Payments tied to deliverables or phases. Each invoice should reference
                            the milestone clearly.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Hybrid billing</h3>
                        <p className="mt-2 text-muted-foreground">
                            Mix of retainer + extra hourly work. Always separate line items so
                            client finance teams can process easily.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHAT TO INCLUDE */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    What a Consulting Invoice Must Include
                </h2>

                <ul className="space-y-4 text-muted-foreground">
                    <li>• Your business or firm details</li>
                    <li>• Client name, company, and billing contact</li>
                    <li>• Invoice number and date</li>
                    <li>• PO number (if required)</li>
                    <li>• Engagement or contract reference</li>
                    <li>• Itemized services with hours or milestones</li>
                    <li>• Expenses (if applicable)</li>
                    <li>• Subtotal, tax, and total</li>
                    <li>• Clear payment instructions</li>
                </ul>
            </section>

            {/* PAYMENT TERMS */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">
                    Consulting Payment Terms (What’s Standard)
                </h2>

                <div className="space-y-4 text-muted-foreground">
                    <p>• New clients: 25–50% upfront or milestone payments to reduce risk</p>
                    <p>• Established clients: Net 15 or Net 30</p>
                    <p>• Retainers: Invoiced monthly on a fixed date</p>
                    <p>• Small advisory work: Due on receipt or Net 7</p>
                    <p>
                        Tip: Shortening payment terms is a normal and acceptable way to improve cash
                        flow.
                    </p>
                </div>
            </section>

            {/* MISTAKES */}
            <section className="mb-16">
                <h2 className="mb-8 text-3xl font-semibold">Common Consulting Invoice Mistakes</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium">Missing PO numbers</h3>
                        <p className="mt-2 text-muted-foreground">
                            Many corporate clients cannot process invoices without them.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Vague descriptions</h3>
                        <p className="mt-2 text-muted-foreground">
                            Always specify what was delivered, when, and for which engagement.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Mixing billing models in one line</h3>
                        <p className="mt-2 text-muted-foreground">
                            Keep retainers, hourly work, and expenses clearly separated.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Not referencing the engagement</h3>
                        <p className="mt-2 text-muted-foreground">
                            Always link invoices to a contract, SOW, or engagement letter.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <h2 className="mb-8 text-3xl font-semibold">Frequently Asked Questions</h2>

                <div className="space-y-6 text-muted-foreground">
                    <div>
                        <h3 className="font-medium">Is this consultant invoice generator free?</h3>
                        <p>Yes. No signup, no subscription, no fees.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I bill hourly, project, or retainer?</h3>
                        <p>Yes. All billing models are supported as line items.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I include a PO number?</h3>
                        <p>Yes. Add it in the reference or PO field on your invoice.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Can I add expenses?</h3>
                        <p>Yes. Expenses can be added as separate line items.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Is my data stored?</h3>
                        <p>No. Everything stays in your browser.</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Does it work on mobile?</h3>
                        <p>Yes. Fully responsive on all devices.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
