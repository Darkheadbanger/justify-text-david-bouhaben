import { Request } from "express";

/**
 * @description Extends the Express Request interface to include an optional token property.
 * This token can be used for authentication or rate limiting purposes.
 * The token is expected to be a string, but it may be undefined if not provided.
 * This extension allows middleware and route handlers to access the token directly from the request object.
 */
declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}
