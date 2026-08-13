import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { getStaleTimeInMinutes } from '@/app/helpers'
import { getRequest } from '@/app/helpers/request'
import { useQuery } from '@tanstack/react-query'

export const useListInvoiceClients = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICE_CLIENT.LIST],
        queryFn: () => getRequest(`${API_ROUTES.INVOICE_CLIENTS}?page=1&perPage=100`),
        enabled: true,
        staleTime: getStaleTimeInMinutes(2),
    })
}

export const useGetInvoiceClientById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICE_CLIENT.GET_BY_ID, id],
        queryFn: () => getRequest(`${API_ROUTES.INVOICE_CLIENTS}/${id}`),
        enabled: true,
        staleTime: 0,
    })
}
