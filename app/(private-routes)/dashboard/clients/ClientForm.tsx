'use client'

import { APP_PATHS } from '@/app/constants'
import { emailValidator } from '@/app/helpers'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

export type ClientFormValues = {
    name: string
    email: string
    phone: string
    address: string
}

const EMPTY: ClientFormValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

function toPayload(values: ClientFormValues) {
    const payload: Record<string, string> = {
        name: values.name.trim(),
        email: values.email.trim(),
    }
    const phone = values.phone.trim()
    const address = values.address.trim()
    if (phone) payload.phone = phone
    if (address) payload.address = address
    return payload
}

interface ClientFormProps {
    initialValues?: Partial<ClientFormValues>
    submitLabel: string
    isPending?: boolean
    onSubmit: (payload: Record<string, string>) => void
}

export default function ClientForm({
    initialValues,
    submitLabel,
    isPending,
    onSubmit,
}: ClientFormProps) {
    const [formData, setFormData] = useState<ClientFormValues>({
        ...EMPTY,
        ...initialValues,
    })

    const handleChange = (field: keyof ClientFormValues, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim()) return toast.error('Name is required')
        if (!emailValidator(formData.email)) {
            return toast.error('Please enter a valid email address')
        }
        onSubmit(toPayload(formData))
    }

    return (
        <div className="flex justify-center mt-4 md:mt-8 lg:mt-12">
            <div className="w-full md:w-[60%] space-y-3">
                <Button variant="ghost" size="sm" className="-ml-2" asChild>
                    <Link href={APP_PATHS.DASHBOARD.CLIENTS}>
                        <ArrowLeft />
                        Back
                    </Link>
                </Button>
                <Card>
                    <div className="p-4 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-xs text-muted-foreground">
                            <span className="text-destructive" aria-hidden="true">
                                *
                            </span>{' '}
                            Required
                        </p>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Name{' '}
                                <span className="text-destructive" aria-hidden="true">
                                    *
                                </span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Client name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="h-10"
                                maxLength={200}
                                required
                                aria-required="true"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email{' '}
                                <span className="text-destructive" aria-hidden="true">
                                    *
                                </span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="client@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="h-10"
                                required
                                aria-required="true"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">
                                Phone{' '}
                                <span className="text-muted-foreground font-normal">
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="h-10"
                                maxLength={50}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium">
                                Address{' '}
                                <span className="text-muted-foreground font-normal">
                                    (optional)
                                </span>
                            </Label>
                            <Textarea
                                id="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                maxLength={200}
                                rows={3}
                            />
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full h-10 mt-8"
                        >
                            {isPending ? 'Saving...' : submitLabel}
                        </Button>
                    </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}
