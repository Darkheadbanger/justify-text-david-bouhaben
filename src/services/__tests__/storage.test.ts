import { describe, it, expect, beforeEach } from "vitest";

import {
  saveToken,
  getToken,
  getUserWordCounter,
  isUserAllowedToUseWords,
  recordWordUsage,
} from "../storage.servic.js";
import type { RateLimitData } from "../interfaces/storage.interface.js";

/**
 * @description Test Suite for Storage Service
 * Focuses on token management and rate limiting functionalities.
 * Uses Vitest for testing.
 * Covers:
 * - Saving and retrieving tokens by email
 * - Tracking user word counts and enforcing daily limits
 */
describe("Storage Service - Token Management", () => {
  describe("saveToken and getToken", () => {
    it("should save and retrieve a token for a given email", () => {
      const email: string = "test@mail.com";
      const token: string = "token123";

      saveToken(email, token);
      const retrievedTokenFromEmail: string | undefined = getToken(email);

      expect(retrievedTokenFromEmail).toBe(token);
    });

    it("should return undefined for non-existent email", () => {
      const result: string | undefined = getToken("non-existent@mail.com");

      expect(result).toBeUndefined();
    });

    it("should replace existing token when saving with same email", () => {
      const email: string = "replace@mail.com";
      const oldToken: string = "oldToken123";
      const newToken: string = "newToken456";

      saveToken(email, oldToken);
      saveToken(email, newToken);
      const retrievedToken: string | undefined = getToken(email);

      expect(retrievedToken).toBe(newToken);
      expect(retrievedToken).not.toBe(oldToken);
    });
  });
});

/**
 * @description Test Suite for Storage Service - Rate Limiting
 * Focuses on user word count tracking and daily limit enforcement.
 * Uses Vitest for testing.
 * Covers:
 * - Retrieving user word counters
 * - Allowing or blocking word usage based on daily limits
 * - Recording word usage and updating counters
 */
describe("Storage Service - Rate Limiting", () => {
  describe("getUserWordCounter", () => {
    it("should return undefined for a non-existent token", () => {
      const result: RateLimitData | undefined =
        getUserWordCounter("nonexistent-token");
      expect(result).toBeUndefined();
    });
    it("should return RateLimitData for an existing token", () => {
      const token: string = "Token123";
      recordWordUsage(token, 1000);
      const result: RateLimitData | undefined = getUserWordCounter(token);
      expect(result).toBeDefined();
      expect(result?.wordCount).toBe(1000);
      expect(result?.lastReset).toBeDefined();
    });
  });
});

/**
 * @description Test Suite for Storage Service - isUserAllowedToUseWords
 * Focuses on verifying if users can use more words based on their daily limit.
 * Uses Vitest for testing.
 * Covers:
 * - Allowing first-time users
 * - Allowing users within limit
 * - Blocking users exceeding limit
 */
describe("Storage Service - isUserAllowedToUseWords", () => {
  it("should allow first-time user to use words", () => {
    const token: string = "newUser123";
    const allowedResult: boolean = isUserAllowedToUseWords(token, 1000);
    expect(allowedResult).toBe(true);
  });  
  it("should allow user to use words within daily limit", () => {
    const token: string = "AlreadyUsedToken123";

    recordWordUsage(token, 5000);
    const allowedResult: boolean = isUserAllowedToUseWords(token, 1000);
    expect(allowedResult).toBe(true);
  });

  it("should block user when exceeding daily limit", () => {
    const token: string = "AlreadyUsedToken456";

    recordWordUsage(token, 79500);
    const allowedResult: boolean = isUserAllowedToUseWords(token, 1000);
    expect(allowedResult).toBe(false);
  });
});
