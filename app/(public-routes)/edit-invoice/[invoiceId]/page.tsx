'use client';
import InvoiceGeneratorV3 from '@/app/components/Invoice/InvoiceGeneratorV3';
import { useGetInvoiceById } from '@/app/hooks/backend/invoice.hook';
import { IInvoiceDetails, InvoiceItemInput } from '@/app/types';
import { PageSpinner } from '@/ui/PageSpinner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page() {
  const { invoiceId } = useParams();
  const { data } = useGetInvoiceById(invoiceId as string);
  const result = data?.data?.result || null;

  const [invoiceDetails, setInvoiceDetails] = useState<IInvoiceDetails | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setInvoiceDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateListItem = (index: number, field: string, value: string) => {
    const invoiceItems = invoiceDetails?.invoiceItems || [];
    const updated = invoiceItems.map((item: InvoiceItemInput, i: number) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInvoiceDetails((prev: any) => ({ ...prev, invoiceItems: updated }));
  };

  const removeListItem = (index: number) => {
    const invoiceItems = invoiceDetails?.invoiceItems || [];
    const updated = invoiceItems.filter((_, i) => i !== index);
    setInvoiceDetails((prev: any) => ({ ...prev, invoiceItems: updated }));
  };

  const addListItem = () => {
    const newRow = { description: '', quantity: '', unitPrice: '' };
    const invoiceItems = invoiceDetails?.invoiceItems || [];
    const updated = [...invoiceItems, newRow];
    setInvoiceDetails((prev: any) => ({ ...prev, invoiceItems: updated }));
  };

  useEffect(() => {
    if (result) {
      const payload = {
        companyLogoUrl: result.companyLogoUrl,
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

  if (!invoiceDetails) return <PageSpinner />;
  return (
    <InvoiceGeneratorV3
      invoiceId={invoiceId as string}
      currentInvoice={invoiceDetails}
      setCurrentInvoice={setInvoiceDetails}
      handleInputChange={handleInputChange}
      updateListItem={updateListItem}
      removeListItem={removeListItem}
      addListItem={addListItem}
    />
  );
}
