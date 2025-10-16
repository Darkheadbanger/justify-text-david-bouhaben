/**
 * @description Interface for storage service
 * Defines the structure for rate limit data associated with a TOKEN.
 * Includes current word count and timestamp of the last reset.
 */
export interface RateLimitData {
  wordCount: number; // Current word count (0 to 80000)
  lastReset: number; // Timestamp (ms) of last reset
}
