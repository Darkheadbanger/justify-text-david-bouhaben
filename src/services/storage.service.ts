import type { RateLimitData } from "./interfaces/storage.interface.js";

/**
 * Constants
 * @description Daily word limit and one day in milliseconds
 */
export const DAILY_WORD_LIMIT: number = 80000;
export const ONE_DAY_MS: number = 86400000;

/**
 * @description Storage for email-token pairs
 * Key: EMAIL (string)
 * Value: TOKEN (string)
 * @type {Map<string, string>}
 */
export const tokens: Map<string, string> = new Map<string, string>();

/**
 * @description Save a token for a given email
 * Replaces existing token if email already exists
 * @type {void}
 */
export const saveToken: (email: string, token: string) => void = (
  email: string,
  token: string
): void => {
  tokens.set(email, token);
};

/**
 * @description Get token by email
 * Returns undefined if email not found
 * @type {string | undefined}
 */
export const getToken: (email: string) => string | undefined = (
  email: string
): string | undefined => {
  return tokens.get(email);
};

/**
 * @description Word count tracker for each token
 * Key: TOKEN (string) - Unique user identifier
 * Value: RateLimitData (word count + last reset timestamp)
 * @type {Map<string, RateLimitData>}
 */
export const userWordCounters: Map<string, RateLimitData> = new Map<
  string,
  RateLimitData
>();

/**
 * @description Retrieves the word counter for a user
 * Returns undefined if the user has never used the API
 * @type {RateLimitData | undefined}
 */
export const getUserWordCounter = (
  token: string
): RateLimitData | undefined => {
  return userWordCounters.get(token);
};

/**
 * @description Checks if a user is allowed to use more words
 * Does NOT modify the counter, only performs verification
 * @returns true if allowed, false if limit exceeded
 */
export const isUserAllowedToUseWords = (
  token: string,
  numberOfWords: number
): boolean => {
  const userCounter: RateLimitData | undefined = getUserWordCounter(token);

  if (!userCounter) {
    return true;
  }

  const now: number = Date.now();
  const timeSinceLastReset: number = now - userCounter.lastReset;

  // New day (more than 24h) = counter reset = allowed
  if (timeSinceLastReset > ONE_DAY_MS) {
    return true;
  }

  // Same day = check if not exceeding 80,000 words
  const totalWordsAfterUse: number = userCounter.wordCount + numberOfWords;
  return totalWordsAfterUse <= DAILY_WORD_LIMIT;
};

/**
 * @description Records word usage by a user
 * Automatically resets if it's a new day
 */
export const recordWordUsage = (token: string, numberOfWords: number): void => {
  const now: number = Date.now();
  const userCounter: RateLimitData | undefined = getUserWordCounter(token);

  if (userCounter) {
    const timeSinceLastReset: number = now - userCounter.lastReset;

    if (timeSinceLastReset > ONE_DAY_MS) {
      // New day = reset counter to zero and add new words
      userWordCounters.set(token, {
        wordCount: numberOfWords,
        lastReset: now,
      });
    } else {
      // Same day = add words to existing counter
      userWordCounters.set(token, {
        wordCount: userCounter.wordCount + numberOfWords,
        lastReset: userCounter.lastReset,
      });
    }
  } else {
    // First use = create new counter
    userWordCounters.set(token, {
      wordCount: numberOfWords,
      lastReset: now,
    });
  }
};
