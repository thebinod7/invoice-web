'use client';
import InvoiceGeneratorV3 from '@/app/components/Invoice/InvoiceGeneratorV3';
import { useGetInvoiceById } from '@/app/hooks/backend/invoice.hook';
import { IInvoiceDetails } from '@/app/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page() {
  const { invoiceId } = useParams();
  const { data } = useGetInvoiceById(invoiceId as string);
  const result = data?.data?.result || null;

  const [invoiceDetails, setInvoiceDetails] = useState<IInvoiceDetails | null>(
    null
  );

  useEffect(() => {
    if (result) {
      console.log('result => ', result);
      const payload = {
        senderDetails: result.senderDetails,
        receiverDetails: result.receiverDetails,
        currency: result.currency,
        invoiceNumber: result.invoiceNumber,
        dueDate: result.dueDate,
        poNumber: result.poNumber,
        paymentTerms: result.paymentTerms,
        invoiceItems: result.invoiceItems,
        tax: result.tax,
        discount: result.discount,
        subTotal: result.subTotal,
        grandTotal: result.grandTotal,
        additionalNote: result.additionalNote,
      };
      setInvoiceDetails(payload);
    }
  }, [result]);

  console.log('invoiceDetails => ', invoiceDetails);
  if (!invoiceDetails) return <div>Loading...</div>;
  return <InvoiceGeneratorV3 currentInvoice={invoiceDetails} />;
}
