import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";

const app: express.Express = express();

// Middlewares pour parser le body
app.use(express.json());
app.use(express.text({ type: "text/plain" }));

// Routes de l'API
app.use("/api", tokenRoutes);
app.use("/api", justifRoutes);

export default app;
