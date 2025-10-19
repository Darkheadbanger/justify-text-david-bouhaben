import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { saveToken, getToken } from "../services/storage.service.js";

/**
 * @description Generates a token for a given email
 * If the email already exists, returns the existing token
 * Otherwise, creates a new token and saves it
 * @returns Token as text/plain
 */
export const generateToken = (req: Request, res: Response) => {
  const { email } = req.body;

  // Validate email presence and type
  if (!email || typeof email !== "string") {
    return res.status(400).send("Bad Request: Email is required");
  }

  // Validate email format
  const emailTypeRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTypeRegex.test(email)) {
    return res.status(400).send("Bad Request: Invalid email format");
  }

  // Check if email already has a token
  let token = getToken(email);
  
  // If not, generate a new one
  if (!token) {
    token = randomUUID();
    saveToken(email, token);
  }

  // Return ONLY the token as text/plain
  res.setHeader("Content-Type", "text/plain");
  res.send(token);
};


