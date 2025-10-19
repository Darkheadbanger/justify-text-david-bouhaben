import type { Request, Response, NextFunction } from "express";
import { tokens } from "../services/storage.service.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization;
  const partsHeader: string[] = authHeader ? authHeader.split(" ") : [];
  console.log("Auth Header:", authHeader);
  console.log("Parts Header:", partsHeader);
  thisTokenUnauthorized(authHeader, partsHeader, res);

  const token: string | undefined = partsHeader ? partsHeader[1] : undefined;

  let isTokenExist: boolean = false;
  for (const [storedToken] of tokens) {
    if (storedToken === token) {
      isTokenExist = true;
      break;
    }
  }

  thisTokenDosentExist(isTokenExist, token, res);

  if (token === undefined) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token is undefined" });
  }
  req.token = token;
  next();
};

export const thisTokenUnauthorized = (
  authHeader: string | undefined,
  partsHeader: string[],
  res: Response
) => {
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  if (!authHeader.startsWith("Bearer ") || partsHeader.length !== 2) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }
};

export const thisTokenDosentExist = (
  isTokenExist: boolean,
  token: string | undefined,
  res: Response
) => {
  if (!isTokenExist) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

authenticate;
