/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the single source of truth for the whole website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Edit the values below to update any content on the site. You should never
 *  need to edit individual components to change names, dates, times, the map
 *  location, the YouTube live-stream link or the public website URL.
 *
 *  ⚠️  This file is also imported by `vite.config.ts` (to inject SEO / social
 *      sharing metadata into index.html at build time), so keep it free of
 *      browser-only code (no `window`, no `document`).
 */

// ───────────────────────────── Types ─────────────────────────────

export interface Person {
  /** Name exactly as it should be printed, including honorific. */
  name: string;
}

export interface Groom {
  firstName: string;
  fullName: string;
  designation: string;
  organisation: string;
  grandfather: string;
  father: string;
  mother: string;
}

export interface Bride {
  firstName: string;
  fullName: string;
  father: string;
  mother: string;
}

export type IllustrationKey = 'mehendi' | 'mandap' | 'vidaai';

export interface WeddingEvent {
  id: string;
  title: string;
  /** Optional Hindi title shown above the English title. */
  hindiTitle?: string;
  /** Calendar date in India, format YYYY-MM-DD. */
  date: string;
  /**
   * Start time in India (24-hour, HH:mm). Used for the calendar link.
   * Set to `null` if no time has been announced — the calendar entry
   * then becomes an all-day event.
   */
  startTime: string | null;
  /** Human-friendly time shown on the card, e.g. "7:00 PM onwards". */
  timeLabel: string | null;
  /**
   * Length of the calendar entry in hours. No end time is shown on the
   * website — this is only used so the calendar entry has a sensible end.
   */
  calendarDurationHours: number;
  description: string;
  illustration: IllustrationKey;
  illustrationAlt: string;
}

export interface VenueConfig {
  name: string;
  /** Official listing name on Google Maps (used for search links). */
  googleListingName: string;
  addressLines: string[];
  city: string;
  hotelWebsite: string;
  /**
   * The verified Google Maps share link for the venue.
   * Used by the "Open in Google Maps" button.
   */
  mapsShareUrl: string;
  /**
   * Text used to search Google Maps if no share link / coordinates are set.
   */
  mapsSearchQuery: string;
  /**
   * Verified coordinates of the venue. These were read from the
   * Google Maps share link above (place: "Hotel Shanti Grand").
   * Set to `null` to fall back to the text search query.
   */
  coordinates: { lat: number; lng: number } | null;
  /**
   * Optional Google Place ID (starts with "ChIJ…"). If provided, the
   * "Get Directions" button will route to this exact place.
   */
  placeId: string;
  /**
   * Optional full iframe `src` copied from Google Maps → Share → Embed a map.
   * If provided it overrides the automatically generated embed.
   */
  embedUrlOverride: string;
}

export interface LiveStreamConfig {
  /**
   * Paste ANY YouTube link here — a normal video, a live stream, a
   * youtu.be short link, a /live/ link — or just the 11-character video ID.
   * Leave empty ('') to show the "link will be available soon" placeholder.
   */
  youtube: string;
  /**
   * Optional: a YouTube channel ID (starts with "UC…"). If set and no
   * video link is given above, the player shows whatever that channel is
   * currently streaming live.
   */
  youtubeChannelId: string;
}

export interface WeddingConfig {
  site: {
    /**
     * The PERMANENT public URL of this website (e.g. https://rajkishan-neha.vercel.app).
     * ⚠️ Required for the QR code, WhatsApp share preview and social metadata.
     * Must start with https:// — never a localhost or temporary preview URL.
     */
    url: string;
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImagePath: string;
    themeColor: string;
  };
  invocation: string;
  groom: Groom;
  bride: Bride;
  wedding: {
    /** Main ceremony date in India, YYYY-MM-DD. */
    date: string;
    /** Main ceremony time in India, HH:mm (24-hour). */
    time: string;
    timeZone: 'Asia/Kolkata';
    /** UTC offset that matches `timeZone`. India has no daylight saving. */
    utcOffset: '+05:30';
    displayDate: string;
    displayTime: string;
  };
  events: WeddingEvent[];
  venue: VenueConfig;
  liveStream: LiveStreamConfig;
  sender: {
    names: string[];
    relation: string;
    addressLines: string[];
  };
  messages: {
    heroEyebrow: string;
    heroSubtitle: string;
    invitationBlessing: string;
    invitationIntro: string;
    invitationClosing: string;
    familyMessage: string;
    footerTagline: string;
    liveTitle: string;
    liveSubtitle: string;
  };
  invitationPdf: {
    /** Path inside /public. */
    path: string;
    downloadFileName: string;
  };
  music: {
    /**
     * Optional background music. Put an .mp3 in /public/audio/ and set e.g.
     * '/audio/shehnai.mp3'. Leave '' to hide the music button entirely.
     * Music never autoplays — guests must tap to play.
     */
    src: string;
    title: string;
  };
}

// ───────────────────────────── Content ─────────────────────────────

