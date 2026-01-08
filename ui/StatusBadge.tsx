import { CircleCheck } from 'lucide-react';

import { INVOICE_STATUS } from '@/app/constants';
import { Badge } from '@/components/ui/badge';

export function StatusBadge({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        {value === INVOICE_STATUS.CANCELLED && (
          <Badge variant="destructive">{value}</Badge>
        )}
        {value === INVOICE_STATUS.CREATED && (
          <Badge variant="outline">{value}</Badge>
        )}
        {value === INVOICE_STATUS.SENT && (
          <Badge variant="outline">
            <CircleCheck size={14} />
            <span className="ml-1">{value}</span>
          </Badge>
        )}
        {value === INVOICE_STATUS.PAID && (
          <Badge variant="outline" className="text-white bg-emerald-500">
            <CircleCheck size={14} />
            <span className="ml-1">{value}</span>
          </Badge>
        )}
      </div>
    </div>
  );
}
