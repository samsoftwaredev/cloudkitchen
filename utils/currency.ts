export const currencyUSDCentsFormatter = (cents: number): string =>
  (cents / 100).toFixed(2);

export const addComma = (num: number | string): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const USDFormatter = (dollar: number | string): string =>
  `$${addComma(dollar)}`;

export const centsToUSD = (cents: number): string =>
  USDFormatter(currencyUSDCentsFormatter(cents));
