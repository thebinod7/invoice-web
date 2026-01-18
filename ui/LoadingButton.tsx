import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function LoadingButton({ message }: { message?: string }) {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      {message || 'Processing'}
    </Button>
  );
}
