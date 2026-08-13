'use client'

import { APP_PATHS } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { sanitizeError } from '@/app/helpers'
import { postRequest } from '@/app/helpers/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ClientForm from '../ClientForm'

export default function CreateClient() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (payload: Record<string, string>) =>
            postRequest(API_ROUTES.INVOICE_CLIENTS, payload),
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICE_CLIENT.LIST],
            })
            toast.success('Client created successfully!')
            router.push(APP_PATHS.DASHBOARD.CLIENTS)
        },
    })

    return (
        <ClientForm
            submitLabel="Add client"
            isPending={createMutation.isPending}
            onSubmit={(payload) => createMutation.mutate(payload)}
        />
    )
}
