import express from "express";
import { justify } from "../controllers/justify.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: express.Router = express.Router();
const apiLink: string = "api";

const justifyPath: string = "/justify";
router.post(apiLink + justifyPath, authenticate, justify);

export default router;
