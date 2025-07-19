import { ILineItem } from '../types';

interface CalculateGrandTotalParams {
  items: ILineItem[];
  tax?: number;
  discount?: number;
}

export const calculateGrandTotal = ({
  items,
  tax = 0,
  discount = 0,
}: CalculateGrandTotalParams): number => {
  const subtotal = items.reduce((total, item) => {
    return (
      total + parseFloat(item.rate || '0') * parseInt(item.quantity || '0')
    );
  }, 0);

  const discountAmount = (discount / 100) * subtotal;
  const taxedAmount = ((subtotal - discountAmount) * tax) / 100;

  const final = subtotal - discountAmount + taxedAmount;
  return parseFloat(final.toFixed(2));
};

export const calculateFinalTotal = ({
  grandTotal = 0,
  tax = 0,
  discount = 0,
}) => {
  const taxAmount = (grandTotal * tax) / 100;
  const discountAmount = (grandTotal * discount) / 100;
  const finalTotal = grandTotal + taxAmount - discountAmount;
  return finalTotal.toFixed(2);
};
