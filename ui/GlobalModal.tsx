'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';
import { LoadingButton } from './LoadingButton';

export interface GlobalModalAction {
  label: string;
  onClick: () => void;
  variant?:
    | 'default'
    | 'outline'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export interface GlobalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;
  children?: ReactNode;

  actions?: GlobalModalAction[];

  size?: 'sm' | 'md' | 'lg';
  closeOnOutsideClick?: boolean;
  processing?: boolean;
}

export function GlobalModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  actions = [],
  size = 'md',
  closeOnOutsideClick = true,
  processing = false,
}: GlobalModalProps) {
  const sizeClasses = {
    sm: 'sm:max-w-[350px]',
    md: 'sm:max-w-[425px]',
    lg: 'sm:max-w-[600px]',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={sizeClasses[size]}
        onInteractOutside={
          !closeOnOutsideClick ? (e) => e.preventDefault() : undefined
        }
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="py-4">{children}</div>}

        {actions.length > 0 && (
          <DialogFooter className="flex gap-2 justify-center">
            {processing ? (
              <LoadingButton message="Please wait" />
            ) : (
              actions.map((action, index) => (
                <Button
                  disabled={processing}
                  key={index}
                  variant={action.variant || 'default'}
                  onClick={() => {
                    action.onClick();
                  }}
                >
                  {action.label}
                </Button>
              ))
            )}
          </DialogFooter>
        )}
        {/* <div className="text-xs text-muted-foreground text-center pt-2">
          $24.99/year • Cancel anytime • No pressure
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
