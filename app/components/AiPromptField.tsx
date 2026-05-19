import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'

const SAMPLE_PROMPTS = [
    {
        label: 'Consulting',
        prompt: 'From Summit Consulting, 100 Market St, San Francisco, CA 94105, (415) 555-0123, billing@summitconsulting.com — invoice Acme Corp, 200 Broadway, New York, NY 10007 for 10 hours of strategic consulting at $150/hr. Payment due in 30 days.',
    },
    {
        label: 'Web Design',
        prompt: 'From Lightbox Design, 123 Main St, New York, NY 10001, (212) 555-0123, hello@lightboxdesign.com — invoice Bright Studio, 456 Park Ave, New York, NY 10022 for website redesign project (flat fee $4,500) and brand guidelines ($800). Net 15 payment terms.',
    },
    {
        label: 'Product Sale',
        prompt: 'From Global Tech Supply, 789 Commerce Blvd, Manhattan, NY 10001, (646) 555-0199 — invoice Tech Supplies Ltd, 321 Industrial Way, Chicago, IL 60601 for 5 laptops at $899 each and 2 monitors at $249 each. Apply 8% sales tax. Payment due upon receipt.',
    },
] as const

export default function AiPromptField({ fetchingInvoice, aiPrompt, setAiPrompt, handleFetchByPrompt }: { fetchingInvoice: boolean, aiPrompt: string, setAiPrompt: (value: string) => void, handleFetchByPrompt: () => void }) {
    const fieldInputClass =
        'w-full px-3 py-2 min-h-[72px] resize-y bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-500 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400'

    return (
        <div className="px-6 sm:px-10 py-4 border-b border-stone-100">
            <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase mb-2 block">
                Describe your invoice
            </label>
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <textarea
                    rows={4}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault()
                            handleFetchByPrompt()
                        }
                    }}
                    className={`flex-1 min-w-0 ${fieldInputClass}`}
                    placeholder="Eg: Invoice Acme Corp for 10 hours of consulting at $150/hr, due in 30 days"
                />
                <button
                    disabled={fetchingInvoice}
                    type="button"
                    onClick={handleFetchByPrompt}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-medium tracking-wide bg-stone-900 hover:opacity-80 active:opacity-70 text-white transition-opacity duration-150"
                >
                    {fetchingInvoice ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {fetchingInvoice ? 'Please wait...' : 'Fill Form'}
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {SAMPLE_PROMPTS.map(({ label, prompt }) => (
                    <button
                        key={label}
                        type="button"
                        onClick={() => setAiPrompt(prompt)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors duration-150 ${aiPrompt === prompt
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-white hover:border-stone-300 hover:text-stone-800'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}
