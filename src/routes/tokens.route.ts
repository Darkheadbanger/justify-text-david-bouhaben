import express from "express";
import { generateTokenController } from "../controllers/token.controller.js";

const router: express.Router = express.Router();
const tokenPath: string = "/token";
router.post(tokenPath, generateTokenController);

export default router;
