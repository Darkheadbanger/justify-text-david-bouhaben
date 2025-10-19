import type { Request, Response, NextFunction } from "express";
import { tokens } from "../services/storage.service.js";

/**
 * @description Authentication middleware
 * Verifies Bearer token in Authorization header
 * Attaches token to req.token if valid
 * @type {void}
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 1. Get Authorization header
  const authHeader: string | undefined = req.headers.authorization;

  // 2. Check if header exists
  if (!authHeader) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  }

  // 3. Check format "Bearer <token>"
  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).send("Unauthorized: Invalid token format");
    return;
  }

  // 4. Extract token
  const token: string = parts[1]!;

  // 5. Verify token exists in storage
  let tokenExists = false;
  for (const [email, storedToken] of tokens) {
    if (storedToken === token) {
      tokenExists = true;
      break;
    }
  }

  if (!tokenExists) {
    res.status(401).send("Unauthorized: Invalid token");
    return;
  }

  // 6. Attach token to request
  req.token = token;

  // 7. Continue to controller
  next();
};
