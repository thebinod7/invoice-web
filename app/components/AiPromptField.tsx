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

From: Apex Solutions, 45 New York, USA | contact@apexsolutions.com

Client: Global Trade Co., 12, New York, USA | billing@globaltrade.com

Due date: June 15, 2026
Payment terms: Pay within 7 days of invoice date

Items:
- Web Development Services — 40 hrs @ $50/hr
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
        <div className="border-b border-stone-100 px-6 py-4 sm:px-10">
            <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-4">
                <div className="mb-3">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-stone-600" />
                        <span className="text-sm font-medium text-stone-900">Fill with AI</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-stone-500">
                        Describe your invoice in plain text.{' '}
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                            Saves time
                        </span>{' '}
                        over filling each field manually.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
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
                        className={`min-w-0 flex-1 ${fieldInputClass}`}
                        placeholder="Eg: Invoice Acme Corp for 10 hours of consulting at $150/hr, due in 30 days"
                    />
                    <button
                        disabled={fetchingInvoice}
                        type="button"
                        onClick={handleFetchByPrompt}
                        className="mt-1 flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-stone-900 px-5 py-3 text-xs font-medium tracking-wide text-white transition-opacity duration-150 hover:opacity-80 active:opacity-70 disabled:opacity-60 sm:mt-0 sm:w-auto"
                    >
                        {fetchingInvoice ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Sparkles className="h-3.5 w-3.5" />
                        )}
                        {fetchingInvoice ? 'Please wait...' : 'Fill form'}
                    </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {isLoading && <PulseLoader />}
                    {all_prompts.map(({ label, prompt }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() => setAiPrompt(prompt)}
                            className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors duration-150 ${aiPrompt === prompt
                                ? 'border-stone-900 bg-stone-900 text-white'
                                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-800'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setShowAddPromptModal(true)}
                        aria-label="Add new prompt"
                        className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors duration-150 hover:border-stone-300 hover:text-stone-800"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                </div>
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
