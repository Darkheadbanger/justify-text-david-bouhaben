import type { Request, Response } from "express";
import { countWords } from "../services/word-counter.service.js";
import { justifyText } from "../services/justify.service.js";
import {
  isUserAllowedToUseWords,
  recordWordUsage,
} from "../services/storage.service.js";

/**
 * @description Justifies text with rate limiting
 * Checks word limit before justifying
 * Records word usage after justification
 * @type {void}
 */
export const justify = (req: Request, res: Response): void => {
  // 1. Get text from body
  const text: string = req.body;

  // 2. Validate text
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    res.status(400).send("Bad Request: Text is required");
    return;
  }

  // 3. Get token (set by auth middleware)
  const token: string = req.token!;

  // 4. Count words
  const words: string[] = countWords(text);
  const wordCount = words.length;

  // 5. Check rate limit
  const isAllowed: boolean = isUserAllowedToUseWords(token, wordCount);
  if (!isAllowed) {
    res.status(402).send("Payment Required");
    return;
  }

  // 6. Justify text
  const justifiedText: string = justifyText(text);

  // 7. Record usage
  recordWordUsage(token, wordCount);

  // 8. Return justified text
  res.setHeader("Content-Type", "text/plain");
  res.send(justifiedText);
};
