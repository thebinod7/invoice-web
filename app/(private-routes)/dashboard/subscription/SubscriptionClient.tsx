import { PRICING } from '@/app/constants/db';
import { PricingCard } from '@/ui/PricingCard';
import { SubAlertBox } from '@/ui/SubAlertBox';

export default function SubscriptionClient() {
  return (
    <div className="min-h-screen px-8 xs-sm:px-16 md:px-32 lg:px-48 2xl:px-72 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2 mt-2 py-10">
          <PricingCard
            plan={PRICING.FREE.plan}
            price="Free"
            priceDetail=""
            buttonText="No subscription"
            buttonVariant="default"
            features={PRICING.FREE.features}
            isHighlighted={true}
          />

          <PricingCard
            plan={PRICING.STARTER.plan}
            price="Pricing soon"
            priceDetail=""
            buttonText="Upgrade"
            buttonVariant="secondary"
            isHighlighted={false}
            features={PRICING.STARTER.features}
            badge=""
          />
        </div>
      </div>
    </div>
  );
}
