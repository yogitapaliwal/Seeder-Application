import { getTimeBasedGreeting } from '@/utils/greeting';

describe('getTimeBasedGreeting', () => {
  it('returns "Good morning" before noon', () => {
    expect(getTimeBasedGreeting(new Date(2023, 0, 1, 9))).toBe('Good morning');
  });

  it('returns "Good afternoon" between noon and 5pm', () => {
    expect(getTimeBasedGreeting(new Date(2023, 0, 1, 14))).toBe('Good afternoon');
  });

  it('returns "Good evening" from 5pm onward', () => {
    expect(getTimeBasedGreeting(new Date(2023, 0, 1, 20))).toBe('Good evening');
  });

  it('treats the noon boundary (12) as afternoon', () => {
    expect(getTimeBasedGreeting(new Date(2023, 0, 1, 12))).toBe('Good afternoon');
  });

  it('treats the 5pm boundary (17) as evening', () => {
    expect(getTimeBasedGreeting(new Date(2023, 0, 1, 17))).toBe('Good evening');
  });

  it('defaults to the current time when no date is given', () => {
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(getTimeBasedGreeting());
  });
});
