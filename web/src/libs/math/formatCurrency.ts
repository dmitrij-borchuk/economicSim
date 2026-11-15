export interface FormatCurrencyOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  value: number | string,
  options: FormatCurrencyOptions = {},
): string {
  const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
}
