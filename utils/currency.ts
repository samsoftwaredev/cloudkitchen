export const currencyUSDCentsFormatter = (cents: number) =>
  (cents / 100).toFixed(2);

export const addComma = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const USDFormatter = (dollar: number) => `$${addComma(dollar)}`;

export const centsToUSD = (cents: number) =>
  USDFormatter(currencyUSDCentsFormatter(cents));
