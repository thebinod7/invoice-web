import { PAZE_SIZE } from '@/app/constants'
import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { getStaleTimeInMinutes } from '@/app/helpers'
import { getRequest } from '@/app/helpers/request'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useGetActiveAd = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.APP.ACTIVE_AD],
        queryFn: () => getRequest(`${API_ROUTES.APP}/active-ad`),
        enabled: true,
        staleTime: getStaleTimeInMinutes(2),
    })
}

export const useGetInvoiceById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICE.GET_BY_ID, id],
        queryFn: () => getRequest(`${API_ROUTES.INVOICES}/${id}`),
        enabled: true,
        staleTime: 0,
    })
}

export const useListMyInvoices = (query: any) => {
    const queryString = new URLSearchParams(query).toString()
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICE.MY_LIST, query],
        queryFn: () => getRequest(`${API_ROUTES.INVOICES}/me?${queryString}`),
        enabled: true,
        staleTime: getStaleTimeInMinutes(2),
    })
}

/* =========================
   Types
========================= */

export type Invoice = {
    id: string
    // add other invoice fields here
}

type InvoiceMeta = {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
}

type InvoiceListResponse = {
    data: {
        result: {
            rows: Invoice[]
            meta: InvoiceMeta
        }
    }
}

type InvoiceListParams = {
    status?: string
    search?: string
    perPage?: number
}

export const useListMyInvoieHistory = (baseQuery: InvoiceListParams) => {
    const { status, search, perPage } = baseQuery

    return useInfiniteQuery<
        InvoiceListResponse, // QueryFn return type
        Error, // Error type
        InvoiceListResponse, // Data type
        [string, InvoiceListParams], // QueryKey type
        number // PageParam type
    >({
        queryKey: [QUERY_KEYS.INVOICE.MY_LIST, { status, search, perPage }],

        initialPageParam: 1, // REQUIRED in v5

        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams()

            params.set('page', pageParam.toString())
            params.set('perPage', (perPage ?? PAZE_SIZE).toString())

            if (status) params.set('status', status)
            if (search) params.set('search', search)

            return getRequest(`${API_ROUTES.INVOICES}/me?${params.toString()}`)
        },

        getNextPageParam: (lastPage) => {
            const meta = lastPage.data.result.meta

            return meta.currentPage < meta.lastPage ? meta.currentPage + 1 : undefined
        },

        staleTime: getStaleTimeInMinutes(2),
    })
}
