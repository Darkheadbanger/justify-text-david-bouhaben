import type { Request, Response, NextFunction } from "express";
import { tokens } from "../services/storage.service.js";

/**
 * @description Authentication middleware for protected routes
 * Verifies Bearer token in Authorization header
 * Attaches token to req.token if valid
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }

  // Extract token
  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }

  const token: string = parts[1]!;

  // Verify token exists in storage
  const tokenExists: boolean = isTokenValid(token);

  if (!tokenExists) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }

  // Attach token to request and continue
  req.token = token;
  next();
};

/**
 * @description Checks if a token exists in the storage
 * @param token - Token string to validate
 * @returns {boolean}
 */
const isTokenValid = (token: string): boolean => {
  for (const [email, storedToken] of tokens) {
    if (storedToken === token) {
      return true;
    }
  }
  return false;
};
