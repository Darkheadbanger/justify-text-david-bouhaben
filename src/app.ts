import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";

const app: express.Express = express();

app.get("/", (req: express.Request, res: express.Response): void => {
  res.json({
    message: "Text Justification API",
    endpoints: {
      "POST /api/token": "Generate authentication token",
      "POST /api/justify": "Justify text (requires Bearer token)",
    },
    documentation: "<API documentation URL>",
  });
});

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));

const apiLink: string = "/api";

app.use(apiLink, tokenRoutes);
app.use(apiLink, justifRoutes);

export default app;
