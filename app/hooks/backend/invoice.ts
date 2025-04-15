import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { getStaleTimeInMinutes } from '@/app/helpers';
import { getRequest } from '@/app/helpers/request';
import { useQuery } from '@tanstack/react-query';

export const useGetMeQuery = (isLoggedIn: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.USER.ME],
        queryFn: () => getRequest(`${API_ROUTES.GENERATE_INVOICE}`),
        enabled: isLoggedIn,
        staleTime: getStaleTimeInMinutes(10),
    });
};
