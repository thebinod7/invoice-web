import { PRICING } from '@/app/constants/db';
import { PricingCard } from '@/ui/PricingCard';

export default function page() {
  return (
    <div className="min-h-screen px-16 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <PricingCard
            plan={PRICING.FREE.plan}
            price="Free"
            priceDetail=""
            buttonText="Get started now"
            buttonVariant="default"
            features={PRICING.FREE.features}
          />

          <PricingCard
            plan={PRICING.STARTER.plan}
            price={`$${PRICING.STARTER.price}`}
            priceDetail="/month"
            buttonText="Get started now"
            buttonVariant="secondary"
            isHighlighted
            features={PRICING.STARTER.features}
          />

          <PricingCard
            plan={PRICING.STARTER.plan}
            price={`$${PRICING.STARTER.price}`}
            priceDetail="Lifetime"
            buttonText="Get started now"
            buttonVariant="secondary"
            isHighlighted
            features={PRICING.STARTER.features}
          />
        </div>
      </div>
    </div>
  );
}
