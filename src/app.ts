import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";

const app: express.Express = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));

app.use("/api", tokenRoutes);
app.use("/api", justifRoutes);

export default app;
