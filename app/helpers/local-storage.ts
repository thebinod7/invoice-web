export const LOCAL_KEYS = {
  ACCESS_TOKEN: 'invAccessToken',
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {}
};

export const saveInvoiceDetails = (invoiceDetails: any) => {
  try {
    localStorage.setItem('invoiceDetails', JSON.stringify(invoiceDetails));
  } catch (error) {}
};

export const getInvoiceDetails = () => {
  try {
    const invoiceDetails = localStorage.getItem('invoiceDetails');
    if (!invoiceDetails) return null;
    return JSON.parse(invoiceDetails);
  } catch (error) {}
};

export const clearInvoiceDetails = () => {
  try {
    localStorage.removeItem('invoiceDetails');
  } catch (error) {}
};
