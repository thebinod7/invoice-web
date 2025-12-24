export interface InvoiceItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}
export interface CalculatedInvoiceItem extends InvoiceItemInput {
  rowTotal: number;
}
export const calculateInvoiceTotals = (params: {
  items: InvoiceItemInput[];
  taxPercent?: number;
  discountPercent?: number;
}) => {
  const taxPercent = params.taxPercent ?? 0;
  const discountPercent = params.discountPercent ?? 0;

  if (taxPercent < 0 || taxPercent > 100)
    throw new Error('Invalid tax percentage');

  if (discountPercent < 0 || discountPercent > 100)
    throw new Error('Invalid discount percentage');

  // ---- Step 1: calculate row totals (in cents)
  const calculatedItems: CalculatedInvoiceItem[] = params.items.map((item) => {
    if (item.quantity < 0 || item.unitPrice < 0) {
      throw new Error('Quantity and unit price must be >= 0');
    }

    const unitPriceCents = Math.round(item.unitPrice * 100);
    const rowTotalCents = unitPriceCents * item.quantity;

    return {
      ...item,
      rowTotal: rowTotalCents / 100,
    };
  });

  // ---- Step 2: subtotal
  const subTotalCents = calculatedItems.reduce(
    (sum, item) => sum + Math.round(item.rowTotal * 100),
    0
  );

  // ---- Step 3: discount
  const discountAmountCents = Math.round(
    (subTotalCents * discountPercent) / 100
  );

  // ---- Step 4: tax (applied after discount)
  const taxableAmountCents = subTotalCents - discountAmountCents;

  const taxAmountCents = Math.round((taxableAmountCents * taxPercent) / 100);

  // ---- Step 5: grand total
  const grandTotalCents = subTotalCents - discountAmountCents + taxAmountCents;

  return {
    items: calculatedItems,
    subTotal: subTotalCents / 100,
    discountAmount: discountAmountCents / 100,
    taxAmount: taxAmountCents / 100,
    grandTotal: grandTotalCents / 100,
  };
};
