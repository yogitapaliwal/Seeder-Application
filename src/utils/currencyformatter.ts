interface FormatAmountOptions {
  compact?: boolean;
  currency?: string;
  locale?: string;
  decimals?: boolean;
}

const formatAmount = (
  amount: number | string | null | undefined,
  {
    compact = false,
    currency = 'USD',
    locale = 'en-US',
    decimals = true,
  }: FormatAmountOptions = {},
): string => {
  const num = typeof amount === 'string' ? Number(amount) : amount;

  if (num === null || num === undefined || !Number.isFinite(num)) {
    return decimals ? '$0.00' : '$0';
  }

  const decimalDigits = decimals ? 2 : 0;
  const minimumFractionDigits = compact ? 0 : decimalDigits;
  const maximumFractionDigits = compact ? 1 : decimalDigits;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

export { formatAmount, formatCurrency };
export type { FormatAmountOptions };
