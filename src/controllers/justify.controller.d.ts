import type { Request, Response } from "express";
/**
 * @description Justifies text with rate limiting.
 * Checks word limit before justifying and records word usage after justification.
 * @param req - Express request object containing text in body
 * @param res - Express response object
 * @returns void
 */
export declare const justify: (req: Request, res: Response) => void;
//# sourceMappingURL=justify.controller.d.ts.map