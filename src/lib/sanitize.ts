/**
 * Sanitize a URL from untrusted Nostr event data.
 * Only allows https: URLs. Returns null for anything suspicious.
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') {
      return parsed.href;
    }
    // Allow http only for localhost dev
    if (parsed.protocol === 'http:' && parsed.hostname === 'localhost') {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}
