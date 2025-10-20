import type { Request, Response, NextFunction } from "express";
/**
 * @description Authentication middleware that verifies Bearer token in Authorization header
 * and attaches token to req.token if valid
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns void
 */
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map