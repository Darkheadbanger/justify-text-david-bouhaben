import type { Request, Response } from "express";
import { countWords } from "../services/word-counter.service.js";
import { justifyText } from "../services/justify.service.js";
import {
  isUserAllowedToUseWords,
  recordWordUsage,
} from "../services/storage.service.js";

/**
 * @description Justifies text with rate limiting.
 * Checks word limit before justifying and records word usage after justification.
 * @param req - Express request object containing text in body
 * @param res - Express response object
 * @returns void
 */
export const justify = (req: Request, res: Response): void => {
  const text: string = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    res.status(400).send("Bad Request: Text is required");
    return;
  }

  const token: string = req.token!;
  const words: string[] = countWords(text);
  const wordCount = words.length;

  const isAllowed: boolean = isUserAllowedToUseWords(token, wordCount);
  if (!isAllowed) {
    res.status(402).send("Payment Required");
    return;
  }

  const justifiedText: string = justifyText(text);
  recordWordUsage(token, wordCount);

  res.setHeader("Content-Type", "text/plain");
  res.send(justifiedText);
};
