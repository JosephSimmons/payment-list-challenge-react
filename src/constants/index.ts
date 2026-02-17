export const API_URL = '/api/payments';

export const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'CAD',
  'ZAR',
  'JPY',
  'CZK',
] as const;
// "as const" narrows the type to the specific string literals, making it easier to
// use in other parts of the code without losing type safety.
