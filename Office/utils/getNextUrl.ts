export const getNextUrl = (index: string) => {
  const url = {
    Card: `/Verification/card`,
    Billing: `/Verification/billing`,
    Email: `/Verification/email`,
    Document: `/Verification/document`,
    Confirmation: `/Verification/confirmation`,
  }[index];

  return url || `/`;
};
