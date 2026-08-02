'use client'

import { APP_NAME } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { sanitizeError } from '@/app/helpers'
import { postRequest } from '@/app/helpers/request'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

const PROFESSION_OPTIONS = [
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'business_owner', label: 'Business owner' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'other', label: 'Other' },
] as const

const HEARD_FROM_OPTIONS = [
    { value: 'google_search', label: 'Google search' },
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'reddit', label: 'Reddit' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'referral', label: 'Referral' },
    { value: 'product_hunt', label: 'Product Hunt' },
    { value: 'other', label: 'Other' },
] as const

const PRIMARY_GOAL_OPTIONS = [
    { value: 'get_paid_faster', label: 'Get paid faster' },
    { value: 'look_professional', label: 'Look professional' },
    { value: 'save_time', label: 'Save time' },
    { value: 'track_finances', label: 'Track finances' },
    { value: 'other', label: 'Other' },
] as const

const BUSINESS_SIZE_OPTIONS = [
    { value: 'solo', label: 'Just me' },
    { value: '2-10', label: '2–10' },
    { value: '11-50', label: '11–50' },
    { value: '50+', label: '50+' },
] as const

type Profession = (typeof PROFESSION_OPTIONS)[number]['value']
type HeardFrom = (typeof HEARD_FROM_OPTIONS)[number]['value']
type PrimaryGoal = (typeof PRIMARY_GOAL_OPTIONS)[number]['value']
type BusinessSize = (typeof BUSINESS_SIZE_OPTIONS)[number]['value']

type CreateOnboardingDto = {
    profession: Profession
    heardFrom: HeardFrom
    heardFromOther?: string
    primaryGoal: PrimaryGoal
    businessSize: BusinessSize
}

const HEARD_FROM_OTHER_MAX = 150

type ChipOption = { value: string; label: string }

function ChipGroup({
    label,
    options,
    value,
    onChange,
}: {
    label: string
    options: readonly ChipOption[]
    value: string | null
    onChange: (value: string) => void
}) {
    return (
        <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {label}
            </legend>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const selected = value === option.value
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            className={cn(
                                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                                selected
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-200 hover:bg-emerald-50/50'
                            )}
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </fieldset>
    )
}

type OnboardUserProps = {
    open: boolean
    onComplete: () => void
}

export default function OnboardUser({ open, onComplete }: OnboardUserProps) {
    const [step, setStep] = useState<1 | 2>(1)
    const [profession, setProfession] = useState<Profession | null>(null)
    const [heardFrom, setHeardFrom] = useState<HeardFrom | null>(null)
    const [heardFromOther, setHeardFromOther] = useState('')
    const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | null>(null)
    const [businessSize, setBusinessSize] = useState<BusinessSize | null>(null)

    const heardFromOtherTrimmed = heardFromOther.trim()
    const canContinueStep1 =
        !!profession &&
        !!heardFrom &&
        (heardFrom !== 'other' || heardFromOtherTrimmed.length > 0)
    const canSubmitStep2 = !!primaryGoal && !!businessSize

    const onboardingMutation = useMutation({
        mutationFn: (payload: CreateOnboardingDto) => {
            return postRequest(`${API_ROUTES.USERS}/onboarding`, payload)
        },
        onError: (err) => {
            toast.error(sanitizeError(err))
        },
        onSuccess: () => {
            toast.success('Setup complete. You can start creating your invoices!')
            onComplete()
        },
    })

    function handleSubmit() {
        if (!profession || !heardFrom || !primaryGoal || !businessSize) return

        const payload: CreateOnboardingDto = {
            profession,
            heardFrom,
            primaryGoal,
            businessSize,
            ...(heardFrom === 'other' ? { heardFromOther: heardFromOtherTrimmed } : {}),
        }
        return onboardingMutation.mutateAsync(payload)
    }

    return (
        <Dialog open={open}>
            <DialogPortal>
                <DialogOverlay className="bg-gray-50" />
                <DialogPrimitive.Content
                    className="fixed inset-0 z-50 overflow-y-auto bg-white outline-none"
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col px-6 py-10 sm:py-16">
                        <div className="mb-8 flex flex-col items-center text-center">
                            <div className="mb-4 flex items-center gap-2">
                                <Image
                                    src="/images/logo.jpg"
                                    alt="Invomaker"
                                    width={40}
                                    height={40}
                                />
                                <span className="text-lg font-semibold tracking-tight text-gray-900">
                                    {APP_NAME}
                                </span>
                            </div>
                            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                                Tell us a bit about you
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-sm leading-relaxed text-gray-600">
                                A few quick answers so we can tailor Invomaker for you.
                            </DialogDescription>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Step {step} of 2
                            </p>
                            <div className="mt-2 flex gap-1.5">
                                <span
                                    className={cn(
                                        'h-1 w-8 rounded-full',
                                        step >= 1 ? 'bg-emerald-500' : 'bg-gray-200'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'h-1 w-8 rounded-full',
                                        step >= 2 ? 'bg-emerald-500' : 'bg-gray-200'
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-8">
                            {step === 1 ? (
                                <>
                                    <ChipGroup
                                        label="What best describes you?"
                                        options={PROFESSION_OPTIONS}
                                        value={profession}
                                        onChange={(v) => setProfession(v as Profession)}
                                    />
                                    <ChipGroup
                                        label="How did you hear about us?"
                                        options={HEARD_FROM_OPTIONS}
                                        value={heardFrom}
                                        onChange={(v) => setHeardFrom(v as HeardFrom)}
                                    />
                                    {heardFrom === 'other' && (
                                        <div>
                                            <label
                                                htmlFor="heardFromOther"
                                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500"
                                            >
                                                Please specify
                                            </label>
                                            <Input
                                                id="heardFromOther"
                                                value={heardFromOther}
                                                onChange={(e) =>
                                                    setHeardFromOther(
                                                        e.target.value.slice(0, HEARD_FROM_OTHER_MAX)
                                                    )
                                                }
                                                maxLength={HEARD_FROM_OTHER_MAX}
                                                placeholder="e.g. A friend mentioned it"
                                                className="border-gray-200"
                                            />
                                            <p className="mt-1 text-right text-xs text-gray-400">
                                                {heardFromOther.length}/{HEARD_FROM_OTHER_MAX}
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ChipGroup
                                        label="What's your primary goal?"
                                        options={PRIMARY_GOAL_OPTIONS}
                                        value={primaryGoal}
                                        onChange={(v) => setPrimaryGoal(v as PrimaryGoal)}
                                    />
                                    <ChipGroup
                                        label="Business size"
                                        options={BUSINESS_SIZE_OPTIONS}
                                        value={businessSize}
                                        onChange={(v) => setBusinessSize(v as BusinessSize)}
                                    />
                                </>
                            )}
                        </div>

                        <div className="mt-10 flex gap-3">
                            {step === 2 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-gray-200"
                                    disabled={onboardingMutation.isPending}
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                            )}
                            {step === 1 ? (
                                <Button
                                    type="button"
                                    className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                                    disabled={!canContinueStep1}
                                    onClick={() => setStep(2)}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                                    disabled={!canSubmitStep2 || onboardingMutation.isPending}
                                    onClick={handleSubmit}
                                >
                                    {onboardingMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}
