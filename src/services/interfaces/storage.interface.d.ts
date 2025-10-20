/**
 * @description Interface for storage service
 * Defines the structure for rate limit data associated with a token.
 * Includes current word count and timestamp of the last reset.
 */
export interface IRateLimitData {
    wordCount: number;
    lastReset: number;
}
/**
 * @description Type for saving a token associated with an email
 * @param email - User's email address
 * @param token - Unique token string
 * @returns void
 */
export type ISaveTokenFunction = (email: string, token: string) => void;
/**
 * @description Type for retrieving a token by email
 * @param email - User's email address
 * @returns Token string or undefined if not found
 */
export type IGetTokenFunction = (email: string) => string | undefined;
/**
 * @description Type for retrieving user's word counter data
 * @param token - User's unique token
 * @returns RateLimitData or undefined if user never used the API
 */
export type IGetUserWordCounterFunction = (token: string) => IRateLimitData | undefined;
/**
 * @description Type for checking if user can use more words
 * @param token - User's unique token
 * @param numberOfWords - Number of words user wants to use
 * @returns true if allowed, false if limit exceeded
 */
export type IsUserAllowedToUseWordsFunction = (token: string, numberOfWords: number) => boolean;
/**
 * @description Type for recording word usage by a user
 * @param token - User's unique token
 * @param numberOfWords - Number of words used
 * @returns void
 */
export type IRecordWordUsageFunction = (token: string, numberOfWords: number) => void;
/**
 * @description Type for the email-token storage Map
 */
export type TokensMap = Map<string, string>;
/**
 * @description Type for the rate limit storage Map
 */
export type UserWordCountersMap = Map<string, IRateLimitData>;
//# sourceMappingURL=storage.interface.d.ts.map