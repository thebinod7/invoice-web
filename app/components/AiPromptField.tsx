import { Sparkles } from 'lucide-react'
import React from 'react'

const SAMPLE_PROMPTS = [
    {
        label: 'Consulting',
        prompt: 'Invoice Acme Corp for 10 hours of consulting at $150/hr, due in 30 days',
    },
    {
        label: 'Web design',
        prompt: 'Invoice Bright Studio for a website redesign project, $4,500 flat fee, net 15 payment terms',
    },
    {
        label: 'Product sale',
        prompt: 'Invoice Tech Supplies Ltd for 5 laptops at $899 each and 2 monitors at $249, plus 8% tax, due upon receipt',
    },
] as const

export default function AiPromptField({ aiPrompt, setAiPrompt, handleFetchByPrompt }: { aiPrompt: string, setAiPrompt: (value: string) => void, handleFetchByPrompt: () => void }) {
    const fieldInputClass =
        'w-full px-3 py-2 h-10 bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-500 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400'

    return (
        <div className="px-6 sm:px-10 py-4 border-b border-stone-100">
            <label className="text-[11px] font-medium tracking-widest text-stone-500 uppercase mb-2 block">
                Describe your invoice
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFetchByPrompt()}
                    className={`flex-1 min-w-0 ${fieldInputClass}`}
                    placeholder="e.g. Invoice Acme Corp for 10 hours of consulting at $150/hr, due in 30 days"
                />
                <button
                    type="button"
                    onClick={handleFetchByPrompt}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-medium tracking-wide bg-stone-900 hover:opacity-80 active:opacity-70 text-white transition-opacity duration-150"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Fill Form
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
