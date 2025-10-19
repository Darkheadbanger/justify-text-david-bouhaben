import type { Request, Response, NextFunction } from "express";

export interface IAuthenticate {
  (req: Request, res: Response, next: NextFunction): void;
}
