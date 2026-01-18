import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function LoadingButton({
  message,
  clsName,
}: {
  message?: string;
  clsName?: string;
}) {
  return (
    <Button className={`${clsName || ''}`} size="sm" variant="outline" disabled>
      <Spinner />
      {message || 'Processing'}
    </Button>
  );
}
