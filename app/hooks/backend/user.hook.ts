import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import { getStaleTimeInMinutes } from '@/app/helpers'
import { getRequest } from '@/app/helpers/request'
import { useQuery } from '@tanstack/react-query'

export const useGetMeQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.GET_ME],
        queryFn: () => getRequest(`${API_ROUTES.USERS}/me`),
        enabled: true,
        staleTime: 0,
    })
}

export const useMyStatsQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.APP.MY_STATS],
        queryFn: () => getRequest(`${API_ROUTES.APP}/my-stats`),
        enabled: true,
        staleTime: 0,
    })
}

export const usePaidUsersQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.APP.PAID_USERS],
        queryFn: () => getRequest(`${API_ROUTES.APP}/paid-users`),
        enabled: true,
        staleTime: 0,
    })
}

export const useListMyReferralQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.MY_REFERRALS],
        queryFn: () => getRequest(`${API_ROUTES.USERS}/me/referrals`),
        enabled: true,
        staleTime: 0,
    })
}


export const myFeatureUsageQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.MY_FEATURE_USAGE],
        queryFn: () => getRequest(`${API_ROUTES.USERS}/me/feature-usage`),
        enabled: true,
        staleTime: 0,
    })
}


export const useMyPromptsListQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.MY_PROMPTS_LIST],
        queryFn: () => getRequest(`${API_ROUTES.PROMPTS}/me`),
        enabled: true,
        staleTime: 0,
    })
}

export const useHomepagePublicDataQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.HOMEPAGE_PUBLIC_DATA],
        queryFn: () => getRequest(`${API_ROUTES.USERS}/homepage-public-data`),
        enabled: true,
        staleTime: getStaleTimeInMinutes(5),
    })
}
