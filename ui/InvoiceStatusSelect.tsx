'use client';
import { API_ROUTES } from '@/app/constants/api-routes';
import { QUERY_KEYS } from '@/app/constants/query-keys';
import { sanitizeError } from '@/app/helpers';
import { patchRequest } from '@/app/helpers/request';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectItem {
  label: string;
  value: string;
}

interface ShadSelectProps {
  options: SelectItem[];
  value: string;
  invoiceId: string;
  placeholder?: string;
  className?: string;
  selectLabel?: string;
}

export function InvoiceStatusSelect({
  value,
  options,
  placeholder,
  selectLabel,
  invoiceId,
}: ShadSelectProps) {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (payload: any) => {
      return patchRequest(
        `${API_ROUTES.INVOICES}/${payload.invoiceId}/status`,
        {
          status: payload.status,
        }
      );
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVOICE.MY_LIST] });
      toast.success('Status updated successfully!');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  const handleStatusChange = (status: string) => {
    toast.loading('Updating status...');
    updateStatusMutation.mutate({
      invoiceId,
      status: status,
    });
  };

  return (
    <Select onValueChange={handleStatusChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || 'Select'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && (
            <SelectLabel className="p-2 text-xs">{selectLabel}</SelectLabel>
          )}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
