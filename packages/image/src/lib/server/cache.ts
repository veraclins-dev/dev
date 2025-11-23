import { promises as fs } from 'node:fs';
import path from 'node:path';

import { warnOnce } from '@veraclins-dev/utils';

import { getHash } from './optimizer';

export interface CacheEntry {
  buffer: Buffer;
  contentType: string;
  maxAge: number;
  etag: string;
  upstreamEtag?: string;
}

export interface CacheParams {
  href: string;
  width: number;
  quality: number;
  mimeType: string;
  method: string;
  fit: string;
}
export class ImageCache {
  private cacheDir: string;
  private cacheVersion: number;

  constructor(cacheDir: string, cacheVersion = 1) {
    this.cacheDir = cacheDir;
    this.cacheVersion = cacheVersion;
  }

  private getCacheKey(params: CacheParams): string {
    return getHash([
      this.cacheVersion,
      params.href,
      params.width,
      params.quality,
      params.mimeType,
      params.method,
      params.fit,
    ]);
  }

  private getCachePath(cacheKey: string): string {
    return path.join(this.cacheDir, cacheKey);
  }

  async get(params: CacheParams): Promise<CacheEntry | null> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      const data = await fs.readFile(cachePath, 'utf-8');
      const parsed = JSON.parse(data) as {
        buffer: string | { type: string; data: number[] };
        contentType: string;
        maxAge: number;
        etag: string;
        upstreamEtag?: string;
        expireAt: number;
      };

      // Convert base64 string back to Buffer
      let buffer: Buffer;
      if (typeof parsed.buffer === 'string') {
        // New format: base64 string
        buffer = Buffer.from(parsed.buffer, 'base64');
      } else if (
        parsed.buffer &&
        typeof parsed.buffer === 'object' &&
        'data' in parsed.buffer
      ) {
        // Legacy format: JSON-serialized Buffer object
        buffer = Buffer.from(parsed.buffer.data);
      } else {
        return null;
      }

      const entry: CacheEntry = {
        buffer,
        contentType: parsed.contentType,
        maxAge: parsed.maxAge,
        etag: parsed.etag,
        ...(parsed.upstreamEtag && { upstreamEtag: parsed.upstreamEtag }),
      };

      if (Date.now() > parsed.expireAt) {
        // Cache entry is expired, but we can still use it as stale
        return {
          ...entry,
          maxAge: 0, // Indicate that this is a stale response
        };
      }

      return entry;
    } catch (_e) {
      return null;
    }
  }

  async set(params: CacheParams, entry: CacheEntry): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      const expireAt = Date.now() + entry.maxAge * 1000;

      // Convert Buffer to base64 for JSON serialization
      const serializableEntry = {
        buffer: entry.buffer.toString('base64'),
        contentType: entry.contentType,
        maxAge: entry.maxAge,
        etag: entry.etag,
        ...(entry.upstreamEtag && { upstreamEtag: entry.upstreamEtag }),
        expireAt,
      };

      await fs.mkdir(path.dirname(cachePath), { recursive: true });
      await fs.writeFile(cachePath, JSON.stringify(serializableEntry));
    } catch (_e) {
      warnOnce('Failed to write to image cache');
    }
  }

  async delete(params: CacheParams): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      await fs.unlink(cachePath);
    } catch (_e) {
      // Ignore errors when deleting cache entries
    }
  }

  async clear(): Promise<void> {
    try {
      await fs.rm(this.cacheDir, { recursive: true, force: true });
    } catch (_e) {
      warnOnce('Failed to clear image cache');
    }
  }
}
