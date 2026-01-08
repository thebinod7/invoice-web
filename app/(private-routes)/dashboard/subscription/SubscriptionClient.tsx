'use client';
import { SUBSCRIPTION_PLANS } from '@/app/constants/plan';
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
            plan={SUBSCRIPTION_PLANS.FREE.plan}
            price="Free Forever"
            priceDetail=""
            buttonText="No subscription"
            buttonVariant="secondary"
            features={SUBSCRIPTION_PLANS.FREE.features}
            isHighlighted={
              result?.activeSubscription?.planCode ===
              SUBSCRIPTION_PLANS.FREE.plan
            }
          />

          <PricingCard
            loading={isLoading}
            plan={SUBSCRIPTION_PLANS.STARTER.plan}
            price="Pricing soon"
            priceDetail=""
            buttonText="Upgrade"
            buttonVariant="secondary"
            features={SUBSCRIPTION_PLANS.STARTER.features}
            isHighlighted={
              result?.activeSubscription?.planCode ===
              SUBSCRIPTION_PLANS.STARTER.plan
            }
            badge=""
          />
        </div>
      </div>
    </div>
  );
}