export const weddingConfig: WeddingConfig = {
  site: {
    url: '', // ← set to your permanent https:// URL after the first deployment
    title: 'Rajkishan & Neha | Wedding Invitation | 21 November 2026',
    description:
      'Join Rajkishan Gupta and Neha Agrahari in celebrating their wedding on 21 November 2026 at Shanti Grand Hotel, Raebareli.',
    ogTitle: 'Rajkishan & Neha – Wedding Celebration',
    ogDescription: 'Together Forever Begins Here.',
    ogImagePath: '/images/og-image.jpg',
    themeColor: '#791F2B',
  },

  invocation: '॥ सिद्धिबुद्धिसहिताय श्रीमन्महागणाधिपतये नमः ॥',

  groom: {
    firstName: 'Rajkishan',
    fullName: 'Rajkishan Gupta',
    designation: 'Senior Production Engineer',
    organisation: 'Indian Oil Corporation Limited',
    grandfather: 'Shri Rajaram Gupta',
    father: 'Mr. Ajay Kumar Gupta',
    mother: 'Mrs. Saroj Gupta',
  },

  bride: {
    firstName: 'Neha',
    fullName: 'Neha Agrahari',
    father: 'Mr. Beerendra Agrahari',
    mother: 'Mrs. Asha Agrahari',
  },

  wedding: {
    date: '2026-11-21',
    time: '19:00',
    timeZone: 'Asia/Kolkata',
    utcOffset: '+05:30',
    displayDate: '21 November 2026',
    displayTime: '7:00 PM',
  },

  events: [
    {
      id: 'mehendi-sangeet',
      title: 'Mehendi & Sangeet',
      hindiTitle: 'मेहंदी एवं संगीत',
      date: '2026-11-20',
      startTime: '18:00',
      timeLabel: '6:00 PM onwards',
      calendarDurationHours: 5,
      description:
        'An evening of colours, music, dance and joyful celebrations as we begin our wedding festivities.',
      illustration: 'mehendi',
      illustrationAlt: 'Henna-adorned hands resting on a dhol, surrounded by marigolds and roses',
    },
    {
      id: 'wedding-ceremony',
      title: 'The Wedding Ceremony',
      hindiTitle: 'शुभ विवाह',
      date: '2026-11-21',
      startTime: '19:00',
      timeLabel: '7:00 PM onwards',
      calendarDurationHours: 6,
      description:
        'Join us as we exchange vows and embark on a beautiful journey of love, companionship and togetherness.',
      illustration: 'mandap',
      illustrationAlt: 'A traditional wedding mandap with golden pillars, garlands and the sacred fire',
    },
    {
      id: 'vidaai',
      title: 'Vidaai',
      hindiTitle: 'विदाई',
      date: '2026-11-22',
      startTime: '10:00',
      timeLabel: '10:00 AM',
      calendarDurationHours: 2,
      description:
        'With hearts full of love and blessings, we bid farewell as the newlyweds begin their new chapter together.',
      illustration: 'vidaai',
      illustrationAlt: 'A decorated doli palanquin adorned with marigold garlands and flower petals',
    },
  ],

  venue: {
    name: 'Shanti Grand Hotel',
    googleListingName: 'Hotel Shanti Grand',
    addressLines: ['Ekta Vihar Colony', 'Raebareli, Uttar Pradesh, India'],
    city: 'Raebareli',
    hotelWebsite: 'https://www.hotelshantigrand.com/',
    mapsShareUrl: 'https://maps.app.goo.gl/daq12tEo6wqPpiSq5',
    mapsSearchQuery: 'Hotel Shanti Grand, Ekta Vihar Colony, Raebareli, Uttar Pradesh',
    coordinates: { lat: 26.2386492, lng: 81.2398644 },
    placeId: '',
    embedUrlOverride: '',
  },

  liveStream: {
    youtube: '', // ← paste the YouTube live / video link here when available
    youtubeChannelId: '',
  },

  sender: {
    names: ['Mr. Ajay Kumar Gupta', 'Mrs. Saroj Gupta'],
    relation: 'Parents of the Groom',
    addressLines: [
      'H. No. 456, Babuganj,',
      'P.S. Unchahar,',
      'District Raebareli,',
      'Uttar Pradesh – 229401.',
    ],
  },

  messages: {
    heroEyebrow: 'A Wedding Celebration',
    heroSubtitle: 'Two Hearts, One Journey, A Lifetime of Togetherness.',
    invitationBlessing: 'With the blessings of the Almighty',
    invitationIntro:
      'We cordially invite you to grace the auspicious wedding celebrations of our beloved son.',
    invitationClosing:
      'Your gracious presence and blessings will make this occasion truly memorable for our families.',
    familyMessage:
      'We look forward to celebrating this beautiful occasion with you. Your presence, love and blessings will make our happiness complete.',
    footerTagline: 'Together Forever Begins Here.',
    liveTitle: 'Celebrate With Us, Wherever You Are',
    liveSubtitle:
      "Can't join us in person? Be a part of our special moments through our live wedding broadcast.",
  },

  invitationPdf: {
    path: '/invitation/rajkishan-neha-wedding-invitation.pdf',
    downloadFileName: 'Rajkishan-Neha-Wedding-Invitation.pdf',
  },

  music: {
    src: '',
    title: 'Wedding music',
  },
};

export default weddingConfig;
