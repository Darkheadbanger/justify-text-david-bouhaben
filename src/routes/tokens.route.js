import express from "express";
import { generateTokenController } from "../controllers/token.controller.js";
const router = express.Router();
const tokenPath = "/token";
router.post(tokenPath, generateTokenController);
export default router;
//# sourceMappingURL=tokens.route.js.map