export const formatCurrency = (amount: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

export const formatNumber = (num: number): string =>
  new Intl.NumberFormat('en-US').format(num);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
