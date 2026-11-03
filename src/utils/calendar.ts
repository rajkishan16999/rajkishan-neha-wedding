import { weddingConfig, type WeddingEvent } from '../config/weddingConfig';
import { istDateTime } from './date';
import { getSiteUrl } from './site';

/** 2026-11-21T13:30:00.000Z → 20261121T133000Z (Google Calendar UTC format). */
function toGoogleUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** 2026-11-20 → 20261120 */
function toGoogleDate(date: string): string {
  return date.replace(/-/g, '');
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Returns a Google Calendar "add event" link for a wedding event.
 * Times are converted to UTC explicitly, so the entry lands at the correct
 * Indian time for every guest regardless of their own time zone.
 */
export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const { venue, groom, bride } = weddingConfig;

  let dates: string;
  if (event.startTime) {
    const start = istDateTime(event.date, event.startTime);
    const end = new Date(start.getTime() + event.calendarDurationHours * 60 * 60 * 1000);
    dates = `${toGoogleUtc(start)}/${toGoogleUtc(end)}`;
  } else {
    // All-day event: end date is exclusive.
    dates = `${toGoogleDate(event.date)}/${toGoogleDate(addDays(event.date, 1))}`;
  }

  const site = getSiteUrl();
  const details = [
    event.description,
    '',
    `${groom.firstName} & ${bride.firstName} — Wedding Celebrations`,
    ...(site ? [`Invitation: ${site}`] : []),
    `Directions: ${venue.mapsShareUrl}`,
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} · ${groom.firstName} & ${bride.firstName}`,
    dates,
    details,
    location: `${venue.name}, ${venue.addressLines.join(', ')}`,
    ctz: weddingConfig.wedding.timeZone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
