export const currencyUSDCentsFormatter = (cents: number): number => cents / 100;

export const addComma = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const USDFormatter = (dollar: number): string => `$${addComma(dollar)}`;

export const centsToUSD = (cents: number): string =>
  USDFormatter(currencyUSDCentsFormatter(cents));
