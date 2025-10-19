import express from "express";
import { generateTokenController } from "../controllers/token.controller.js";

const router: express.Router = express.Router();

router.post("/token", generateTokenController);

export default router;
