'use client'

import { useState } from 'react'
import { Loader2, Plus, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMyPromptsListQuery } from '../hooks/backend/user.hook'
import { GlobalModal } from '@/ui/GlobalModal'
import PulseLoader from '@/ui/PulseLoader'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postRequest } from '../helpers/request'
import { API_ROUTES } from '../constants/api-routes'
import { sanitizeError } from '../helpers'
import { QUERY_KEYS } from '../constants/query-keys'

const SAMPLE_PROMPTS = [
    {
        label: 'Simple Natural Prompt',
        prompt:
            'Need an invoice for John Smith to charge Acme Inc for website maintenance and hosting for August. Hosting is $50, maintenance work was 6 hours at $70/hour. Add tax and Due date September 15, 2026.',
    },
] as const

const DEFAULT_PROMPT = `Generate an invoice with the following details:

From: Apex Solutions, 45 New York, USA | contact@apexsolutions.com | +1-202-555-0123

Client: Global Trade Co., 12, New York, USA | billing@globaltrade.com | +1-202-555-0123

Due date: June 15, 2026
Payment terms: Pay within 7 days of invoice date

Items:
- Web Development Services — 40 hrs @ $50/hr
- UI/UX Design — 20 hrs @ $35/hr
- Domain & Hosting Setup — 1 unit @ $120

Tax: 13% VAT
Discount: 5% on subtotal

Note: Thank you for your business! Please transfer payment to our bank account.`

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
    const [showAddPromptModal, setShowAddPromptModal] = useState(false)
    const [newPromptTitle, setNewPromptTitle] = useState('Sample Prompt')
    const [newPromptText, setNewPromptText] = useState(DEFAULT_PROMPT)

    const { data, isLoading } = useMyPromptsListQuery()
    const queryClient = useQueryClient()

    const result = data?.data?.result ?? []
    const promptsList = result.map((item: any) => ({
        label: item.title,
        prompt: item.description,
    }))

    const all_prompts = [...promptsList, ...SAMPLE_PROMPTS]

    const fieldInputClass =
        'w-full px-3 py-2 min-h-[52px] resize-y bg-stone-50 hover:bg-white border border-stone-200 rounded-md text-xs text-stone-800 placeholder:text-stone-400 transition-colors duration-150 focus:outline-none focus:bg-white focus:border-stone-400'

    const resetAddPromptForm = () => {
        setNewPromptTitle('')
        setNewPromptText('')
    }

    const handleCloseAddPromptModal = () => {
        setShowAddPromptModal(false)
    }

    const savePromptMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.PROMPTS}`, payload)
        },
        onError: (error: any) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            toast.success('Prompt saved successfully')
            resetAddPromptForm()
            setShowAddPromptModal(false)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER.MY_PROMPTS_LIST],
            })
        },
    })

    const handleSavePrompt = () => {
        if (!newPromptTitle || !newPromptText) {
            return toast.error('Title and prompt are required')
        }
        const payload = {
            title: newPromptTitle,
            description: newPromptText,
        }

        savePromptMutation.mutate(payload)
    }

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
                <button
                    type="button"
                    onClick={() => setShowAddPromptModal(true)}
                    aria-label="Add new prompt"
                    className="inline-flex items-center justify-center h-[26px] w-[26px] rounded-full text-[11px] font-medium border border-stone-200 bg-stone-50 text-stone-600 transition-colors duration-150 hover:bg-white hover:border-stone-300 hover:text-stone-800"
                >
                    <Plus className="h-3.5 w-3.5" />
                </button>
            </div>

            <GlobalModal
                processing={savePromptMutation.isPending}
                isOpen={showAddPromptModal}
                onOpenChange={(open) => {
                    if (!open) handleCloseAddPromptModal()
                    else setShowAddPromptModal(true)
                }}
                title="Add Prompt"
                description="Save a reusable prompt for filling invoice forms."
                size="md"
                actions={[
                    {
                        label: 'Cancel',
                        onClick: handleCloseAddPromptModal,
                        variant: 'outline',
                    },
                    {
                        label: 'Save Prompt',
                        onClick: handleSavePrompt,
                        variant: 'default',
                    },
                ]}
            >
                <form className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="promptTitle" className="text-sm font-medium">
                            Title (Update it to your own)
                        </Label>
                        <Input
                            id="promptTitle"
                            name="promptTitle"
                            type="text"
                            placeholder="eg: Invoice to client name"
                            className="h-10"
                            value={newPromptTitle}
                            onChange={(e) => setNewPromptTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="promptText" className="text-sm font-medium">
                            Prompt (Update the details to your own)
                        </Label>
                        <textarea
                            id="promptText"
                            name="promptText"
                            rows={10}
                            placeholder="Describe the invoice details you want to reuse..."
                            className={fieldInputClass}
                            value={newPromptText}
                            onChange={(e) => setNewPromptText(e.target.value)}
                        />
                    </div>
                </form>
            </GlobalModal>
        </div>
    )
}
