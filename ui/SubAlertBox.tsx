export function SubAlertBox() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
      <div className="flex items-start gap-2">
        <span className="text-blue-600 mt-0.5">🎉</span>
        <p>
          <span className="font-medium">Early access:</span> You’re currently
          using <span className="font-medium">Starter features for free</span>.
          Pricing will apply in the future.
          <span className="font-medium">
            We will notify you well in advance
          </span>
          .
        </p>
      </div>
    </div>
  );
}
