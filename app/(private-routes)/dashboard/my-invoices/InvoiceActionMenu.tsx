'use client'

import { INVOICE_STATUS } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { useAppContext } from '@/app/context/useAppContext'
import { isForbidden, sanitizeError } from '@/app/helpers'
import { API_BASE_URL } from '@/app/helpers/config'
import { delRequest, patchRequest, postRequest } from '@/app/helpers/request'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlobalModal } from '@/ui/GlobalModal'
import { UpgradePlanModal } from '@/ui/UpgradePlanModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlarmClock, CheckCheck, Download, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const ACTIONS = {
    MARK_AS_PAID: 'MARK_AS_PAID',
    DOWNLOAD_NOW: 'DOWNLOAD_NOW',
    SEND_REMINDER: 'SEND_REMINDER',
    EDIT_INVOICE: 'EDIT_INVOICE',
    DELETE_INVOICE: 'DELETE_INVOICE',
}

const actionItems = [
    { icon: CheckCheck, label: 'Mark as Paid', action: ACTIONS.MARK_AS_PAID },
    { icon: Download, label: 'Download Now', action: ACTIONS.DOWNLOAD_NOW },
    { icon: AlarmClock, label: 'Send Reminder', action: ACTIONS.SEND_REMINDER },
    { icon: Pencil, label: 'Edit Invoice', action: ACTIONS.EDIT_INVOICE },
]

export default function InvoiceActionMenu({ rowId, status }: { rowId: string; status: string }) {
    const queryClient = useQueryClient()
    const { showModal, setShowModal } = useAppContext()
    const [showReminderModal, setShowReminderModal] = useState<boolean>(false)
    const [formData, setFormData] = useState({ clientName: '', clientEmail: '' })

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const sendReminderMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.INVOICES}/send-reminder`, payload)
        },
        onError: (error) => {
            const forbidden = isForbidden(error)
            if (forbidden) {
                return setShowModal(true)
            }
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            setFormData({ clientName: '', clientEmail: '' })
            setShowReminderModal(false)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
            })
            toast.success('Reminder email sent successfully!')
        },
    })

    const markAsPaidMutation = useMutation({
        mutationFn: (payload: any) => {
            return patchRequest(`${API_ROUTES.INVOICES}/${payload.invoiceId}/status`, payload)
        },
        onError: (error) => {
            const forbidden = isForbidden(error)
            if (forbidden) {
                return setShowModal(true)
            }
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
            })
            toast.success('Invoice marked as paid!')
        },
        onSettled: () => {
            toast.dismiss()
        },
    })

    const archiveInvoiceMutation = useMutation({
        mutationFn: (payload: any) => {
            return delRequest(`${API_ROUTES.INVOICES}/${payload.invoiceId}`)
        },
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE.MY_LIST],
            })
            toast.success('Invoice archived successfully!')
        },
        onSettled: () => {
            toast.dismiss()
        },
    })

    const handleDownloadNow = async () => {
        try {
            window.location.href = `${API_BASE_URL}/invoices/${rowId}/download`
        } catch (error) {
            toast.error(sanitizeError(error))
        }
    }

    const handleEditClick = () => {
        if (status !== INVOICE_STATUS.CREATED)
            return toast.error('Invoice is not editable! Its already ' + status)
        window.open(`/edit-invoice/${rowId}`, '_blank')
    }

    const handleMenuItemClick = (action: string) => {
        setIsOpen(false)
        if (action === ACTIONS.DOWNLOAD_NOW) return handleDownloadNow()
        if (action === ACTIONS.DELETE_INVOICE) {
            toast.loading('Archiving invoice...')
            return archiveInvoiceMutation.mutate({ invoiceId: rowId })
        }
        if (action === ACTIONS.MARK_AS_PAID) {
            toast.loading('Updating status...')
            return markAsPaidMutation.mutate({ invoiceId: rowId, status: INVOICE_STATUS.PAID })
        }
        if (action === ACTIONS.EDIT_INVOICE) {
            return handleEditClick()
        }
        if (action === ACTIONS.SEND_REMINDER) {
            return setShowReminderModal(true)
        }
    }

    const handleSendReminder = () => {
        if (!formData.clientName || !formData.clientEmail) {
            toast.error('Please enter a valid client name and email')
            return
        }
        return sendReminderMutation.mutate({
            invoiceId: rowId,
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
        })
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            <UpgradePlanModal showModal={showModal} setShowModal={setShowModal} />

            <GlobalModal
                isOpen={showReminderModal}
                onOpenChange={setShowReminderModal}
                title="Send Reminder"
                description="Send a gentle reminder to your client via email."
                size="md"
                closeOnOutsideClick={true}
                processing={sendReminderMutation.isPending}
                actions={[
                    {
                        label: 'Cancel',
                        onClick: () => setShowReminderModal(false),
                        variant: 'outline',
                    },
                    {
                        label: 'Send Reminder',
                        onClick: handleSendReminder,
                        variant: 'default',
                    },
                ]}
            >
                <div className="px-4 pb-0">
                    <form className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="clientName" className="text-sm font-medium">
                                Client Name
                            </Label>
                            <Input
                                id="clientName"
                                name="clientName"
                                type="text"
                                placeholder="eg: Jon Snow"
                                className="h-10"
                                value={formData.clientName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        clientName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="clientEmail" className="text-sm font-medium">
                                Client Email{' '}
                            </Label>
                            <Input
                                id="clientEmail"
                                name="clientEmail"
                                type="email"
                                placeholder="eg: jon@example.com"
                                className="h-10"
                                value={formData.clientEmail}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        clientEmail: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </form>
                </div>
            </GlobalModal>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="More options"
                >
                    <MoreHorizontal size={16} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                        {actionItems.map(({ icon: Icon, label, action }) => (
                            <button
                                key={label}
                                onClick={() => handleMenuItemClick(action)}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors text-left"
                            >
                                <Icon size={14} className="text-slate-400" />
                                <span>{label}</span>
                            </button>
                        ))}
                        <div className="h-px bg-slate-100 my-1" />
                        <button
                            onClick={() => handleMenuItemClick(ACTIONS.DELETE_INVOICE)}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                            <Trash2 size={14} className="text-red-500" />
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
