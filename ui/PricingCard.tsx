import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, CheckCircle, X } from 'lucide-react';

interface Feature {
  text: string;
  enabled: boolean;
}

interface PricingCardProps {
  plan: string;
  badge?: string;
  price: string;
  priceDetail: string;
  regularPrice?: string;
  buttonText: string;
  buttonVariant: 'default' | 'secondary';
  features: Feature[];
  isHighlighted?: boolean;
}

export function PricingCard({
  plan,
  badge,
  price,
  priceDetail,
  regularPrice,
  buttonText,
  buttonVariant,
  features,
  isHighlighted = false,
}: PricingCardProps) {
  console.log({ isHighlighted });
  return (
    <div
      style={{
        borderColor: isHighlighted ? 'black' : '',
      }}
      className={`relative flex flex-col rounded-s-lg p-8 transition-all border text-black bg-white
                ${isHighlighted ? 'shadow-xl' : 'shadow-sm'}
          `}
    >
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-black">{plan}</h3>
          {badge && (
            <span className="inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
        </div>

        <div className="rounded-2xl bg-gray-50 p-8">
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-6xl font-bold text-black">{price}</span>
            {priceDetail && (
              <span className="text-lg text-black/60">{priceDetail}</span>
            )}
          </div>

          {regularPrice && (
            <div className="mb-6 text-sm text-black/60">{regularPrice}</div>
          )}

          {isHighlighted ? (
            <Button
              disabled={true}
              className="w-full py-4 font-semibold"
              variant="outline"
              size="sm"
            >
              <CheckCircle /> Active
            </Button>
          ) : (
            <Button
              disabled={true}
              className={cn(
                'w-full rounded-xl py-2 text-base font-semibold transition-colors',
                buttonVariant === 'default'
                  ? 'bg-black text-white hover:bg-black/90'
                  : 'bg-white text-black hover:bg-gray-50 border border-black'
              )}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                feature.enabled
                  ? 'border-black bg-transparent'
                  : 'border-gray-300 bg-transparent'
              )}
            >
              {feature.enabled ? (
                <Check className="h-3 w-3 text-black" strokeWidth={3} />
              ) : (
                <X className="h-3 w-3 text-gray-300" strokeWidth={2} />
              )}
            </div>
            <span
              className={cn(
                'text-sm leading-5',
                feature.enabled ? 'text-black' : 'text-gray-400'
              )}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
