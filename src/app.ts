import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";

const app: express.Express = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Text Justification API",
    endpoints: {
      "POST /api/token": "Generate authentication token",
      "POST /api/justify": "Justify text (requires Bearer token)"
    },
    documentation: "https://github.com/Darkheadbanger/justify-text-david-bouhaben"
  });
});

const apiLink: string = "/api";

app.use(apiLink, tokenRoutes);
app.use(apiLink, justifRoutes);

export default app;
