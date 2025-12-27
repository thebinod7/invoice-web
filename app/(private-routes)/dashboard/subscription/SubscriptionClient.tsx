import { PRICING } from '@/app/constants/db';
import { PricingCard } from '@/ui/PricingCard';

export default function SubscriptionClient() {
  return (
    <div className="min-h-screen px-40 md:px-48 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
          <PricingCard
            plan={PRICING.FREE.plan}
            price="Free"
            priceDetail=""
            buttonText="Get started now"
            buttonVariant="default"
            features={PRICING.FREE.features}
            isHighlighted={true}
          />

          <PricingCard
            plan={PRICING.STARTER.plan}
            price={`$${PRICING.STARTER.price}`}
            priceDetail="/year"
            buttonText="Get started now"
            buttonVariant="secondary"
            isHighlighted={false}
            features={PRICING.STARTER.features}
            badge="coming soon"
          />
        </div>
      </div>
    </div>
  );
}
