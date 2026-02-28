export interface Invoice {
    id: number
    client: string
    invoiceNumber: string
    totalAmount: number
    dueDate: string
    status: 'PAID' | 'SENT'
    isOverdue: boolean
}

export const invoices: Invoice[] = [
    {
        id: 1,
        client: 'Meta Inc New York, USA',
        invoiceNumber: 'INV-202601-0001',
        totalAmount: 585.2,
        dueDate: 'Jan 17, 2026',
        status: 'PAID',
        isOverdue: false,
    },
    {
        id: 2,
        client: 'Meta Corpo San Francisco',
        invoiceNumber: 'INV-202512-0002',
        totalAmount: 1677.7,
        dueDate: 'Dec 31, 2025',
        status: 'PAID',
        isOverdue: false,
    },
    {
        id: 3,
        client: 'Meta Inc New York',
        invoiceNumber: 'INV-202512-0001',
        totalAmount: 168976.5,
        dueDate: 'Dec 30, 2025',
        status: 'SENT',
        isOverdue: true,
    },
]

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export const getStatusStyles = (status: 'PAID' | 'SENT' | 'OVERDUE') => {
    const styles = {
        PAID: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
        SENT: { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-400' },
        OVERDUE: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    }
    return styles[status]
}
