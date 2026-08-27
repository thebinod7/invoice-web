'use client'

import type React from 'react'

import { API_ROUTES } from '@/app/constants/api-routes'
import { useAuthContext } from '@/app/context/useAuthContext'
import { sanitizeError } from '@/app/helpers'
import { postRequest } from '@/app/helpers/request'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const MSG_LIMIT = 500

export default function FeedbackClient() {
    const { currentUser } = useAuthContext()
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        message: '',
    })

    const sendFeedbackMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.APP}/feedback`, payload)
        },
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            setSubmitted(true)
            setFormData({ message: '' })
            toast.success('Thank you for your feedback! We will get back to you soon.')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            email: currentUser?.email,
            message: formData.message,
        }
        if (payload.message.length > MSG_LIMIT) return toast.error('Message too long!')
        return sendFeedbackMutation.mutate(payload)
    }

    return (
        <div className="flex min-h-full w-full items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
            <Card className="w-full max-w-lg">
                <CardHeader className="items-center space-y-3 px-5 pb-4 pt-6 text-center sm:px-8 sm:pt-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                        <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                            We would love to hear your feedback!
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Textarea
                                required={true}
                                rows={6}
                                value={formData.message}
                                placeholder="Type your message here..."
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                className="min-h-36 resize-y sm:min-h-48"
                            />
                            <p
                                className={`mt-2 text-right text-xs tabular-nums ${
                                    formData.message.length > MSG_LIMIT
                                        ? 'text-destructive'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {formData.message.length}/{MSG_LIMIT}
                            </p>
                        </div>

                        {submitted ? (
                            <Button
                                disabled={true}
                                type="button"
                                variant="secondary"
                                className="h-10 w-full"
                            >
                                Feedback Sent
                            </Button>
                        ) : (
                            <Button
                                disabled={sendFeedbackMutation.isPending}
                                type="submit"
                                className="h-10 w-full"
                            >
                                {sendFeedbackMutation.isPending ? 'Sending...' : 'Send Message'}
                            </Button>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
