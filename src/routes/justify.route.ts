import express from "express";
import { justifyController } from "../controllers/justify.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: express.Router = express.Router();

router.post("/justify", authenticate, justifyController);

export default router;
