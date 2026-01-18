'use client';
import { API_ROUTES } from '@/app/constants/api-routes';
import { PLAN_CODES, SUBSCRIPTION_PLANS } from '@/app/constants/plan';
import { sanitizeError } from '@/app/helpers';
import { postRequest } from '@/app/helpers/request';
import { useGetMeQuery } from '@/app/hooks/backend/user.hook';
import { PricingCard } from '@/ui/PricingCard';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function SubscriptionClient() {
  const { data, isLoading } = useGetMeQuery();
  const result = data?.data?.result || null;

  const createCheckoutSessionMutation = useMutation({
    mutationFn: () => {
      return postRequest(`${API_ROUTES.SUBSCRIPTIONS}/checkout`, {
        planCode: PLAN_CODES.STARTER,
      });
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: ({ data }) => {
      if (!data.result.checkout_url) {
        return toast.error('Failed to checkout! Please try again.');
      }
      window.location.replace(data.result.checkout_url);
    },
  });

  const handleUpgradeClick = () => {
    return createCheckoutSessionMutation.mutate();
  };

  return (
    <div className="min-h-screen px-4 xs-sm:px-16 md:px-32 lg:px-48 2xl:px-72 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            Save time. Get paid faster. Stay organized.
          </h1>
        </div>
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2  py-8">
          <PricingCard
            loading={isLoading}
            plan={SUBSCRIPTION_PLANS.FREE.plan}
            price="Free forever"
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
            handleButtonClick={handleUpgradeClick}
            loading={isLoading || createCheckoutSessionMutation.isPending}
            plan={SUBSCRIPTION_PLANS.STARTER.plan}
            price={SUBSCRIPTION_PLANS.STARTER.price}
            priceDetail="per year"
            buttonText="Upgrade"
            buttonVariant="default"
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
