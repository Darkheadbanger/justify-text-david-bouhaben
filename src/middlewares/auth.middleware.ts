import type { Request, Response, NextFunction } from "express";
import { tokens } from "../services/storage.service.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization;
  const partsHeader: string[] = authHeader ? authHeader.split(" ") : [];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  if (!authHeader.startsWith("Bearer ") || partsHeader.length !== 2) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  const tokenExtracted: string | undefined = partsHeader
    ? partsHeader[1]
    : undefined;

  let isTokenExist: boolean = false;
  for (const [email, storedToken] of tokens) {
    if (storedToken === tokenExtracted) {
      isTokenExist = true;
      break;
    }
  }
};
