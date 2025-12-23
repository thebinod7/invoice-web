import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { getStaleTimeInMinutes } from '@/app/helpers';
import { getRequest } from '@/app/helpers/request';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveAd = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APP.ACTIVE_AD],
    queryFn: () => getRequest(`${API_ROUTES.APP}/active-ad`),
    enabled: true,
    staleTime: getStaleTimeInMinutes(2),
  });
};

export const useGetInvoiceById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INVOICE.GET_BY_ID, id],
    queryFn: () => getRequest(`${API_ROUTES.INVOICES}/${id}`),
    enabled: true,
    staleTime: 0,
  });
};

export const useListMyInvoices = (query: any) => {
  const queryString = new URLSearchParams(query).toString();
  return useQuery({
    queryKey: [QUERY_KEYS.INVOICE.MY_LIST, query],
    queryFn: () => getRequest(`${API_ROUTES.INVOICES}/me?${queryString}`),
    enabled: true,
    staleTime: getStaleTimeInMinutes(2),
  });
};
