import express from "express";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response): void => {
  res.json({
    message: "Text Justification API",
    endpoints: {
      "POST /api/token": "Generate authentication token",
      "POST /api/justify": "Justify text (requires Bearer token)",
    },
  });
});

export default router;
