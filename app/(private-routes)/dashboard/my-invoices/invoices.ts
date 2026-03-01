export interface Invoice {
    _id: string
    currency: string
    tax: number
    discount: number
    subTotal: number
    grandTotal: number
    status: string
    invoiceNumber: string
    receiverDetails: string
    dueDate: string
}

export const getStatusStyles = (status: 'PAID' | 'SENT' | 'CREATED' | 'OVERDUE') => {
    const styles = {
        PAID: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
        SENT: { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-400' },
        OVERDUE: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
        CREATED: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    }
    return styles[status]
}
