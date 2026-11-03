import { weddingConfig } from '../config/weddingConfig';

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts an 11-character YouTube video ID from any common link format:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://www.youtube.com/live/ID
 *  - https://www.youtube.com/embed/ID
 *  - https://www.youtube.com/shorts/ID
 *  - https://m.youtube.com/watch?v=ID&feature=share
 *  - or the bare ID itself
 * Returns null if nothing valid is found — never guesses.
 */
export function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (ID_RE.test(value)) return value;

  let url: URL;
  try {
    url = new URL(value.startsWith('http') ? value : `https://${value}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.|music\.)/, '');
  if (host === 'youtu.be') {
    const id = url.pathname.split('/')[1] ?? '';
    return ID_RE.test(id) ? id : null;
  }
  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const v = url.searchParams.get('v');
    if (v && ID_RE.test(v)) return v;
    const match = url.pathname.match(/^\/(?:live|embed|shorts|v)\/([A-Za-z0-9_-]{11})/);
    if (match) return match[1];
  }
  return null;
}

export type LiveStreamSource =
  | { kind: 'video'; videoId: string; embedUrl: string; watchUrl: string; thumbnail: string }
  | { kind: 'channel'; channelId: string; embedUrl: string; watchUrl: string }
  | { kind: 'none' };

/** Resolves the configured stream into embeddable URLs (or "none"). */
export function getLiveStreamSource(): LiveStreamSource {
  const { youtube, youtubeChannelId } = weddingConfig.liveStream;
  const videoId = parseYouTubeId(youtube);

  if (videoId) {
    return {
      kind: 'video',
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  const channelId = youtubeChannelId.trim();
  if (/^UC[A-Za-z0-9_-]{22}$/.test(channelId)) {
    return {
      kind: 'channel',
      channelId,
      embedUrl: `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&playsinline=1`,
      watchUrl: `https://www.youtube.com/channel/${channelId}/live`,
    };
  }

  return { kind: 'none' };
}
