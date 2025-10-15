import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

export default app;
