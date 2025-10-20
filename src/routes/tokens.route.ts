import express from "express";
import { generateTokenController } from "../controllers/token.controller.js";

const router: express.Router = express.Router();
const apiLink: string = "api";

const tokenPath: string = "/token";
router.post(apiLink + tokenPath, generateTokenController);

export default router;
