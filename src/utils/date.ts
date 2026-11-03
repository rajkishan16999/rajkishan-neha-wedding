import { weddingConfig } from '../config/weddingConfig';

const { timeZone, utcOffset } = weddingConfig.wedding;

/**
 * Builds an absolute instant from an Indian calendar date + wall-clock time.
 * Because the UTC offset is explicit, the result is identical no matter which
 * time zone the guest's phone is set to.
 */
export function istDateTime(date: string, time: string = '00:00'): Date {
  return new Date(`${date}T${time}:00${utcOffset}`);
}

/** The exact moment of the wedding ceremony (21 Nov 2026, 7:00 PM IST). */
export function getWeddingInstant(): Date {
  return istDateTime(weddingConfig.wedding.date, weddingConfig.wedding.time);
}

/** "Friday, 20 November 2026" — weekday is computed, never hand-typed. */
export function formatLongDate(date: string): string {
  // Midday avoids any chance of date roll-over at the boundaries.
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(istDateTime(date, '12:00'));
}

/** Weekday name only, e.g. "Saturday". */
export function formatWeekday(date: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'long' }).format(
    istDateTime(date, '12:00'),
  );
}

/** Splits a YYYY-MM-DD date into display parts. */
export function dateParts(date: string): { day: string; month: string; year: string } {
  const d = istDateTime(date, '12:00');
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone, ...opts }).format(d);
  return {
    day: fmt({ day: '2-digit' }),
    month: fmt({ month: 'long' }),
    year: fmt({ year: 'numeric' }),
  };
}
