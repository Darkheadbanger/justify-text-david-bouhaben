import type { ISaveTokenFunction, IGetTokenFunction, IGetUserWordCounterFunction, IsUserAllowedToUseWordsFunction, IRecordWordUsageFunction, TokensMap, UserWordCountersMap } from "./interfaces/storage.interface.js";
/**
 * Constants
 * @description Daily word limit and one day in milliseconds
 */
export declare const DAILY_WORD_LIMIT: number;
export declare const ONE_DAY_MS: number;
/**
 * @description Storage for email-token pairs
 * Key: EMAIL (string)
 * Value: TOKEN (string)
 * @type {Map<string, string>}
 */
export declare const tokens: TokensMap;
/**
 * @description Save a token for a given email
 * Replaces existing token if email already exists
 * @type {void}
 */
export declare const saveToken: ISaveTokenFunction;
/**
 * @description Get token by email
 * Returns undefined if email not found
 * @type {string | undefined}
 */
export declare const getToken: IGetTokenFunction;
/**
 * @description Word count tracker for each token
 * Key: TOKEN (string) - Unique user identifier
 * Value: RateLimitData (word count + last reset timestamp)
 * @type {Map<string, RateLimitData>}
 */
export declare const userWordCounters: UserWordCountersMap;
/**
 * @description Retrieves the word counter for a user
 * Returns undefined if the user has never used the API
 * @type {RateLimitData | undefined}
 */
export declare const getUserWordCounter: IGetUserWordCounterFunction;
/**
 * @description Checks if a user is allowed to use more words
 * Does NOT modify the counter, only performs verification
 * @returns true if allowed, false if limit exceeded
 */
export declare const isUserAllowedToUseWords: IsUserAllowedToUseWordsFunction;
/**
 * @description Records word usage by a user
 * Automatically resets if it's a new day
 */
export declare const recordWordUsage: IRecordWordUsageFunction;
//# sourceMappingURL=storage.service.d.ts.map