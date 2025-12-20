import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { getStaleTimeInMinutes } from '@/app/helpers';
import { getRequest } from '@/app/helpers/request';
import { useQuery } from '@tanstack/react-query';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.ME],
    queryFn: () => getRequest(`${API_ROUTES.USERS}/me`),
    enabled: true,
    staleTime: getStaleTimeInMinutes(10),
  });
};

export const useGetActiveAd = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APP.ACTIVE_AD],
    queryFn: () => getRequest(`${API_ROUTES.APP}/active-ad`),
    enabled: true,
    staleTime: getStaleTimeInMinutes(2),
  });
};
