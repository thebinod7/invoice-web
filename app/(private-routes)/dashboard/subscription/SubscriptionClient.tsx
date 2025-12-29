import { PRICING } from '@/app/constants/db';
import { PricingCard } from '@/ui/PricingCard';
import { SubAlertBox } from '@/ui/SubAlertBox';

export default function SubscriptionClient() {
  return (
    <div className="min-h-screen px-40 md:px-48 2xl:px-72 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <SubAlertBox />
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2 mt-4">
          <PricingCard
            plan={PRICING.FREE.plan}
            price="Free"
            priceDetail=""
            buttonText="No subscription"
            buttonVariant="default"
            features={PRICING.FREE.features}
            isHighlighted={false}
          />

          <PricingCard
            plan={PRICING.STARTER.plan}
            price="Pricing soon"
            priceDetail=""
            buttonText="Enjoy early access"
            buttonVariant="secondary"
            isHighlighted={true}
            features={PRICING.STARTER.features}
            badge="early access"
          />
        </div>
      </div>
    </div>
  );
}
