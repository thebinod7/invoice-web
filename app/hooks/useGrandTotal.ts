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

  return subtotal - discountAmount + taxedAmount;
};
