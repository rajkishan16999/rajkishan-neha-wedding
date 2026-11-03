import { weddingConfig } from '../config/weddingConfig';

/** Removes trailing slashes: "https://x.com/" → "https://x.com". */
function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * The public URL of the site, used for sharing.
 * Prefers the configured permanent URL; falls back to the current origin
 * (useful in local development, never used for the QR code).
 */
export function getSiteUrl(): string {
  const configured = weddingConfig.site.url.trim();
  if (configured) return stripTrailingSlash(configured);
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export type UrlValidation =
  | { ok: true; url: string }
  | { ok: false; reason: string };

const PRIVATE_HOST =
  /^(localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|\[?::1\]?)$/i;

/**
 * Validates that a URL is safe to print permanently on a QR code:
 * https, public host, not a temporary preview deployment.
 * Returns the normalised ROOT url (always ending in "/").
 */
export function validatePermanentUrl(raw: string): UrlValidation {
  const value = raw.trim();
  if (!value) {
    return {
      ok: false,
      reason:
        'No website URL is configured yet. Set `site.url` in src/config/weddingConfig.ts to your permanent https:// address and redeploy.',
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return { ok: false, reason: `"${value}" is not a valid URL.` };
  }

  if (parsed.protocol !== 'https:') {
    return { ok: false, reason: 'The URL must start with https:// so it opens securely on every phone.' };
  }

  const host = parsed.hostname.toLowerCase();
  if (PRIVATE_HOST.test(host) || host.endsWith('.local') || host.endsWith('.localhost')) {
    return { ok: false, reason: `"${host}" is a local address — guests would not be able to open it.` };
  }

  // Vercel preview deployments look like: project-git-branch-team.vercel.app
  // or project-abc123xyz-team.vercel.app. They change on every deploy.
  if (host.endsWith('.vercel.app') && (/-git-/.test(host) || /-[a-z0-9]{9}-[a-z0-9-]+\.vercel\.app$/.test(host))) {
    return {
      ok: false,
      reason:
        'This looks like a temporary Vercel preview URL. Use the project\'s production domain (e.g. https://your-project.vercel.app) or a custom domain.',
    };
  }

  if (!host.includes('.')) {
    return { ok: false, reason: `"${host}" is not a public domain name.` };
  }

  return { ok: true, url: `${parsed.protocol}//${parsed.host}/` };
}
