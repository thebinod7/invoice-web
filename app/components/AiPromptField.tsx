'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useMyPromptsListQuery } from '../hooks/backend/user.hook'
import PulseLoader from '@/ui/PulseLoader'

const SAMPLE_PROMPTS = [
    {
        label: 'Simple Natural Prompt',
        prompt:
            'Need an invoice for John Smith to charge Acme Inc for website maintenance and hosting for August. Hosting is $50, maintenance work was 6 hours at $70/hour. Add tax and Due date September 15, 2026.',
    },
] as const

export default function AiPromptField({
    fetchingInvoice,
    aiPrompt,
    setAiPrompt,
    handleFetchByPrompt,
}: {
    fetchingInvoice: boolean
    aiPrompt: string
    setAiPrompt: (value: string) => void
    handleFetchByPrompt: () => void
}) {

    const { data, isLoading } = useMyPromptsListQuery()

    const result = data?.data?.result ?? []
    const promptsList = result.map((item: any) => ({
        label: item.title,
        prompt: item.description,
    }))

    const all_prompts = [...promptsList, ...SAMPLE_PROMPTS]

    const fieldInputClass =
        'w-full px-3 py-2 min-h-[52px] resize-y bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-400 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400'

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
                    className="w-full mt-1 sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-medium tracking-wide bg-stone-900 hover:opacity-80 active:opacity-70 text-white transition-opacity duration-150"
                >
                    {fetchingInvoice ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                    )}
                    {fetchingInvoice ? 'Please wait...' : 'Fill Form'}
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {isLoading && <PulseLoader />}
                {all_prompts.map(({ label, prompt }) => (
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
