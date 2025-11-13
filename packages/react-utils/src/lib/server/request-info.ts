/**
 * Utilities for extracting request information including IP address, device, browser, and OS
 */

export interface RequestInfo {
  userAgent: string;
  ipAddress: string;
  location: string;
  device: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

/**
 * Extracts comprehensive request information from a Request object
 */
export function getRequestInfo(request: Request): RequestInfo {
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  // Extract IP address - prioritize trusted headers
  const ipAddress = getClientIP(request);

  // Parse user agent for device, browser, and OS information
  const deviceInfo = parseUserAgent(userAgent);

  return {
    userAgent,
    ipAddress,
    location: ipAddress, // For now, use IP as location (you can add geolocation later)
    device: deviceInfo.device,
    browser: deviceInfo.browser,
    os: deviceInfo.os,
  };
}

/**
 * Extracts the client IP address from request headers
 * Prioritizes trusted headers from proxies and CDNs
 */
export function getClientIP(request: Request): string {
  // Check for trusted proxy headers in order of preference
  const trustedHeaders = [
    'fly-client-ip', // Fly.io specific
    'cf-connecting-ip', // Cloudflare
    'true-client-ip', // Cloudflare Enterprise
    'x-forwarded-for', // Standard proxy header (take first IP)
    'x-real-ip', // Nginx
    'x-client-ip', // Apache
    'x-cluster-client-ip', // Cluster
    'x-forwarded', // Standard
    'forwarded-for', // Standard
    'forwarded', // Standard
  ];

  for (const header of trustedHeaders) {
    const value = request.headers.get(header);
    if (value) {
      // For x-forwarded-for, take the first IP (client IP)
      if (header === 'x-forwarded-for') {
        const firstIP = value.split(',')[0]?.trim();
        if (firstIP && isValidIP(firstIP)) {
          return firstIP;
        }
      } else if (isValidIP(value)) {
        return value;
      }
    }
  }

  return 'Unknown';
}

/**
 * Simple IP validation
 */
function isValidIP(ip: string): boolean {
  // Basic IPv4 validation
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // Basic IPv6 validation
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Detects device type from user agent string
 */
function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone')
  ) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  return 'desktop';
}

/**
 * Detects browser from user agent string
 */
function detectBrowser(ua: string): string {
  const browserPatterns = [
    { pattern: 'chrome', exclude: 'edg', name: 'chrome' },
    { pattern: 'firefox', exclude: '', name: 'firefox' },
    { pattern: 'safari', exclude: 'chrome', name: 'safari' },
    { pattern: 'edg', exclude: '', name: 'edge' },
    { pattern: 'opera', exclude: '', name: 'opera' },
    { pattern: 'brave', exclude: '', name: 'brave' },
  ];

  for (const { pattern, exclude, name } of browserPatterns) {
    if (ua.includes(pattern) && (!exclude || !ua.includes(exclude))) {
      return name;
    }
  }

  return 'unknown';
}

/**
 * Detects operating system from user agent string
 */
function detectOS(ua: string): string {
  const osPatterns = [
    { pattern: 'windows nt 10', name: 'windows 10' },
    { pattern: 'windows nt 6.3', name: 'windows 8.1' },
    { pattern: 'windows nt 6.2', name: 'windows 8' },
    { pattern: 'windows nt 6.1', name: 'windows 7' },
    { pattern: 'windows', name: 'windows' },
    { pattern: 'mac os x', name: 'macos' },
    { pattern: 'macos', name: 'macos' },
    { pattern: 'linux', name: 'linux' },
    { pattern: 'android', name: 'android' },
    { pattern: 'ios', name: 'ios' },
    { pattern: 'iphone', name: 'ios' },
    { pattern: 'ipad', name: 'ios' },
  ];

  for (const { pattern, name } of osPatterns) {
    if (ua.includes(pattern)) {
      return name;
    }
  }

  return 'unknown';
}

/**
 * Parses user agent string to extract device, browser, and OS information
 * For production use, consider using a library like 'ua-parser-js' for more accuracy
 */
function parseUserAgent(userAgent: string): {
  device: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
} {
  const ua = userAgent.toLowerCase();

  return {
    device: detectDevice(ua),
    browser: detectBrowser(ua),
    os: detectOS(ua),
  };
}

/**
 * Gets the user's timezone from request headers
 */
export function getTimezone(request: Request): string | null {
  return request.headers.get('x-timezone') || null;
}

/**
 * Gets the user's language preferences from request headers
 */
export function getLanguage(request: Request): string | null {
  return request.headers.get('accept-language') || null;
}

/**
 * Gets the referer URL from request headers
 */
export function getReferer(request: Request): string | null {
  return (
    request.headers.get('referer') || request.headers.get('referrer') || null
  );
}

/**
 * Gets all request headers as a plain object
 */
export function getAllHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

/**
 * Checks if the request is from a bot/crawler
 */
export function isBot(request: Request): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'crawling',
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
  ];

  return botPatterns.some((pattern) =>
    userAgent.toLowerCase().includes(pattern),
  );
}

/**
 * Gets the request origin (protocol + host)
 */
export function getOrigin(request: Request): string {
  const host = request.headers.get('host') || 'localhost';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}
