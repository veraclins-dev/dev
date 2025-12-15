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

      // Check if file exists before reading
      try {
        await fs.access(cachePath);
      } catch {
        return null;
      }

      const data = await fs.readFile(cachePath, 'utf-8');
      if (!data || data.trim().length === 0) {
        // Empty file, delete and return null
        await this.delete(params).catch((error) => {
          console.error('Failed to delete cache entry:', error);
        });
        return null;
      }

      let parsed: {
        buffer: string | { type: string; data: number[] };
        contentType: string;
        maxAge: number;
        etag: string;
        upstreamEtag?: string;
        expireAt: number;
      };

      try {
        parsed = JSON.parse(data);
      } catch (parseError) {
        // Invalid JSON, delete corrupted cache entry
        console.error('Failed to parse cache entry JSON:', parseError);
        await this.delete(params).catch((error) => {
          console.error('Failed to delete cache entry:', error);
        });
        return null;
      }

      // Validate required fields
      if (
        !parsed.buffer ||
        !parsed.contentType ||
        typeof parsed.maxAge !== 'number' ||
        typeof parsed.expireAt !== 'number'
      ) {
        // Missing required fields, delete invalid cache entry
        await this.delete(params).catch((error) => {
          console.error('Failed to delete cache entry:', error);
        });
        return null;
      }

      // Convert base64 string back to Buffer
      let buffer: Buffer;
      try {
        if (typeof parsed.buffer === 'string') {
          // New format: base64 string
          buffer = Buffer.from(parsed.buffer, 'base64');
        } else if (
          parsed.buffer &&
          typeof parsed.buffer === 'object' &&
          'data' in parsed.buffer &&
          Array.isArray(parsed.buffer.data)
        ) {
          // Legacy format: JSON-serialized Buffer object
          buffer = Buffer.from(parsed.buffer.data);
        } else {
          // Invalid buffer format
          await this.delete(params).catch((error) => {
            console.error('Failed to delete cache entry:', error);
          });
          return null;
        }
      } catch (bufferError) {
        // Failed to decode buffer, delete corrupted cache entry
        console.error('Failed to decode cache buffer:', bufferError);
        await this.delete(params).catch((error) => {
          console.error('Failed to delete cache entry:', error);
        });
        return null;
      }

      // Validate buffer before returning cached entry
      // Check minimum size (same validation as fsResolver)
      if (!buffer || buffer.byteLength < 2) {
        // Invalid buffer, delete cache entry and return null to regenerate
        await this.delete(params).catch((error) => {
          console.error('Failed to delete cache entry:', error);
        });
        return null;
      }

      const entry: CacheEntry = {
        buffer,
        contentType: parsed.contentType,
        maxAge: parsed.maxAge,
        etag: parsed.etag || '',
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
    } catch (error) {
      // Log unexpected errors but don't throw
      console.error('Unexpected error reading cache:', error);
      return null;
    }
  }

  async set(params: CacheParams, entry: CacheEntry): Promise<void> {
    try {
      // Validate entry before caching
      if (!entry.buffer || entry.buffer.byteLength < 2) {
        // Don't cache invalid buffers
        console.warn('Attempted to cache invalid buffer, skipping');
        return;
      }

      if (!entry.contentType || typeof entry.maxAge !== 'number') {
        // Don't cache entries with invalid metadata
        console.warn(
          'Attempted to cache entry with invalid metadata, skipping',
        );
        return;
      }

      const cacheKey = this.getCacheKey(params);
      const cachePath = this.getCachePath(cacheKey);
      const expireAt = Date.now() + entry.maxAge * 1000;

      // Convert Buffer to base64 for JSON serialization
      const serializableEntry = {
        buffer: entry.buffer.toString('base64'),
        contentType: entry.contentType,
        maxAge: entry.maxAge,
        etag: entry.etag || '',
        ...(entry.upstreamEtag && { upstreamEtag: entry.upstreamEtag }),
        expireAt,
      };

      // Ensure cache directory exists
      await fs.mkdir(path.dirname(cachePath), { recursive: true });

      // Use atomic write: write to temp file first, then rename
      // This prevents corruption if the process is interrupted during write
      const tempPath = `${cachePath}.tmp`;
      const jsonData = JSON.stringify(serializableEntry);

      // Validate JSON can be serialized
      if (!jsonData || jsonData.length === 0) {
        console.warn('Failed to serialize cache entry, skipping');
        return;
      }

      // Write to temp file first
      await fs.writeFile(tempPath, jsonData, 'utf-8');

      // Atomically rename temp file to final location
      // This ensures the cache entry is either fully written or not present at all
      await fs.rename(tempPath, cachePath);
    } catch (error) {
      // Clean up temp file if it exists
      try {
        const cacheKey = this.getCacheKey(params);
        const cachePath = this.getCachePath(cacheKey);
        const tempPath = `${cachePath}.tmp`;
        await fs.unlink(tempPath).catch(() => {
          // Ignore if temp file doesn't exist
        });
      } catch {
        // Ignore cleanup errors
      }

      warnOnce('Failed to write to image cache');
      console.error('Cache write error:', error);
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
