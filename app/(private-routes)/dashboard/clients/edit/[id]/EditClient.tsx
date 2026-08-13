'use client'

import { APP_PATHS } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { sanitizeError } from '@/app/helpers'
import { patchRequest } from '@/app/helpers/request'
import { useGetInvoiceClientById } from '@/app/hooks/backend/invoice-client.hook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ClientForm from '../../ClientForm'

export default function EditClient() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data, isLoading } = useGetInvoiceClientById(id)
    const client = data?.data?.result

    const updateMutation = useMutation({
        mutationFn: (payload: Record<string, string>) =>
            patchRequest(`${API_ROUTES.INVOICE_CLIENTS}/${id}`, payload),
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE_CLIENT.LIST],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE_CLIENT.GET_BY_ID, id],
            })
            toast.success('Client updated successfully!')
            router.push(APP_PATHS.DASHBOARD.CLIENTS)
        },
    })

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>
    }

    if (!client) {
        return <div className="text-center py-10">Client not found</div>
    }

    return (
        <ClientForm
            key={client._id}
            initialValues={{
                name: client.name ?? '',
                email: client.email ?? '',
                phone: client.phone ?? '',
                address: client.address ?? '',
            }}
            submitLabel="Save changes"
            isPending={updateMutation.isPending}
            onSubmit={(payload) => updateMutation.mutate(payload)}
        />
    )
}
