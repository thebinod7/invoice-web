'use client';
import { API_ROUTES } from '@/app/constants/api-routes';
import { postRequest } from '@/app/helpers/request';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';

const sample_payload = {
    companyLogo:'',
    currency:'USD',
    companyName: "Awesome Company Inc",
    invoiceNumber: "INV-20250413",
    invoiceDate: "2025-04-13",
    dueDate: "2025-04-13",
    clientName: "John Doe",
    clientAddress: "123 Main St",
    companyEmail: "contact@awesomecompany.com",
    companyPhone: "+1 (555) 123-4567",
    items: [
      {
        "description": "Website Design",
        "price": "$1,200.00"
      },
      {
        "description": "Hosting (3 months)",
        "price": "$150.00"
      },
      {
        "description": "Domain Registration",
        "price": "$15.00"
      }
    ],
    total: 5500
  }

export default function InvoiceGenerator() {

    const generateInvoiceMutation = useMutation({
        mutationFn: (payload: any) => {
          return postRequest(
            API_ROUTES.GENERATE_INVOICE,
            payload,
            { responseType: 'blob' }
          );
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong!");
        },
        onSuccess: (data:any) => {
          console.log("Data=>",data)
          const blob = new Blob([data.data], { type: 'application/pdf' });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'invoice.pdf';
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
    
          return true; // success
        },
      });

      const handleGenerateClick = () => {
        generateInvoiceMutation.mutate(sample_payload)
      }
  return (
    <div className='mt-10'>
        <button onClick={handleGenerateClick} className='px-20 py-2 text-white bg-slate-700 rounded-md' type='button'> Generate Invoice </button>
    </div>
  )
}
