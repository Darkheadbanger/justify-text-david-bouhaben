import express from "express";
import { generateToken } from "../controllers/token.controller.js";

const router: express.Router = express.Router();

router.post("/token", generateToken);

export default router;
