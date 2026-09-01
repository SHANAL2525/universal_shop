export const formatCurrency = (amount: number) => `Rs. ${new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 }).format(amount)}`;
