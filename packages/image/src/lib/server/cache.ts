import { promises as fs } from 'fs';
import path from 'path';

import { getHash } from './optimizer';

export interface CacheEntry {
  buffer: Buffer;
  contentType: string;
  maxAge: number;
  etag: string;
  upstreamEtag?: string;
}

export class ImageCache {
  private cacheDir: string;
  private cacheVersion: number;

  constructor(cacheDir: string, cacheVersion = 1) {
    this.cacheDir = cacheDir;
    this.cacheVersion = cacheVersion;
  }

  private getCacheKey(params: {
    href: string;
    width: number;
    quality: number;
    mimeType: string;
  }): string {
    return getHash([
      this.cacheVersion,
      params.href,
      params.width,
      params.quality,
      params.mimeType,
    ]);
  }

  private getCachePath(cacheKey: string): string {
    return path.join(this.cacheDir, cacheKey);
  }

  async get(params: {
    href: string;
    width: number;
    quality: number;
    mimeType: string;
  }): Promise<CacheEntry | null> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      const data = await fs.readFile(cachePath, 'utf-8');
      const entry = JSON.parse(data) as CacheEntry & { expireAt: number };

      if (Date.now() > entry.expireAt) {
        // Cache entry is expired, but we can still use it as stale
        return {
          ...entry,
          maxAge: 0, // Indicate that this is a stale response
        };
      }

      return entry;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }

  async set(
    params: {
      href: string;
      width: number;
      quality: number;
      mimeType: string;
    },
    entry: CacheEntry,
  ): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      const expireAt = Date.now() + entry.maxAge * 1000;

      await fs.mkdir(path.dirname(cachePath), { recursive: true });
      await fs.writeFile(
        cachePath,
        JSON.stringify({
          ...entry,
          expireAt,
        }),
      );
    } catch (error) {
      console.warn('Failed to write to image cache:', error);
    }
  }

  async delete(params: {
    href: string;
    width: number;
    quality: number;
    mimeType: string;
  }): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      await fs.unlink(cachePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Ignore errors when deleting cache entries
    }
  }

  async clear(): Promise<void> {
    try {
      await fs.rm(this.cacheDir, { recursive: true, force: true });
    } catch (error) {
      console.warn('Failed to clear image cache:', error);
    }
  }
}
