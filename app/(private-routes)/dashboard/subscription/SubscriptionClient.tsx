'use client';
import { PRICING } from '@/app/constants/db';
import { useGetMeQuery } from '@/app/hooks/backend/user.hook';
import { PricingCard } from '@/ui/PricingCard';

export default function SubscriptionClient() {
  const { data, isLoading } = useGetMeQuery();
  const result = data?.data?.result || null;

  return (
    <div className="min-h-screen px-4 xs-sm:px-16 md:px-32 lg:px-48 2xl:px-72 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2 mt-2 py-10">
          <PricingCard
            loading={isLoading}
            plan={PRICING.FREE.plan}
            price="Free Forever"
            priceDetail=""
            buttonText="No subscription"
            buttonVariant="secondary"
            features={PRICING.FREE.features}
            isHighlighted={
              result?.activeSubscription?.planCode === PRICING.FREE.plan
            }
          />

          <PricingCard
            loading={isLoading}
            plan={PRICING.STARTER.plan}
            price="Pricing soon"
            priceDetail=""
            buttonText="Upgrade"
            buttonVariant="secondary"
            features={PRICING.STARTER.features}
            isHighlighted={
              result?.activeSubscription?.planCode === PRICING.STARTER.plan
            }
            badge=""
          />
        </div>
      </div>
    </div>
  );
}
