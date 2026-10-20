import { getFormattedDate } from '@/utils/dateFormatter';

describe('getFormattedDate', () => {
  it('formats a given date as "Month DD, YYYY"', () => {
    expect(getFormattedDate(new Date(2021, 4, 3))).toBe('May 03, 2021');
  });

  it('defaults to the current date when none is provided', () => {
    const now = new Date();
    const expected = now.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    expect(getFormattedDate()).toBe(expected);
  });
});
