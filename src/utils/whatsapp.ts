import { weddingConfig } from '../config/weddingConfig';
import { formatLongDate } from './date';
import { getSiteUrl } from './site';

/** The pre-filled invitation message shared on WhatsApp / native share. */
export function getShareMessage(): string {
  const { groom, bride, wedding, venue } = weddingConfig;
  const url = getSiteUrl();
  return [
    `🌸 You are cordially invited to the wedding of *${groom.firstName} & ${bride.firstName}* 🌸`,
    '',
    `📅 ${formatLongDate(wedding.date)}, ${wedding.displayTime} onwards`,
    `📍 ${venue.name}, ${venue.city}`,
    '',
    `View the invitation: ${url}`,
  ].join('\n');
}

/** Opens WhatsApp (app on phones, web on desktop) with the message pre-filled. */
export function getWhatsAppShareUrl(): string {
  return `https://wa.me/?text=${encodeURIComponent(getShareMessage())}`;
}

/**
 * Uses the native share sheet when available, otherwise copies the link.
 * Resolves to the action taken so the UI can show feedback.
 */
export async function shareInvitation(): Promise<'shared' | 'copied' | 'failed'> {
  const { groom, bride } = weddingConfig;
  const url = getSiteUrl();
  const title = `${groom.firstName} & ${bride.firstName} – Wedding Invitation`;

  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      await navigator.share({ title, text: getShareMessage().replace(/\n?View the invitation: .*$/, ''), url });
      return 'shared';
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return 'shared';
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
}
