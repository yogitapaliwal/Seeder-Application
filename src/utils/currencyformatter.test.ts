import { formatAmount, formatCurrency } from '@/utils/currencyformatter';

describe('formatAmount', () => {
  it('formats a number as USD currency by default', () => {
    expect(formatAmount(1234.5)).toBe('$1,234.50');
  });

  it('formats a numeric string', () => {
    expect(formatAmount('1234.5')).toBe('$1,234.50');
  });

  it('returns $0.00 for null, undefined, or non-finite input', () => {
    expect(formatAmount(null)).toBe('$0.00');
    expect(formatAmount(undefined)).toBe('$0.00');
    expect(formatAmount(NaN)).toBe('$0.00');
  });

  it('returns $0 (no decimals) for invalid input when decimals is false', () => {
    expect(formatAmount(null, { decimals: false })).toBe('$0');
  });

  it('formats compactly when compact is true', () => {
    expect(formatAmount(8800000, { compact: true })).toBe('$8.8M');
  });

  it('omits decimals when decimals is false', () => {
    expect(formatAmount(1234.5, { decimals: false })).toBe('$1,235');
  });
});

describe('formatCurrency', () => {
  it('formats a number as USD currency with 2 decimal places', () => {
    expect(formatCurrency(170454.55)).toBe('$170,454.55');
  });

  it('pads whole numbers with .00', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });
});
