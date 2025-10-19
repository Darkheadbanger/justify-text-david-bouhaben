import type { Request, Response } from "express";
import { countWords } from "../services/word-counter.service.js";
import { justifyText } from "../services/justify.service.js";
import {
  isUserAllowedToUseWords,
  recordWordUsage,
} from "../services/storage.service.js";

export const justifyController = (req: Request, res: Response) => {
  const text: string = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ message: "Bad Request: Text is required" });
  }

  const token: string | undefined = req.token;

  if (token === undefined) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token is undefined" });
  }

  const words: string[] = countWords(text);
  const wordLength = words.length;

  const isAllowed: boolean = isUserAllowedToUseWords(token, wordLength);
  if (!isAllowed) {
    return res
      .status(402)
      .json({ message: "Payment Required: Word limit exceeded for the token" });
  }

  const justifiedText: string = justifyText(text);

  recordWordUsage(token, wordLength);

  res.setHeader("Content-Type", "text/plain");
  res.send(justifiedText);
};
