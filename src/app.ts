import express from "express";
import tokenRoutes from "./routes/tokens.route.js";
import justifRoutes from "./routes/justify.route.js";

const app: express.Express = express();

app.use(express.json());

app.use(express.text({ type: "text/plain" }));
app.use(express.json());

app.use("/", tokenRoutes);
app.use("/", justifRoutes);

export default app;
