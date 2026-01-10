'use client';

import { APP_PATHS } from '@/app/constants';
import { STARTER_EMAIL_LIMIT } from '@/app/constants/plan';
import { GlobalModal } from './GlobalModal';

export function UpgradePlanModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const handleContinueFree = () => {
    setShowModal(false);
  };

  const handleGoToSubscription = () => {
    setShowModal(false);
    window.location.replace(APP_PATHS.DASHBOARD.SUBSCRIPTION);
  };

  return (
    <>
      <GlobalModal
        isOpen={showModal}
        onOpenChange={setShowModal}
        title="Make invoicing effortless"
        description="You've used all free actions for this feature. Upgrade to keep your invoicing workflow smooth and uninterrupted."
        size="md"
        closeOnOutsideClick={true}
        actions={[
          {
            label: 'Continue Free',
            onClick: handleContinueFree,
            variant: 'outline',
          },
          {
            label: 'Go to Subscription',
            onClick: handleGoToSubscription,
            variant: 'default',
          },
        ]}
      >
        {/* Optional custom content */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Upgrade to unlock premium features:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Edit and re-download invoices anytime</li>
            <li>Update payment and overdue status freely</li>
            <li>
              Send up to {STARTER_EMAIL_LIMIT} invoices via email per year
            </li>
          </ul>
        </div>
      </GlobalModal>
    </>
  );
}
