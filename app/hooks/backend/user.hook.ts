import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { getStaleTimeInMinutes } from '@/app/helpers';
import { getRequest } from '@/app/helpers/request';
import { useQuery } from '@tanstack/react-query';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.GET_ME],
    queryFn: () => getRequest(`${API_ROUTES.USERS}/me`),
    enabled: true,
    staleTime: getStaleTimeInMinutes(10),
  });
};
