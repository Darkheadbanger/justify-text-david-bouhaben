import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));
const apiLink = "/api";
app.use(apiLink, tokenRoutes);
app.use(apiLink, justifRoutes);
export default app;
//# sourceMappingURL=app.js.map