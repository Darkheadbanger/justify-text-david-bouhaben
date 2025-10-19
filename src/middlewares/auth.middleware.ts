import type { Request, Response, NextFunction } from "express";
import { tokens } from "../services/storage.service.js";

/**
 * @description Middleware to authenticate requests using Bearer token
 * Validates the Authorization header format and token existence
 * Attaches the token to req.token if valid
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get Authorization header
  const authHeader: string | undefined = req.headers.authorization;

  // 2. Check if header exists
  if (!authHeader) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  // 3. Check format "Bearer <token>"
  const partsHeader: string[] = authHeader.split(" ");
  if (!authHeader.startsWith("Bearer ") || partsHeader.length !== 2) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  // 4. Extract token
  const token: string = partsHeader[1]!;

  // 5. Check if token exists in storage
  let isTokenExist: boolean = false;
  for (const [email, storedToken] of tokens) {
    if (storedToken === token) {
      isTokenExist = true;
      break;
    }
  }

  // 6. If token doesn't exist, return 401
  if (!isTokenExist) {
    return res.status(401).send("Unauthorized: Invalid token");
  }

  // 7. Attach token to request
  req.token = token;

  // 8. Continue to next middleware/controller
  next();
};
