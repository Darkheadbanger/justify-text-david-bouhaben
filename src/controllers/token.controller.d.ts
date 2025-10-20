import type { Request, Response } from "express";
/**
 * @description Generates or retrieves a token for a given email.
 * If the email already exists, returns the existing token.
 * If not, generates a new UUID token and saves it.
 * @param req - Express request object containing email in body
 * @param res - Express response object
 * @returns void
 */
export declare const generateTokenController: (req: Request, res: Response) => void;
//# sourceMappingURL=token.controller.d.ts.map