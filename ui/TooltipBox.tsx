import { Tooltip } from '@/components/ui/tooltip';

interface Props {
  children: React.ReactNode;
}

export function TooltipBox({ children }: Props) {
  return <Tooltip>{children}</Tooltip>;
}
