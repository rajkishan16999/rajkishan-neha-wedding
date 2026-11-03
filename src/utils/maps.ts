import { weddingConfig } from '../config/weddingConfig';

const { venue } = weddingConfig;

/** "Open in Google Maps" — the verified share link, else a search link. */
export function getMapsOpenUrl(): string {
  if (venue.mapsShareUrl) return venue.mapsShareUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsSearchQuery)}`;
}

/** "Get Directions" — opens turn-by-turn navigation to the venue. */
export function getDirectionsUrl(): string {
  const params = new URLSearchParams({ api: '1', travelmode: 'driving' });
  if (venue.placeId) {
    params.set('destination', venue.googleListingName);
    params.set('destination_place_id', venue.placeId);
  } else if (venue.coordinates) {
    params.set('destination', `${venue.coordinates.lat},${venue.coordinates.lng}`);
  } else {
    params.set('destination', venue.mapsSearchQuery);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * The iframe embed URL. Uses the key-less Google Maps embed so no API key
 * (or billing) is required. An explicit override from config wins.
 */
export function getMapsEmbedUrl(): string {
  if (venue.embedUrlOverride) return venue.embedUrlOverride;
  const q = venue.coordinates
    ? `${venue.coordinates.lat},${venue.coordinates.lng}`
    : venue.mapsSearchQuery;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=en&output=embed`;
}
